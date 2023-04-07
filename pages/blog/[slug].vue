<script setup lang="ts">
import { IconCalendar } from '@tabler/icons-vue';
import { marked } from 'marked';
import PrimaryContainer from '~~/components/layout/PrimaryContainer.vue';
import { Post } from '~~/db/entities/Post';

definePageMeta({
	middleware: "auth"
});

const route = useRoute();

const post = await useFetch<Post>(`/api/post/${route.params.slug}`);
</script>

<template>
	<PrimaryContainer>
		<article class="px-0 pb-16 w-full h-full">
			<div class="container px-4 mb-12 md:mb-24">
				<h1 class="mb-4 text-3xl font-extrabold text-center text-black md:text-5xl">
					{{ post.data.value?.title }}
				</h1>
			</div>
			<div v-if="post.data.value?.banner" class="flex overflow-hidden items-center w-full max-h-96 md:rounded-lg">
				<img :src="post.data.value?.banner" class="relative w-full bg-cover" />
			</div>
			<div v-if="post.data.value?.created_at"
				class="flex gap-x-2 items-center px-4 mx-auto my-5 max-w-2xl font-light text-gray-500 font-inter">
				<IconCalendar class="w-4 h-4" />
				Written on
				{{
					new Date(post.data.value?.created_at).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
						hour: "numeric",
						minute: "numeric",
					})
				}}
			</div>
			<div class="px-4 mx-auto mt-10 max-w-2xl text-gray-700 prose font-inter" v-html="marked(post.data.value?.content ?? '')"></div>
		</article>
	</PrimaryContainer>
</template>