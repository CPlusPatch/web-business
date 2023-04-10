<script setup lang="ts">
import {
	Dialog,
	DialogOverlay,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue";
import { IconFileUpload, IconX } from "@tabler/icons-vue";
import { Post } from "~/db/entities/Post";

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
let oldPost = post.value;

const close = () => {
	if (isSaving.value) return;
	if (oldPost !== post.value) {
		if (!confirm("Your changes haven't been saved. Are you sure you want to close?")) return;
	}
	open.value = false;
	setTimeout(() => {
		props.onclose();
	}, 300);
};

const upload = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (!target.files) return;

	const file = target.files[0];
	const url = URL.createObjectURL(file);

	isSaving.value = true;
	let formData = new FormData();
	formData.append("file", file);

	fetch(`/api/media/upload`, {
		method: "POST",
		body: formData,
	}).then(async res => {
		if (res.ok) {
			post.value.banner = await res.text();
		}
	}).finally(() => {
		isSaving.value = false;
	})
};

const save = (e: Event) => {
	e.preventDefault();
	isSaving.value = true;
	post.value.description = (e.target as any)["description"].value;
	fetch(`/api/post/${route.params.slug}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			description: post.value.description,
			banner: post.value.banner
		}),
	})
		.then(data => {
			switch (data.status) {
				case 201:
				case 200: {
					oldPost = post.value;
					close();
					break;
				}
			}
		})
		.catch(err => {
			console.error(err);
		})
		.finally(() => {
			isSaving.value = false;
		});
};
</script>

<template>
	<input
		type="file"
		class="hidden"
		ref="fileUpload"
		@change="upload"
		:multiple="false" />
	<TransitionRoot appear :show="open">
		<Dialog
			as="div"
			class="overflow-hidden fixed inset-0 z-50"
			@close="close">
			<div class="overflow-hidden absolute inset-0">
				<TransitionChild
					enter="ease-in-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<DialogOverlay class="modal-overlay" />
				</TransitionChild>

				<div
					class="flex fixed inset-y-0 right-0 pl-10 max-w-full pointer-events-none font-inter">
					<TransitionChild
						enter="transform transition ease-in-out duration-300 sm:duration-300"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transform transition ease-in-out duration-300 sm:duration-300"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
						class="w-screen max-w-sm pointer-events-auto">
						<form
							action="#"
							id="bannerUploadForm"
							@submit="save"
							class="flex overflow-y-scroll relative flex-col pt-6 h-full bg-white shadow-xl no-scroll px-4 sm:px-6">
							<div class="flex justify-between items-center">
								<DialogTitle
									class="text-lg font-bold text-gray-900">
									Post
								</DialogTitle>
								<button
									type="button"
									@click="close"
									class="text-gray-400 bg-white rounded-md duration-200 outline-none hover:text-gray-500 focus:outline-none active:scale-95">
									<span class="sr-only">Close panel</span>
									<IconX class="w-5 h-5" aria-hidden="true" />
								</button>
							</div>

							<div
								class="relative flex-1 mt-6 flex flex-col gap-y-4 pb-20">
								<div
									className="flex flex-col items-center mt-1"
									id="avatar-upload">
									<div className="relative w-full">
										<div
											className="inline-block overflow-hidden w-full h-36 bg-gray-100 rounded-md">
											<img
												class="bg-contain"
												:src="post.banner" />
											<div
												v-if="!post.banner"
												className="flex justify-center items-center w-full h-full text-sm text-center text-gray-600">
												Add a new banner<br />
												Wide aspect ratio recommended
											</div>
										</div>

										<Button
											:disabled="isSaving"
											theme="gray"
											@click="fileUpload?.click()"
											class="!absolute right-0 bottom-1 !p-2 m-2">
											<IconFileUpload
												className="w-5 h-5" />
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
												:disabled="isSaving"
												rows="4"
												name="description"
												id="description"
												:value="post.description"
												class="block w-full rounded-md border-gray-300 shadow-sm duration-200 outline-none disabled:bg-gray-100 focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
										</div>
									</div>

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
								class="flex absolute inset-x-0 bottom-0 flex-shrink-0 justify-end bg-white border-t py-3 px-4 gap-x-4">
								<Button
									:loading="isSaving"
									type="submit"
									theme="orange"
									class="disabled:opacity-50 w-full">
									Save
								</Button>
							</div>
						</form>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
