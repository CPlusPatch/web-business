<script setup lang="ts">
import { IconArticleFilledFilled } from "@tabler/icons-vue";
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";
import { Post } from "~~/db/entities/Post";

const posts = await useFetch<Post[]>("/api/posts")
</script>

<template>
	<PrimaryContainer is="main">
		<ul class="flex flex-col gap-y-5 pb-10">
			<li v-for="post of posts.data.value" :key="post.id">
				<article class="w-full rounded shadow-sm lg:max-w-full lg:flex min-h-[12rem]">
						<div
							class="flex overflow-hidden flex-none items-center h-48 text-center bg-gray-200 bg-center bg-cover rounded-t lg:w-64 lg:rounded-t-none lg:rounded-l lg:h-auto"></div>
						<div class="flex flex-col justify-between p-4 leading-normal bg-white grow">
							<NuxtLink class="mb-4" :to="`/blog/${post.slug}`">
								<p class="flex items-center text-sm font-bold text-gray-600 font-inter">
									<IconArticleFilledFilled class="mr-2 w-5 h-5" />
									ARTICLE
								</p>
								<div class="mb-2 text-xl font-semibold text-gray-900 font-inter">
									{{ post.title }}
								</div>
								<p class="text-base text-gray-700 font-inter">{{ post.description }}</p>
							</NuxtLink>
							<div class="flex items-center font-inter">
								<img
									src=""
									class="mr-4 w-10 h-10 rounded-md"
									alt="Avatar of Writer"
								/>
								<div class="flex flex-col justify-between h-full text-sm">
									<p class="pt-1 leading-none text-gray-900">
										Gaspard Wierzbinski
									</p>
									<p class="text-gray-600">{{ 
										new Date(post.id).toLocaleDateString("en-US", {
											month: "short",
											day: "2-digit",
											year: "2-digit"
										})
									}}</p>
								</div>
							</div>
						</div>
					</article>
			</li>
		</ul>
	</PrimaryContainer>
</template>