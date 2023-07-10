<script setup lang="ts">
import { getSettings } from "~/utils/utilities";

const settings = await getSettings();
</script>

<template>
	<nuxt-img
		:src="settings.logo ?? '/images/icons/logo.svg'"
		preload
		alt="Orange gradient with the letters 'CPP' overlayed on it"
		class="w-8 h-8 rounded" />
</template>
