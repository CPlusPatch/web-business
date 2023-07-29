<script setup lang="ts">
import { UserManager } from "oidc-client-ts";
import { signInWithMastodon } from "~/utils/oauth";

const token = useCookie("token", {
	sameSite: "strict",
	secure: true,
});

const showingPassword = ref(false);

const loading = ref(false);
const route = useRoute();

const submit = async (e: Event) => {
	loading.value = true;
	const username: string = (e.target as any).username.value;
	const password: string = (e.target as any).username.value;

	const response = await fetch("/api/auth/login", {
		method: "POST",
		body: JSON.stringify({
			username,
			password,
		}),
	});

	if (response.status === 200) {
		token.value = (await response.json()).token;

		if (new URLSearchParams(window.location.search).get("next")) {
			useRouter().push(
				new URLSearchParams(window.location.search)
					.get("next")
					?.toString() ?? ""
			);
		} else {
			useRouter().push("/");
		}
	}

	loading.value = false;
};

definePageMeta({
	smallNavbar: true,
});

onMounted(async () => {
	if (route.query.token) {
		/* DEPRECATED, sign in with Misskey is no longer supported due to lack of OAuth compliance */
		// TODO: Remove Misskey login and add proper OAuth support
		// Initiate sign in with Misskey
		loading.value = true;

		const response = await fetch("/api/auth/login-oauth", {
			method: "POST",
			body: JSON.stringify({
				provider: "misskey",
				token: route.query.token,
				oauthData: JSON.parse(
					localStorage.getItem("oauth_misskey_client") ?? "{}"
				),
			}),
		});

		if (response.status === 200) {
			token.value = (await response.json()).token;

			if (new URLSearchParams(window.location.search).get("next")) {
				useRouter().push(
					new URLSearchParams(window.location.search)
						.get("next")
						?.toString() ?? ""
				);
			} else {
				useRouter().push("/");
			}
		}
	} else if (route.query.code) {
		// Initiate sign in with Mastodon
		loading.value = true;

		const response = await fetch("/api/auth/login-oauth", {
			method: "POST",
			body: JSON.stringify({
				provider: "mastodon",
				token: route.query.code,
				oauthData: JSON.parse(
					localStorage.getItem("oauth_mastodon_client") ?? "{}"
				),
			}),
		});

		if (response.status === 200) {
			token.value = (await response.json()).token;

			if (new URLSearchParams(window.location.search).get("next")) {
				useRouter().push(
					new URLSearchParams(window.location.search)
						.get("next")
						?.toString() ?? ""
				);
			} else {
				useRouter().push("/");
			}
		}
	}

	loading.value = false;
});

const userManager = new UserManager({
	authority: useRuntimeConfig().public.oidcAuthority,
	client_id: useRuntimeConfig().public.oidcClientId,
	redirect_uri: `${useRequestURL().origin}/auth/callback`,
	response_type: useRuntimeConfig().public.oidcResponseType,
	scope: useRuntimeConfig().public.oidcScope,
});

console.log(useRuntimeConfig().public);


const oidcSignIn = async () => {
	const user = await userManager.signinPopup();

	const response = await useFetch("/api/auth/login-openid", {
		method: "POST",
		body: JSON.stringify(user),
	});

	if (response.data.value) {
		token.value = response.data.value.token;

		useRouter().push("/");
	}
}

</script>

<template>
	<div
		class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<LogosSmallLogo class="!w-10 !h-10 mx-auto" />
			<h2
				class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Sign in to your account
			</h2>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form
				class="space-y-6"
				action="#"
				method="POST"
				@submit.prevent="submit">
				<div>
					<label
						for="email"
						class="block text-sm font-medium leading-6 text-gray-900"
						>Username</label
					>
					<div class="mt-2">
						<InputCMInput
							icon="ic:round-perm-identity"
							name="username"
							placeholder="Your username"
							required
							class="block w-full rounded-md"
							:loading="loading" />
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label
							for="password"
							class="block text-sm font-medium leading-6 text-gray-900"
							>Password</label
						>
						<div class="text-sm">
							<a
								href="#"
								class="font-semibold text-orange-600 hover:text-orange-500"
								@click="showingPassword = !showingPassword"
								>{{ showingPassword ? "Hide" : "Show" }}</a
							>
						</div>
					</div>
					<div class="mt-2">
						<InputCMInput
							name="password"
							:type="showingPassword ? 'text' : 'password'"
							icon="ic:round-password"
							placeholder="Your password"
							required
							:loading="loading"
							class="block w-full rounded-md !ring-orange-500 !border-gray-300" />
					</div>
				</div>

				<div>
					<Button
						:loading="loading"
						type="submit"
						theme="orange"
						class="flex w-full">
						Sign in
					</Button>
				</div>
				<div
					class="relative flex flex-row justify-center items-center text-sm">
					<div class="h-0.5 bg-gray-200 w-1/4 rounded"></div>
					<span class="px-2 text-gray-500 w-1/2 text-center">
						Or continue with
					</span>
					<div class="h-0.5 bg-gray-200 w-1/4 rounded"></div>
				</div>
				<div class="grid grid-cols-2 w-full gap-2">
					<Button
						:loading="loading"
						theme="gray"
						class="w-full"
						@click="
							() => {
								loading = true;
								signInWithMastodon();
							}
						">
						<Icon name="logos:mastodon-icon" class="mr-2 w-4 h-4" />
						Mastodon
					</Button>
					<Button
						:loading="loading"
						theme="gray"
						class="w-full"
						@click="oidcSignIn">
						<img src="/images/icons/logo.svg" class="mr-2 w-4 h-4" />
						CPlusPatch ID
					</Button>
					<Button
						:disabled="true"
						class="w-full !opacity-40"
						theme="gray"
						@click="
							() => {
								loading = true;
								signInWithMastodon();
							}
						">
						More soon
					</Button>
				</div>
			</form>
		</div>
	</div>
</template>
