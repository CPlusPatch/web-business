<script setup lang="ts">
const token = useCookie("token", {
	sameSite: "strict",
	secure: true,
});
const submit = async (e: Event) => {
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
		alert("Logged in!");
		token.value = (await response.json()).token;
	}
};
</script>

<template>
	<div class="mx-auto max-w-3xl">
		<form class="mt-40" @submit.prevent="submit">
			<Input type="text" name="username" placeholder="username" />
			<Input type="password" name="password" placeholder="password" />
			<Button theme="orange" type="submit"> Submit </Button>
		</form>
	</div>
</template>
