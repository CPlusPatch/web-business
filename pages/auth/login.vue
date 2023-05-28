<script setup lang="ts">
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

async function signInWithMastodon() {
	loading.value = true;
	let instanceUrl = new URL("https://placeholder.com");
	try {
		const prompted = prompt("Instance domain:");
		instanceUrl = new URL(
			prompted?.includes("http") ? prompted : `https://${prompted}`
		);
	} catch {
		return alert("Invalid URL!");
	}

	// Create a new Mastodon application
	const app = await createMastodonApp(instanceUrl);

	// Store in localStorage for use later during the auth process
	localStorage.setItem("oauth_provider", "mastodon");
	localStorage.setItem("oauth_mastodon_client", JSON.stringify(app));

	// Redirect the user to the Mastodon authorization URL
	const authorizationUrl = `${instanceUrl}/oauth/authorize?client_id=${app.clientId}&response_type=code&redirect_uri=${app.redirectUri}`;
	window.location.href = authorizationUrl;
}

async function createMastodonApp(instanceUrl: URL) {
	const appName = "CPlusPatch CMS";
	const redirectUri = `${window.location.origin}/auth/login/`;
	const scopes = "read";
	const website = window.location.origin;

	// Create a new Mastodon application
	const response = await fetch(`${instanceUrl}/api/v1/apps`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			client_name: appName,
			redirect_uris: redirectUri,
			scopes,
			website,
		}),
	});

	const data = await response.json();
	return {
		clientId: data.client_id,
		clientSecret: data.client_secret,
		redirectUri,
		instanceUrl: instanceUrl.origin,
	};
}

async function getMastodonAccessToken(code: string) {
	const { clientId, clientSecret, redirectUri, instanceUrl } = JSON.parse(
		localStorage.getItem("oauth_mastodon_client") ?? "{}"
	);
	const tokenUrl = `${instanceUrl}/oauth/token`;

	const response = await fetch(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			code,
			grant_type: "authorization_code",
			redirect_uri: redirectUri,
		}),
	});

	const data = await response.json();
	return data.access_token;
}

async function getMastodonAccount(accessToken: string) {
	const { instanceUrl } = JSON.parse(
		localStorage.getItem("oauth_mastodon_client") ?? "{}"
	);

	const accountUrl = `${instanceUrl}/api/v1/accounts/verify_credentials`;

	const response = await fetch(accountUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await response.json();
	return data;
}

onMounted(async () => {
	if (route.query.code) {
		loading.value = true;
		const mastodonToken = await getMastodonAccessToken(
			route.query.code as string
		);
		const account = await getMastodonAccount(mastodonToken);

		const response = await fetch("/api/auth/login-oauth", {
			method: "POST",
			body: JSON.stringify({
				provider: localStorage.getItem("oauth_provider"),
				userId: account.id,
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
	}
});
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
						<Input
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
						<Input
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

				<div>
					<Button
						:loading="loading"
						class="!bg-blue-800 !text-white w-full"
						@click="signInWithMastodon">
						<Icon name="logos:mastodon-icon" class="mr-2" />
						Sign in with Mastodon
					</Button>
				</div>
			</form>
		</div>
	</div>
	<!-- <div
		class="flex justify-start min-h-screen bg-cover bg-center"
		:style="{
			backgroundImage:
				'url(https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1308&q=80)',
		}">
		<div
			class="flex justify-center py-6 w-110 flex flex-col px-5 bg-gray-100/75 dark:bg-dark-800/75 backdrop-blur-xl shadow-lg">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<div class="flex justify-center w-auto"></div>
				<h2
					class="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-gray-50 font-poppins">
					Login
				</h2>
			</div>

			<div class="mt-12 sm:mx-auto sm:w-full">
				<div class="py-4 px-6">
					<form
						class="space-y-6"
						action="#"
						method="POST"
						@submit.prevent="submit">
						<div class="flex flex-col gap-2">
							<Input
								icon="ic:round-supervised-user-circle"
								name="username"
								required
								placeholder="Username"
								:loading="loading"
								:hide-icon="false"
								class="focus:outline-none" />
							<Input
								icon="ic:round-computer"
								name="password"
								required
								placeholder="Password"
								class="focus:outline-none"
								:loading="loading" />
						</div>

						<div>
							<Button
								type="submit"
								ring-color="orange-500"
								theme="orange"
								class="w-full hover:!scale-100"
								:loading="loading">
								Sign in
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div> -->
</template>
