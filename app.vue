<script setup lang="ts">
import { AppDataSource } from "./db/data-source";
import { Post } from "./db/entities/Post";
import "./styles/index.css";

/* AppDataSource.initialize().then(async () => {
	const post = new Post();
	
	post.content = "This is a test";
	post.description = "Hi there! This is a test post!";
	post.slug = "test-post-ignore",
	post.title = "SUs sus amogys";

	await AppDataSource.manager.save(post);
}); */

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
