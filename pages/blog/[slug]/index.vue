<script setup lang="ts">
import { IconCalendar, IconClock } from "@tabler/icons-vue";
import { marked } from "marked";
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";
import { Post } from "~~/db/entities/Post";

const route = useRoute();

const post = await useFetch<Post>(`/api/post/${route.params.slug}`);

useServerSeoMeta({
	title: () => `${post.data.value?.title} · CPlusPatch` ?? "Article by CPlusPatch",
	ogTitle: () =>  `${post.data.value?.title} · CPlusPatch` ?? "Article by CPlusPatch",
	description: () => post.data.value?.description ?? "Article by CPlusPatch",
	ogDescription: () => post.data.value?.description ?? "Article by CPlusPatch",
	ogImage: () => post.data.value?.banner ?? "/static/servers.webp",
	twitterCard: "summary_large_image",
	author: "Gaspard Wierzbinski",
});
</script>

<template>
	<PrimaryContainer>
		<article class="px-0 pb-16 w-full h-full">
			<div class="container px-4 mb-12 md:mb-24">
				<h1
					class="mb-4 text-3xl font-extrabold text-center text-black md:text-5xl">
					{{ post.data.value?.title }}
				</h1>
			</div>
			<div
				v-if="post.data.value?.banner"
				class="block overflow-hidden w-full md:h-96 h-40 rounded-lg">
				<img
					:src="post.data.value?.banner"
					class="w-full h-full object-cover align-middle" />
			</div>
			<div class="flex items-center px-4 justify-center my-5 text-gray-500 font-inter gap-x-4">
				<span
					v-if="post.data.value?.created_at"
					class="flex gap-x-2 items-center">
					<IconCalendar class="w-4 h-4 mb-1" />
					{{
						new Date(post.data.value?.created_at).toLocaleDateString(
							"en-GB",
							{
								month: "short",
								day: "numeric",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
							}
						)
					}}
				</span>
				<span
					v-if="post.data.value?.content"
					class="flex gap-x-2 items-center">
					<IconClock class="w-4 h-4 mb-1" />
					{{ Math.ceil(post.data.value?.content.split(" ").length / 183) }}min read
				</span>
			</div>
			<div
				class="px-4 mx-auto mt-10 max-w-2xl text-gray-700 prose font-inter"
				v-html="marked(post.data.value?.content ?? '')"></div>
		</article>
	</PrimaryContainer>
</template>
