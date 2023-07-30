<script setup lang="ts">
import { UserManager } from 'oidc-client-ts';
import { Config } from 'types/config';

const oidc = useRuntimeConfig().public.oidc as Config["oidc_providers"];

onMounted(() => {
	const oidcProvider = oidc.find(o => o.id === useRoute().params.provider);

	if (!oidcProvider) return false;

	const userManager = new UserManager({
		authority: oidcProvider.authority,
		client_id: oidcProvider.client_id,
		redirect_uri: `${useRequestURL().origin}/auth/callback`,
		response_type: "code",
		scope: oidcProvider.scopes.join(" "),
	});

	userManager.signinPopupCallback();
})
</script>

<template>
	Signing in...
</template>