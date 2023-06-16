<script setup lang="ts">
import { Page } from "~/db/entities/Page";

useServerSeoMeta({
	title: "CPlusPatch",
	ogTitle: "Website for CPlusPatch, aka Gaspard Wierzbinski",
	description: "My blog, about me and how you can contact me!",
	ogDescription: "My blog, about me and how you can contact me!",
	ogImage: "/static/servers.webp",
	twitterCard: "summary_large_image",
	author: "Gaspard Wierzbinski",
});

const loading = ref(false);

const route = useRoute();
const pagePath = route.params.page as string;

const page = (
	await useFetch("/api/pages/from-path", {
		method: "POST",
		body: JSON.stringify({
			path: pagePath,
		}),
	})
).data as unknown as Ref<Page>;

const isAdmin = (await useFetch("/api/user/admin")).data.value;
const token = useCookie("token");

const createNewPage = async () => {
	loading.value = true;

	const page = (
		await useFetch(`/api/pages/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token.value}`,
			},
			body: JSON.stringify({
				path: pagePath === "" ? "index" : "pagePath",
			}),
		})
	).data.value;

	if (page?.id) {
		window.location.reload();
	} else {
		alert("An error occured");
	}
};
</script>

<template>
	<div class="h-full w-full grow">
		<div
			v-if="page === null"
			class="mt-40 max-w-7xl mx-auto w-full flex items-center justify-center flex-col gap-4 grow">
			<h1 class="font-mono text-8xl">404</h1>
			<Button
				v-if="isAdmin ?? false"
				:loading="loading"
				theme="orange"
				@click="createNewPage"
				>Create new page</Button
			>
		</div>
		<PagesPageViewer v-else :page="page" />
	</div>
</template>
