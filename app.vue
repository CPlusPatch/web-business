<script setup lang="ts">
import "./styles/index.css";

useServerSeoMeta({
	title: "CPlusPatch",
	ogTitle: "Website for CPlusPatch, aka Gaspard Wierzbinski",
	description: "My blog, about me and how you can contact me!",
	ogDescription: "My blog, about me and how you can contact me!",
	ogImage: "/static/servers.webp",
	twitterCard: "summary_large_image",
	author: "Gaspard Wierzbinski",
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
