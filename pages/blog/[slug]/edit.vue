<script setup lang="ts">
import { IconDots } from '@tabler/icons-vue';
import { marked } from 'marked';
import SmallLogo from '~/components/logos/SmallLogo.vue';
import { Post } from '~/db/entities/Post';

definePageMeta({
	middleware: "auth",
	layout: "editor"
});

const route = useRoute();
const isSaving = ref(false);
const token = useCookie("token");

const post = await useFetch<Post>(`/api/post/${route.params.slug}`);

const content = ref(post.data.value?.content ?? '');

const save = () => {
	fetch(`/api/post/${route.params.slug}`, {
		method: "PUT",
		headers: { 
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token.value}`
		},
		body: JSON.stringify({
			content: content.value
		})
	}).then(data => {
		switch (data.status) {
			case 201:
			case 200: {
				alert("Saved successfully")
				break;
			}
		}
	}).catch(err => {
		console.error(err);
	})
}

const handleKeydown = (e: KeyboardEvent) => {
	// Save document on Ctrl + S
	if (e.key == "s" && e.ctrlKey) {
		e.preventDefault();
		save();
	}
}

onMounted(() => {
	document.addEventListener("keydown", handleKeydown);
})

onUnmounted(() => {
	document.removeEventListener("keydown", handleKeydown);
})
</script>

<style scoped lang="postcss">
.editor-half {
	@apply p-6 overflow-scroll border-none duration-200 outline-none font-inter focus:outline-none ring-1 ring-gray-300 hover:ring-2 focus:ring-orange-500 rounded;
}
</style>

<template>
	<nav class="fixed inset-x-0 top-0 z-30 bg-white shadow">
		<div class="px-2 mx-auto sm:px-6 lg:px-8">
			<div class="flex relative justify-between h-16">
				<div class="flex flex-1 justify-start items-center">
					<NuxtLink to="/blog"
						class="flex flex-shrink-0 items-center pl-3 sm:pl-0 duration-150 ease-in-out hover:scale-[110%] active:scale-95">
						<SmallLogo />
					</NuxtLink>
					<div class="hidden items-center sm:ml-6 sm:flex sm:space-x-8 font-inter">
						<input type="text" :value="post.data.value?.title"
							class="block w-full rounded-md border-gray-300 shadow-sm duration-200 outline-none disabled:bg-gray-100 focus:ring-orange-500 focus:border-orange-500"
							placeholder="Title for your post" />
					</div>
					<div class="flex gap-x-1 items-center pt-1 ml-3 h-full font-inter">
						<kbd
							class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
							Ctrl
						</kbd>
						+
						<kbd
							class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
							S
						</kbd>to save
					</div>
				</div>
				<div
					class="flex absolute inset-y-0 right-0 gap-x-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
					<span class="inline-flex relative z-0 rounded-md shadow-sm">
						<button type="button">
							<IconDots class="w-5 h-5" />
						</button>
					</span>
				</div>
			</div>
		</div>
	</nav>
	<div class="min-h-screen flex">
		<div class="grid grid-cols-2 m-5 pt-16 grow justify-between gap-x-6">
			<textarea @input="content = ($event.target as any).value"
				class="editor-half no-scroll">{{ post.data.value?.content }}</textarea>
			<article class="editor-half no-scroll prose !max-w-none hover:!ring-orange-500" v-html="marked(content)">
			</article>
		</div>
	</div>
</template>