<script setup lang="ts">
import { UserManager } from 'oidc-client-ts';

const userManager = new UserManager({
	authority: useRuntimeConfig().public.OIDC_AUTHORITY,
	client_id: useRuntimeConfig().public.OIDC_CLIENT_ID,
	redirect_uri: `${useRequestURL().origin}/auth/callback`,
	response_type: useRuntimeConfig().public.OIDC_RESPONSE_TYPE,
	scope: useRuntimeConfig().public.OIDC_SCOPE,
});

onMounted(() => {
	userManager.signinPopupCallback();
})
</script>

<template>
	Signing in...
</template>