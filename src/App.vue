<script setup lang="ts">
import { store } from "./utils/store";

if (store.theme === "dark") {
	document.getElementsByTagName("html")[0].classList.add("dark");
}
</script>

<template>
	<div class="relative font-inter bg-gradient-light">
		<RouterView />
	</div>
</template>
