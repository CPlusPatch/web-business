<script setup lang="ts">
const token = useCookie("token", {
	sameSite: "strict",
	secure: true,
});

const loading = ref(false);

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
	layout: false,
});
</script>

<template>
	<div
		class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
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
					</div>
					<div class="mt-2">
						<Input
							name="password"
							type="password"
							placeholder="Your password"
							required
							:loading="loading"
							class="block w-full rounded-md !ring-0 !border-gray-300" />
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
