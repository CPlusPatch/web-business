<script setup lang="ts">
import { IconCalendar, IconClock } from "@tabler/icons-vue";
import { marked } from "marked";
import { me } from "~/app.vue";
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";
import { Post } from "~~/db/entities/Post";

const route = useRoute();
const token = useCookie("token");

const post = await useFetch<Post>(`/api/post/${route.params.slug}`, {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token.value}`,
	},
});

if (!post.data.value) {
	throw createError({
		statusCode: post.error.value?.statusCode,
		statusMessage: post.error.value?.statusMessage,
	});
}

useSchemaOrg([
	defineArticle({
		image: post.data.value?.banner ?? undefined,
		dateModified: new Date(post.data.value.edited_at ?? 0),
		datePublished: new Date(post.data.value.created_at ?? 0),
		headline: post.data.value.title,
		description: post.data.value.description,
		wordCount: post.data.value?.content.split(" ").length,
		"@type": "BlogPosting",
	}),
	me,
]);

useServerSeoMeta({
	title: () => `${post.data.value?.title}` ?? "Article by CPlusPatch",
	description: () => post.data.value?.description ?? "Article by CPlusPatch",
	ogImage: () => post.data.value?.banner ?? "/static/servers.webp",
	author: "Gaspard Wierzbinski",
});

definePageMeta({
	smallNavbar: true,
});
</script>

<template>
	<div class="w-full h-screen md:h-[70vh] relative">
		<!-- <img
			:src="post.data.value?.banner"
			class="w-full h-full object-cover align-middle" /> -->
		<div
			class="bg-cover w-full h-full bg-fixed bg-center"
			:style="{
				backgroundImage: `url(${post.data.value?.banner})`,
			}"></div>
		<!-- Floor fade overlay that-->
		<div
			class="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)]"></div>
		<div
			class="absolute max-w-5xl inset-0 mx-auto flex items-center justify-center">
			<h1
				class="mb-4 rounded p-2 text-3xl inline font-extrabold text-center text-white md:text-5xl">
				{{ post.data.value?.title }}
			</h1>
		</div>
	</div>
	<PrimaryContainer>
		<article class="px-0 pb-16 w-full h-full">
			<!-- <div class="container px-4 mb-12 md:mb-24">
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
			</div> -->
			<div
				class="flex items-center px-4 justify-center my-5 text-gray-500 font-inter gap-x-4">
				<span
					v-if="post.data.value?.created_at"
					class="flex gap-x-2 items-center">
					<IconCalendar class="w-4 h-4 mb-1" />
					{{
						new Date(
							post.data.value?.created_at
						).toLocaleDateString("en-GB", {
							month: "short",
							day: "numeric",
							year: "numeric",
							hour: "numeric",
							minute: "numeric",
						})
					}}
				</span>
				<span
					v-if="post.data.value?.content"
					class="flex gap-x-2 items-center">
					<IconClock class="w-4 h-4 mb-1" />
					{{
						Math.ceil(
							post.data.value?.content.split(" ").length / 183
						)
					}}min read
				</span>
			</div>
			<div
				class="px-4 mx-auto mt-10 prose-truegray max-w-2xl text-gray-700 prose font-inter"
				v-html="marked(post.data.value?.content ?? '')" />
		</article>
	</PrimaryContainer>
</template>
