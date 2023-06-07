<template>
	<PrimaryContainer>
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4">
				<h2
					:contenteditable="editable"
					data-placeholder="Header text here"
					class="mb-3 text-3xl font-black inline mr-2 text-gray-800 font-poppins sm:text-5xl"
					@input="
						emit(
							'editField',
							($event.target as HTMLSpanElement).innerText,
							'text-header'
						)
					">
					{{ textHeader }}
				</h2>
				<p
					:contenteditable="editable"
					data-placeholder="Secondary text here"
					class="text-xl text-gray-500 dark:text-gray-300 font-inter"
					@input="
						emit(
							'editField',
							($event.target as HTMLSpanElement).innerText,
							'text-secondary'
						)
					">
					{{ textSecondary }}
				</p>
			</div>
		</div>
		<ul
			role="list"
			class="grid grid-cols-1 gap-5 mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 font-inter">
			<li
				v-for="language of languages"
				:key="language.name"
				class="flex overflow-hidden col-span-1 divide-x divide-gray-300 ring-gray-300 rounded shadow ring-1 duration-200 hover:scale-[102%] no-bad-scale hover:shadow-2xl hover:ring-2 hover:ring-orange-500">
				<Icon
					:style="{
						padding: `${language.padding ?? 0}px`,
					}"
					:name="language.image"
					loading="lazy"
					class="object-contain rounded-sm duration-150 aspect-1 flex flex-shrink-0 sm:w-24 h-20 sm:h-24 w-20"
					alt="" />

				<div
					class="flex relative flex-col flex-1 justify-between items-start truncate bg-white">
					<div class="flex-1 px-4 py-2 text-sm truncate">
						<a href="#" class="text-lg font-bold text-gray-900">
							{{ language.name }}
						</a>
						<p class="text-gray-500">
							{{ language.experience }}
						</p>
					</div>
					<div
						class="flex absolute inset-x-0 bottom-0 flex-col mt-auto w-full">
						<span
							class="px-1 ml-auto text-sm text-gray-600 font-inter">
							{{ language.progress * 100 }}%
						</span>
						<div class="h-2 bg-gray-200">
							<div
								:style="{
									width: `${language.progress * 100}%`,
								}"
								class="h-full bg-red-700 bg-gradient-to-r from-yellow-600 to-red-600" />
						</div>
					</div>
				</div>
			</li>
			<li
				class="flex overflow-hidden col-span-1 divide-x divide-gray-300 ring-gray-300 rounded shadow ring-1 duration-200 hover:scale-[102%] no-bad-scale hover:shadow-2xl hover:ring-2 hover:ring-orange-500">
				<div
					class="flex overflow-hidden flex-shrink-0 justify-center items-center sm:w-24 sm:h-24 w-20 h-20 text-sm font-medium text-white rounded-l-md">
					<IconDots class="w-10 h-auto text-black" />
				</div>
				<div
					class="flex flex-1 justify-between items-start truncate bg-white rounded-r-md">
					<div class="flex-1 px-4 py-2 text-sm truncate">
						<a href="#" class="text-lg font-bold text-gray-900">
							And more!
						</a>
						<p class="text-gray-500">Forever</p>
					</div>
				</div>
			</li>
		</ul>
	</PrimaryContainer>
</template>

<script setup lang="ts">
import { IconDots } from "@tabler/icons-vue";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader: string;
	textSecondary: string;
}>();

const emit = defineEmits(["editField"]);

const languages: {
	name: string;
	type: string;
	experience: string;
	image: string;
	progress: number;
	padding?: number;
}[] = [
	{
		name: "TypeScript",
		type: "Language",
		experience: "One year",
		image: "logos:typescript-icon",
		progress: 0.9,
	},
	{
		name: "Vue 3",
		type: "Framework",
		experience: "One year",
		image: "logos:vue",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "JavaScript",
		type: "Language",
		experience: "Five years",
		image: "logos:javascript",
		progress: 1.0,
	},
	{
		name: "React",
		type: "Framework",
		experience: "Two years",
		image: "logos:react",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Next.js",
		type: "Framework",
		experience: "One year",
		image: "logos:nextjs",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "CSS",
		type: "Language",
		experience: "Seven years",
		image: "logos:css-3",
		progress: 0.8,
		padding: 5,
	},
	{
		name: "HTML",
		type: "Language",
		experience: "Seven years",
		image: "logos:html-5",
		progress: 1.0,
		padding: 5,
	},
	{
		name: "Firebase",
		type: "Framework",
		experience: "One year",
		image: "logos:firebase",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "Supabase",
		type: "Framework",
		experience: "One year",
		image: "logos:supabase-icon",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "Node.js",
		type: "Runtime",
		experience: "Three years",
		image: "logos:nodejs",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Bun",
		type: "Runtime",
		experience: "One year",
		image: "logos:bun",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "NPM",
		type: "Package Manager",
		experience: "Three years",
		image: "logos:npm-icon",
		progress: 1,
	},
	{
		name: "PNPM",
		type: "Package Manager",
		experience: "One year",
		image: "logos:pnpm",
		progress: 1,
		padding: 8,
	},
	{
		name: "Yarn",
		type: "Package Manager",
		experience: "One year",
		image: "logos:yarn",
		progress: 1,
		padding: 8,
	},
	{
		name: "TailwindCSS",
		type: "Framework",
		experience: "Two years",
		image: "logos:tailwindcss-icon",
		progress: 1.0,
		padding: 5,
	},
	{
		name: "Unreal Engine",
		type: "Language",
		experience: "Five years",
		image: "logos:unrealengine-icon",
		progress: 0.2,
		padding: 8,
	},
	{
		name: "Github",
		type: "Repository",
		experience: "Four years",
		image: "logos:github-icon",
		progress: 0.9,
		padding: 8,
	},
	{
		name: "Python",
		type: "Language",
		experience: "Seven years",
		image: "logos:python",
		progress: 0.9,
		padding: 8,
	},
	{
		name: "Discord.js",
		type: "Framework",
		experience: "One year",
		image: "logos:discord-icon",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "PHP",
		type: "Language",
		experience: "Four years",
		image: "logos:php-alt",
		progress: 0.5,
		padding: 8,
	},
	{
		name: "Laravel",
		type: "Framework",
		experience: "Two years",
		image: "logos:laravel",
		progress: 0.4,
		padding: 8,
	},
	{
		name: "Git",
		type: "Tool",
		experience: "Four years",
		image: "logos:git-icon",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Vite",
		type: "Framework",
		experience: "One year",
		image: "logos:vitejs",
		progress: 0.5,
		padding: 8,
	},
	{
		name: "Docker",
		type: "Framework",
		experience: "Recent",
		image: "logos:docker-icon",
		progress: 0.3,
		padding: 8,
	},
	{
		name: "Preact",
		type: "Framework",
		experience: "Recent",
		image: "logos:preact",
		progress: 0.9,
		padding: 5,
	},
	{
		name: "Raspberry Pi",
		type: "Hardware",
		experience: "Seven years",
		image: "logos:raspberry-pi",
		progress: 1.0,
		padding: 8,
	},
	{
		name: "Arduino",
		type: "Hardware",
		experience: "Seven years",
		image: "logos:arduino",
		progress: 0.4,
		padding: 8,
	},
	{
		name: "JQuery",
		type: "Framework",
		experience: "Four years",
		image: "logos:jquery",
		progress: 0.5,
		padding: 8,
	},
	{
		name: "Rust",
		type: "Language",
		experience: "Recent",
		image: "logos:rust",
		progress: 0.2,
		padding: 8,
	},
	{
		name: "Ubuntu",
		type: "OS",
		experience: "Seven years",
		image: "logos:ubuntu",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Arch Linux",
		type: "OS",
		experience: "Two years",
		image: "logos:archlinux",
		progress: 0.7,
		padding: 8,
	},
];

languages.sort((a, b) => b.progress - a.progress);
</script>
