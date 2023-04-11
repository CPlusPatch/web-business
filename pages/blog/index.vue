<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { IconLayoutGrid } from "@tabler/icons-vue";
import { IconLayoutRows } from "@tabler/icons-vue";
import { IconChevronRight } from "@tabler/icons-vue";
import { IconArticleFilledFilled } from "@tabler/icons-vue";
import SmallSelect from "~/components/select/SmallSelect.vue";
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";
import { Post } from "~~/db/entities/Post";

const posts = await useFetch<Post[]>("/api/posts");

const mode = ref<"compact" | "large">("compact");
const enabled = ref(false);
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-4">
		<div class="">
			<nav class="hidden sm:flex" aria-label="Breadcrumb">
				<ol role="list" class="flex items-center space-x-4">
					<li>
						<div class="flex">
							<NuxtLink
								to="/"
								class="text-sm font-medium text-gray-500 hover:text-gray-700"
								>Home
							</NuxtLink>
						</div>
					</li>
					<li>
						<div class="flex items-center">
							<IconChevronRight
								class="flex-shrink-0 h-5 w-5 text-gray-400"
								aria-hidden="true" />
							<NuxtLink
								to="/blog"
								class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
								>Blog</NuxtLink
							>
						</div>
					</li>
				</ol>
			</nav>
			<div class="mt-2 md:flex md:items-center md:justify-between">
				<div class="flex-1 min-w-0">
					<h2
						class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
						Updates from CPlusPatch
					</h2>
				</div>
				<div class="mt-4 flex-shrink-0 md:mt-0 md:ml-4 hidden md:flex">
					<SmallSelect
						:default-value="0"
						:items="[
							{
								value: 'compact',
								icon: IconLayoutGrid,
								text: 'Compact',
							},
							{
								value: 'large',
								icon: IconLayoutRows,
								text: 'large',
							},
						]"
						@update:model-value="(value: any) => mode = value.value" />
				</div>
			</div>
		</div>

		<ul
			:class="[
				'gap-5 pb-10',
				mode === 'large' ? 'flex flex-col' : 'grid md:grid-cols-3 sm:grid-cols-1',
			]">
			<li v-for="post of posts.data.value" :key="post.id">
				<article
					:class="[
						'w-full rounded group overflow-hidden lg:flex shadow-sm hover:shadow-xl duration-200 ring-1 hover:ring-2 ring-gray-200 hover:ring-orange-500 min-h-[12rem]',
						mode === 'large' ? '' : 'lg:flex-col',
					]">
					<div
						:class="[
							'overflow-hidden h-48 bg-gray-200',
							mode === 'large' ? 'lg:w-64' : 'lg:w-full',
						]">
						<img
							v-if="post.banner"
							:src="post.banner"
							class="object-cover object-center w-full h-full group-hover:scale-110 duration-500 ease-in-out group-hover:rotate-3" />
					</div>
					<div
						class="flex flex-col justify-between p-4 leading-normal bg-white grow">
						<NuxtLink class="mb-4" :to="`/blog/${post.slug}`">
							<p
								class="flex items-center text-sm font-bold text-gray-600 font-inter">
								<IconArticleFilledFilled class="mr-2 w-5 h-5" />
								ARTICLE
							</p>
							<div
								class="mb-2 text-xl font-semibold text-gray-900 font-inter">
								{{ post.title }}
							</div>
							<p class="text-base text-gray-700 font-inter">
								{{ post.description }}
							</p>
						</NuxtLink>
						<div class="flex items-center font-inter">
							<img
								src=""
								class="mr-4 w-10 h-10 rounded-md"
								alt="Avatar of Writer" />
							<div
								class="flex flex-col justify-between h-full text-sm">
								<p class="pt-1 leading-none text-gray-900">
									Gaspard Wierzbinski
								</p>
								<p class="text-gray-600">
									{{
										new Date(post.id).toLocaleDateString(
											"en-US",
											{
												month: "short",
												day: "2-digit",
												year: "2-digit",
											}
										)
									}}
								</p>
							</div>
						</div>
					</div>
				</article>
			</li>
		</ul>
	</PrimaryContainer>
</template>
