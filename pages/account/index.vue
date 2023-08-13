<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";
import Input from "~/components/input/CMInput.vue";
import { UserManager } from "oidc-client-ts";
import { Config } from "types/config";

const user = (await useFetch("/api/user/get")).data.value;
const token = useCookie("token");
const loading = ref(false);
const displayName = ref();

definePageMeta({
	middleware: "auth",
});

onMounted(() => {
	displayName.value = user?.display_name ?? "";
});

const save = (e: Event) => {
	loading.value = true;
	fetch(`/api/account/${user?.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			display_name: ((e.target as any).username as HTMLInputElement)
				.value,
		}),
	})
		.then(data => {
			switch (data.status) {
				case 201:
				case 200: {
					loading.value = false;
					break;
				}
			}
		})
		.catch(err => {
			loading.value = false;
			console.error(err);
		});
};

const oidc = (await useFetch("/api/config/oidc")).data;

const linkOIDC = async (oidcProvider: Config["oidc_providers"][0]) => {
	const userManager = new UserManager({
		authority: oidcProvider.authority,
		client_id: oidcProvider.client_id,
		redirect_uri: `${useRequestURL().origin}/auth/callback`,
		scope: oidcProvider.scopes.join(" "),
	});

	const user = await userManager.signinPopup();

	await useFetch("/api/auth/link-openid", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			body: user,
			provider: oidcProvider.id,
		}),
	});

	window.location.reload();
}
</script>

<template>
	<PrimaryContainer class="mt-20">
		<form @submit.prevent="save">
			<div class="space-y-12">
				<div class="border-b border-gray-900/10 pb-12">
					<h2 class="text-xl font-bold leading-7 text-gray-900">
						Profile
					</h2>
					<p class="mt-1 text-sm leading-6 text-gray-600">
						Fill out your profile and personal details here!
					</p>

					<div
						class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div class="sm:col-span-4">
							<label
								for="username"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Name</label
							>
							<InputCMInput
								id="username"
								:value="displayName"
								:loading="loading"
								name="username"
								icon="ic:round-drive-file-rename-outline"
								placeholder="Joe Swanson"
								class="mt-2 w-full md:!w-96"
								@change="
									displayName = ($event as any).target?.value
								" />
						</div>

						<div class="col-span-full">
							<label
								for="photo"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Avatar</label
							>
							<div class="mt-2 flex items-center gap-x-3">
								<img
									:src="user?.avatar"
									class="h-12 w-12 rounded text-gray-300"
									aria-hidden="true" />
								<Button theme="gray" :loading="loading"
									>Change</Button
								>
							</div>
						</div>

						<div class="col-span-full">
							<label
								for="cover-photo"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Banner</label
							>
							<div
								class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
								<img v-if="user?.banner" />
								<div v-else class="text-center">
									<Icon
										name="ic:round-file-upload"
										class="mx-auto h-12 w-12 text-gray-300"
										aria-hidden="true" />
									<div
										class="mt-4 flex text-sm leading-6 text-gray-600">
										<label
											for="file-upload"
											class="relative cursor-pointer duration-200 rounded-md font-semibold text-orange-600 hover:text-orange-500">
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												class="sr-only" />
										</label>
										<p class="pl-1">or drag and drop</p>
									</div>
									<p class="text-xs leading-5 text-gray-600">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
							</div>
						</div>

						<div class="sm:col-span-4">
							<label
								class="block text-sm font-medium leading-6 text-gray-900"
								>Linked Accounts</label
							>
							<div class="flex flex-col md:w-60 gap-2 mt-2">
								<Button
									theme="gray"
									:disabled="
										(user?.oauthAccounts ?? []).filter(
											a => a.provider === 'mastodon'
										).length > 0
									"
									class="w-full disabled:opacity-50 justify-between">
									<span
										><Icon
											name="logos:mastodon-icon"
											class="mr-2 w-4 h-4" />
										{{
											(user?.oauthAccounts ?? []).filter(
												a => a.provider === "mastodon"
											).length > 0
												? "Linked!"
												: "Mastodon"
										}}</span
									>
									<Icon name="ic:round-plus" />
								</Button>
								<Button
									theme="gray"
									:disabled="(user?.oauthAccounts ?? []).filter(
										a => a.provider === provider.id
									).length > 0
									"
									v-for="provider of oidc"
									:key="provider.id"
									@click="linkOIDC(provider)"
									class="w-full disabled:opacity-50 justify-between">
									<span
										><img :src="provider.icon" class="mr-2 w-4 h-4 inline mb-1">
										{{
											(user?.oauthAccounts ?? []).filter(
												a => a.provider === provider.id
											).length > 0
											? "Linked!"
											: provider.name
										}}</span
									>
									<Icon name="ic:round-plus" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-x-2">
				<Button
					:loading="loading"
					type="submit"
					theme="orange"
					class="w-full md:w-auto"
					>Save</Button
				>
			</div>
		</form>
	</PrimaryContainer>
</template>
