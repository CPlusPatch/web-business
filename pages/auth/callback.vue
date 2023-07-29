<script setup lang="ts">
import { UserManager } from 'oidc-client-ts';

const userManager = new UserManager({
	authority: useRuntimeConfig().public.OIDC_AUTHORITY,
	client_id: useRuntimeConfig().public.OIDC_CLIENT_ID,
	redirect_uri: `${useRequestURL().origin}/auth/callback`,
	response_type: useRuntimeConfig().public.OIDC_RESPONSE_TYPE,
	scope: useRuntimeConfig().public.OIDC_SCOPE,
});

const token = useCookie("token", {
	sameSite: "strict",
	secure: true,
});

onMounted(async () => {
	const user = await userManager.signinRedirectCallback();

	const response = await useFetch("/api/auth/login-openid", {
		method: "POST",
		body: JSON.stringify(user),
	});

	if (response.data.value) {
		token.value = response.data.value;

		useRouter().push("/");
	}
})
</script>

<template>
	Signing in...
</template>