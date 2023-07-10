<script setup lang="ts">
import { me } from "~/app.vue";
import Button from "~/components/button/Button.vue";
import SmallSelect, {
	SelectDirection,
	SelectOrientation,
} from "~/components/select/SmallSelect.vue";
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";
import { Post, Visibility } from "~~/db/entities/Post";

const token = useCookie("token");
const posts = await useFetch("/api/posts", {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token.value}`,
	},
});
const isAdmin = await useFetch<boolean>("/api/user/admin");

const mode = ref<"compact" | "large">("compact");
const router = useRouter();
const isCreatingPost = ref(false);

const createNew = () => {
	isCreatingPost.value = true;
	fetch("/api/post", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
	}).then(async res => {
		if (res.ok) {
			const slug = ((await res.json()) as Post).slug;

			router.push(`/blog/${slug}/edit`);
		}
	});
};

useServerSeoMeta({
	title: "Blog",
	description: "CPlusPatch's personal blog with articles",
	ogImage: "/static/servers.webp",
	twitterCard: "summary_large_image",
});
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-6 mt-20 max-w-7xl">
		<div>
			<nav class="hidden sm:flex" aria-label="Breadcrumb">
				<ol role="list" class="flex items-center space-x-4">
					<li>
						<div class="flex">
							<NuxtLink
								to="/"
								class="text-sm font-medium text-gray-500 hover:text-gray-700">
								Home
							</NuxtLink>
						</div>
					</li>
					<li>
						<div class="flex items-center">
							<Icon
								name="tabler:chevron-right"
								class="flex-shrink-0 h-5 w-5 text-gray-400"
								aria-hidden="true" />
							<NuxtLink
								to="/blog"
								class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
								Blog
							</NuxtLink>
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
				<div class="mt-4 flex-shrink-0 md:mt-0 md:ml-4 flex gap-x-3">
					<SmallSelect
						class="hidden md:flex"
						:default-value="0"
						:items="[
							{
								value: 'compact',
								icon: 'ic:round-grid-view',
								text: 'Compact',
							},
							{
								value: 'large',
								icon: 'ic:round-table-rows',
								text: 'Large',
							},
						]"
						:direction="SelectDirection.Left"
						:orientation="SelectOrientation.Down"
						@update:model-value="(value: any) =>
					mode = value.value" />
					<Button
						v-if="isAdmin.data.value"
						:loading="isCreatingPost"
						theme="orange"
						class="flex gap-x-1 items-center w-full md:w-auto"
						@click="createNew">
						<Icon
							name="tabler:file-plus"
							class="h-5 w-5 mb-0.5" />Add new post
					</Button>
				</div>
			</div>
		</div>

		<ul
			:class="[
				'gap-5 pb-10',
				mode === 'large'
					? 'flex flex-col'
					: 'grid md:grid-cols-3 sm:grid-cols-1',
			]">
			<li v-for="post of posts.data.value" :key="post.id">
				<article
					:class="[
						'w-full rounded group overflow-hidden lg:flex shadow-sm hover:shadow-xl duration-200 ring-1 h-full hover:ring-2 ring-gray-200 hover:ring-orange-500 min-h-[12rem]',
						mode === 'large' ? '' : 'lg:flex-col',
					]">
					<div
						:class="[
							'overflow-hidden h-48 bg-gray-200 relative',
							mode === 'large' ? 'lg:w-64' : 'lg:w-full',
						]">
						<Button
							v-if="post.visibility !== Visibility.PUBLIC"
							class="!absolute !p-2 top-3 right-3 z-10"
							theme="gray">
							<Icon name="tabler:lock" />
						</Button>
						<img
							v-if="post.banner"
							:src="post.banner"
							alt=""
							class="object-cover object-center w-full h-full group-hover:scale-110 duration-500 ease-in-out group-hover:rotate-3" />
					</div>
					<div
						class="flex flex-col justify-between p-4 leading-normal bg-white grow">
						<NuxtLink class="mb-4" :to="`/blog/${post.slug}`">
							<p
								class="flex items-center text-sm font-bold text-gray-600 font-inter">
								<Icon
									name="tabler:article-filled-filled"
									class="mr-2 w-5 h-5" />
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
								:src="post.creator.avatar"
								class="mr-4 w-10 h-10 rounded-md"
								alt="Avatar of Writer" />
							<div
								class="flex flex-col justify-between h-full grow text-sm">
								<p class="pt-1 leading-none text-gray-900">
									{{ post.creator.display_name }}
								</p>
								<p class="text-gray-600">
									{{
										new Date(
											post.created_at ?? 0
										).toLocaleDateString("en-US", {
											month: "short",
											day: "2-digit",
											year: "2-digit",
										})
									}}
								</p>
							</div>
							<NuxtLink
								v-if="isAdmin.data.value"
								class="h-full"
								:to="`/blog/${post.slug}/edit`">
								<Button theme="orange" class="h-full !p-2.5"
									><Icon class="w-5 h-5" name="ic:round-edit"
								/></Button>
							</NuxtLink>
						</div>
					</div>
				</article>
			</li>
		</ul>
	</PrimaryContainer>
</template>
