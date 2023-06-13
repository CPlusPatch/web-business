<script setup lang="ts">
useServerSeoMeta({
	title: "CPlusPatch",
	ogTitle: "Website for CPlusPatch, aka Gaspard Wierzbinski",
	description: "My blog, about me and how you can contact me!",
	ogDescription: "My blog, about me and how you can contact me!",
	ogImage: "/static/servers.webp",
	twitterCard: "summary_large_image",
	author: "Gaspard Wierzbinski",
});

const route = useRoute();
const pagePath = route.params.page as string;
const page = (
	await useFetch("/api/pages/id", {
		method: "POST",
		body: JSON.stringify({
			path: pagePath,
		}),
	})
).data.value;

const isAdmin = (await useFetch("/api/user/admin")).data.value;
const token = useCookie("token");

const createNewPage = async () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const page = await useFetch(`/api/pages/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			path: pagePath,
		}),
	});
};
</script>

<template>
	<div
		v-if="page === null"
		class="mt-40 max-w-7xl mx-auto w-full flex items-center justify-center flex-col gap-4 grow">
		<h1 class="font-mono text-8xl">404</h1>
		<Button v-if="isAdmin ?? false" theme="orange" @click="createNewPage"
			>Create new page</Button
		>
	</div>
	<PagesPageViewer v-else :id="page.id" />
</template>
