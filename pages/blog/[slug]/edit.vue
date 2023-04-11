<script setup lang="ts">
import { IconDots } from "@tabler/icons-vue";
import { marked } from "marked";
import SmallLogo from "~/components/logos/SmallLogo.vue";
import EditorSettings from "~/components/slide-over/EditorSettings.vue";
import { Post } from "~/db/entities/Post";

definePageMeta({
	middleware: "auth",
	layout: "editor",
});

const route = useRoute();
const isSaving = ref(false);
const showSidebar = ref(false);
const token = useCookie("token");
const titleInput = ref<HTMLInputElement | null>(null);

const post = await useFetch<Post>(`/api/post/${route.params.slug}`);

const content = ref(post.data.value?.content ?? "");

const save = () => {
	isSaving.value = true;
	fetch(`/api/post/${route.params.slug}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			content: content.value,
			title: titleInput.value?.value ?? undefined,
		}),
	})
		.then(data => {
			switch (data.status) {
				case 201:
				case 200: {
					break;
				}
			}
		})
		.catch(err => {
			console.error(err);
		})
		.finally(() => {
			isSaving.value = false;
		});
};

const handleKeydown = (e: KeyboardEvent) => {
	// Save document on Ctrl + S
	if (e.key == "s" && e.ctrlKey) {
		e.preventDefault();
		save();
	}
};

onMounted(() => {
	if (titleInput.value) titleInput.value.value = post.data.value?.title ?? "";
	document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	document.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped lang="postcss">
.editor-half {
	@apply p-6 overflow-scroll max-h-full pb-64 border-none duration-200 outline-none font-inter focus:outline-none ring-1 ring-gray-300 hover:ring-2 focus:ring-orange-500 rounded;
}
</style>

<template>
	<nav class="fixed inset-x-0 top-0 z-30 bg-white shadow">
		<div
			class="flex relative justify-between h-16 px-2 mx-auto sm:px-6 lg:px-8">
			<div class="flex flex-1 justify-start items-center">
				<NuxtLink
					to="/blog"
					class="flex flex-shrink-0 items-center pl-3 sm:pl-0 duration-150 ease-in-out hover:scale-[110%] active:scale-95">
					<SmallLogo />
				</NuxtLink>
				<div
					class="hidden items-center sm:ml-6 sm:flex sm:space-x-8 font-inter relative">
					<input
						type="text"
						:disabled="isSaving"
						ref="titleInput"
						class="block px-3 py-2 focus:shadow w-full pt-[0.6rem] placeholder-gray-500 bg-white rounded-md border border-gray-300 shadow-sm duration-200 appearance-none outline-none dark:text-gray-100 dark:bg-dark-800 dark:border-dark-700 disabled:bg-gray-100 focus:ring-orange-500 focus:ring-1 focus:outline-none sm:text-sm"
						placeholder="Title for your post" />
				</div>
				<div
					v-if="!isSaving"
					class="flex gap-x-1 items-center pt-1 ml-3 h-full font-inter">
					<kbd
						class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
						Ctrl
					</kbd>
					+
					<kbd
						class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
						S </kbd
					>to save
				</div>
				<div
					v-else
					class="flex text-gray-500 items-center pt-1 ml-3 h-full font-inter gap-x-2">
					<Spinner class="mb-0.5" />
					Saving document
				</div>
			</div>
			<div
				class="flex absolute inset-y-0 right-0 gap-x-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
				<span class="inline-flex relative z-0 rounded-md shadow-sm">
					<button type="button" @click="showSidebar = true">
						<IconDots class="w-5 h-5" />
					</button>
				</span>
			</div>
		</div>
	</nav>
	<div class="h-screen flex">
		<div
			class="grid md:grid-cols-2 grid-cols-1 m-5 pt-16 grow justify-between gap-6">
			<textarea
				@input="content = ($event.target as any).value"
				class="editor-half no-scroll"
				:disabled="isSaving"
				>{{ post.data.value?.content }}</textarea
			>
			<article
				class="editor-half no-scroll prose !max-w-none"
				v-html="marked(content)"></article>
		</div>
	</div>
	<EditorSettings
		v-if="showSidebar"
		:onclose="() => (showSidebar = false)"
		:post="post.data as Ref<Post>" />
</template>
