<script setup lang="ts">
import { arrayBufferToWebP } from "webp-converter-browser";
import { Post, Visibility } from "~/db/entities/Post";

const privacySettings = [
	{
		name: "Public access",
		value: Visibility.PUBLIC,
		description: "Everyone can see this post.",
	},
	{
		name: "Unlisted",
		value: Visibility.UNLISTED,
		description: "Everyone with the link will see this post.",
	},
	{
		name: "Private",
		value: Visibility.PRIVATE,
		description: "Only you can see this post.",
	},
];

const props = defineProps<{
	onclose: () => void;
	post: Ref<Post>;
}>();

const post = ref(props.post);

const open = ref(true);
const isSaving = ref(false);

const route = useRoute();
const token = useCookie("token");
const fileUpload = ref<HTMLInputElement | null>(null);
let oldPost = JSON.parse(JSON.stringify(post.value)); // To clone the object and prevent it from being a proxy

const close = () => {
	if (isSaving.value) {
		return;
	}
	open.value = false;
	setTimeout(() => {
		props.onclose();
	}, 300);
};

const upload = async (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (!target.files) {
		return;
	}

	const file: File = target.files[0].type.includes("webp")
		? target.files[0]
		: new File(
				[await arrayBufferToWebP(await target.files[0].arrayBuffer())],
				target.files[0].name.split(".").slice(0, -1).join(".") + ".webp"
		  );

	isSaving.value = true;
	const formData = new FormData();
	formData.append("file", file);

	fetch("/api/media/upload", {
		method: "POST",
		body: formData,
		headers: {
			Authorization: `Bearer ${token.value}`,
		},
	})
		.then(async res => {
			if (res.ok) {
				post.value.banner = await res.text();
			}
		})
		.finally(() => {
			isSaving.value = false;
		});
};

const save = (e: Event) => {
	e.preventDefault();
	isSaving.value = true;
	post.value.description = (e.target as any).description.value;
	post.value.slug = (e.target as any).slug.value;
	post.value.visibility = (e.target as any).visibility.value;

	if (post.value.slug !== oldPost.slug) {
		history.pushState(
			{},
			"",
			location.pathname.replace(oldPost.slug, post.value.slug)
		);
	}

	fetch(`/api/post/${route.params.slug}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			description: post.value.description,
			banner: post.value.banner,
			slug: post.value.slug,
			visibility: post.value.visibility,
		}),
	})
		.then(data => {
			switch (data.status) {
				case 201:
				case 200: {
					oldPost = JSON.parse(JSON.stringify(post.value)); // To clone object
					isSaving.value = false;
					close();
					break;
				}
			}
		})
		.catch(err => {
			isSaving.value = false;
			console.error(err);
		});
};
</script>

<template>
	<input
		ref="fileUpload"
		type="file"
		class="hidden"
		:multiple="false"
		@change="upload" />
	<HeadlessTransitionRoot appear :show="open">
		<HeadlessDialog
			as="div"
			class="overflow-hidden fixed inset-0 z-50"
			@close="close">
			<div class="overflow-hidden absolute inset-0">
				<HeadlessTransitionChild
					enter="ease-in-out duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="ease-in-out duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0">
					<HeadlessDialogOverlay
						class="fixed inset-0 bg-gray-500/40 transition-opacity backdrop-blur-md" />
				</HeadlessTransitionChild>

				<div
					class="flex fixed inset-y-0 right-0 pl-10 max-w-full pointer-events-none font-inter">
					<HeadlessTransitionChild
						enter="transform transition ease-in-out duration-300 sm:duration-300"
						enter-from="translate-x-full"
						enter-to="translate-x-0"
						leave="transform transition ease-in-out duration-300 sm:duration-300"
						leave-from="translate-x-0"
						leave-to="translate-x-full"
						class="w-screen max-w-sm pointer-events-auto">
						<form
							id="bannerUploadForm"
							action="#"
							class="flex overflow-y-scroll relative flex-col pt-6 h-full bg-white shadow-xl no-scroll px-4 sm:px-6"
							@submit.prevent="save">
							<div class="flex justify-between items-center">
								<HeadlessDialogTitle
									class="text-lg font-bold text-gray-900">
									Post
								</HeadlessDialogTitle>
								<button
									type="button"
									class="text-gray-400 bg-white rounded-md duration-200 outline-none hover:text-gray-500 focus:outline-none active:scale-95"
									@click="close">
									<span class="sr-only">Close panel</span>
									<Icon
										name="tabler:x"
										class="w-5 h-5"
										aria-hidden="true" />
								</button>
							</div>

							<div
								class="relative flex-1 mt-6 flex flex-col gap-y-4 pb-20">
								<div
									id="avatar-upload"
									class="flex flex-col items-center mt-1 gap-y-4">
									<div class="relative w-full">
										<div
											class="inline-flex overflow-hidden items-center w-full h-36 bg-gray-100 rounded-md">
											<img
												class="bg-contain"
												:src="post.banner" />
											<div
												v-if="!post.banner"
												class="flex justify-center items-center w-full h-full text-sm text-center text-gray-600">
												Add a new banner<br />
												Wide aspect ratio recommended
											</div>
										</div>

										<Button
											:disabled="isSaving"
											theme="gray"
											class="!absolute right-0 bottom-1 !p-2 m-2"
											@click="fileUpload?.click()">
											<Icon
												name="tabler:file-upload"
												class="w-5 h-5" />
										</Button>
									</div>

									<div class="w-full">
										<label
											htmlFor="description"
											class="block text-sm font-medium text-gray-700">
											Post Description
										</label>
										<div class="mt-1">
											<textarea
												id="description"
												:disabled="isSaving"
												rows="4"
												name="description"
												:value="post.description"
												class="block p-3 w-full rounded-md border-gray-300 shadow-sm duration-200 outline-none disabled:bg-gray-100 focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
										</div>
									</div>

									<div class="w-full">
										<label
											htmlFor="slug"
											class="block text-sm font-medium text-gray-700">
											Post Slug
										</label>
										<div class="mt-1 flex flex-col gap-y-1">
											<input
												id="slug"
												:disabled="isSaving"
												type="text"
												name="slug"
												pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
												required
												:value="post.slug"
												class="peer first-letter:block w-full rounded-md border-gray-300 shadow-sm duration-200 outline-none disabled:bg-gray-100 focus:valid:ring-orange-500 focus:valid:border-orange-500 invalid:ring-red-600 invalid:ring-1 invalid:border-red-600 sm:text-sm" />
											<span
												class="hidden peer-invalid:block text-sm text-red-500"
												>You may only use alphanumeric
												characters and dashes.</span
											>
										</div>
									</div>

									<fieldset class="w-full">
										<legend
											class="text-sm font-medium text-gray-900">
											Privacy
										</legend>

										<div
											role="group"
											class="mt-2 space-y-5">
											<div
												v-for="option of privacySettings"
												:key="option.value"
												class="flex relative items-start">
												<div
													class="flex absolute items-center h-5">
													<input
														name="visibility"
														type="radio"
														:value="option.value"
														:disabled="isSaving"
														:checked="
															post.visibility ===
															option.value
														"
														class="w-4 h-4 text-orange-600 border-gray-300 ring-0 outline-none focus:outline-none focus:ring-0" />
												</div>
												<div class="pl-7 text-sm">
													<label
														htmlFor="privacy-public"
														class="font-medium text-gray-900">
														{{ option.name }}
													</label>
													<p
														id="privacy-public-description"
														class="text-gray-500">
														{{ option.description }}
													</p>
												</div>
											</div>
										</div>
									</fieldset>

									<!-- <div class="col-span-3 sm:col-span-2">
											<label
												htmlFor="slug"
												class="block text-sm font-medium text-gray-700">
												Post Slug
											</label>
											<div class="mt-1">
												<Field
													type="text"
													disabled={isSubmitting}
													name="slug"
													id="slug"
													class="block w-full italic rounded-md border-gray-300 shadow-sm duration-200 outline-none md:w-80 disabled:bg-gray-100 valid:focus:ring-orange-500 valid:focus:border-orange-500 sm:text-sm"
												/>
												{errors.slug && touched.slug && (
													<span class="block mt-1 text-xs font-medium text-red-700">
														{errors.slug.toString()}
													</span>
												)}
											</div>
										</div>

										<fieldset class="col-span-3 sm:col-span-2">
											<legend class="text-sm font-medium text-gray-900">
												Privacy
											</legend>

											<div role="group" class="mt-2 space-y-5">
												{privacySettings.map(option => (
													<div
														class="flex relative items-start"
														key={option.value}>
														<div class="flex absolute items-center h-5">
															<Field
																name="visibility"
																type="radio"
																value={option.value}
																disabled={isSubmitting}
																defaultChecked={
																	state.post.visibility ===
																	option.value
																}
																class="w-4 h-4 text-orange-600 border-gray-300 ring-0 outline-none focus:outline-none focus:ring-0"
															/>
															</div>
															<div class="pl-7 text-sm">
																<label
																	htmlFor="privacy-public"
																		class="font-medium text-gray-900">
																		{option.name}
																	</label>
																	<p
																		id="privacy-public-description"
																		class="text-gray-500">
																		{option.description}
																	</p>
																</div>
															</div>
														))}
													</div>
													{errors.visibility && touched.visibility && (
														<span class="block mt-1 text-xs font-medium text-red-700">
															{errors.visibility.toString()}
														</span>
													)}
												</fieldset> -->
								</div>
							</div>

							<div
								class="flex absolute inset-x-0 bottom-0 flex-shrink-0 justify-end bg-white border-t border-gray-300 py-3 px-4 gap-x-4">
								<Button
									:loading="isSaving"
									type="submit"
									theme="orange"
									class="disabled:opacity-50 w-full">
									Save
								</Button>
							</div>
						</form>
					</HeadlessTransitionChild>
				</div>
			</div>
		</HeadlessDialog>
	</HeadlessTransitionRoot>
</template>
