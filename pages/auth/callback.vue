<script setup lang="ts">
import { UserManager } from 'oidc-client-ts';

const userManager = new UserManager({
	authority: useRuntimeConfig().public.oidcAuthority,
	client_id: useRuntimeConfig().public.oidcClientId,
	redirect_uri: `${useRequestURL().origin}/auth/callback`,
	response_type: useRuntimeConfig().public.oidcResponseType,
	scope: useRuntimeConfig().public.oidcScope,
});

onMounted(() => {
	userManager.signinPopupCallback();
})
</script>

<template>
	Signing in...
</template>