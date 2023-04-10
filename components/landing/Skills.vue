<template>
	<PrimaryContainer id="skills">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4">
				<h2
					class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl">
					Languages & Frameworks
				</h2>
				<p class="text-xl text-gray-500 dark:text-gray-300 font-inter">
					My experience with several different programming languages,
					frameworks, and libraries. Skill in any may vary from
					project to project.
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
				<nuxt-img
					:style="{
						padding: `${language.padding ?? 0}px`,
					}"
					width="100"
					height="100"
					loading="lazy"
					class="object-contain rounded-sm duration-150 aspect-1 flex flex-shrink-0 sm:w-24 h-20 sm:h-24 w-20"
					:src="`/static/${language.image}`"
					alt="" />

				<div
					class="flex relative flex-col flex-1 justify-between items-start truncate bg-white">
					<div class="flex-1 px-4 py-2 text-sm truncate">
						<a href="#" class="text-lg font-bold text-gray-900">
							{{ language.name }}
						</a>
						<p class="text-gray-500">{{ language.experience }}</p>
					</div>
					<div
						class="flex absolute inset-x-0 bottom-0 flex-col mt-auto w-full">
						<span
							class="px-1 ml-auto text-sm text-gray-600 rounded-tl-md border-t border-l font-inter">
							{{ language.progress * 100 }}%
						</span>
						<div class="h-2 bg-gray-200">
							<div
								:style="{
									width: `${language.progress * 100}%`,
								}"
								class="h-full bg-red-700 bg-gradient-to-r from-yellow-600 to-red-600"></div>
						</div>
					</div>
				</div>
			</li>
			<li class="flex overflow-hidden col-span-1 rounded-md shadow-sm">
				<div
					class="flex overflow-hidden flex-shrink-0 justify-center items-center sm:w-24 sm:h-24 w-20 h-20 text-sm font-medium text-white rounded-l-md border">
					<IconDots class="w-10 h-auto text-black" />
				</div>
				<div
					class="flex flex-1 justify-between items-start truncate bg-white rounded-r-md border-t border-r border-b border-gray-200">
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
import PrimaryContainer from "../layout/PrimaryContainer.vue";

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
		image: "languages/typescript.svg",
		progress: 0.9,
	},
	{
		name: "Vue 3",
		type: "Framework",
		experience: "One year",
		image: "languages/vue.svg",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "JavaScript",
		type: "Language",
		experience: "Five years",
		image: "languages/javascript.svg",
		progress: 1.0,
	},
	{
		name: "React",
		type: "Framework",
		experience: "Two years",
		image: "languages/react.svg",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Next.js",
		type: "Framework",
		experience: "One year",
		image: "languages/nextjs.svg",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "CSS",
		type: "Language",
		experience: "Seven years",
		image: "languages/css-3.svg",
		progress: 0.8,
		padding: 5,
	},
	{
		name: "HTML",
		type: "Language",
		experience: "Seven years",
		image: "languages/html-5.svg",
		progress: 1.0,
		padding: 5,
	},
	{
		name: "Firebase",
		type: "Framework",
		experience: "One year",
		image: "languages/firebase.svg",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "Supabase",
		type: "Framework",
		experience: "One year",
		image: "languages/supabase.svg",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "Node.js",
		type: "Runtime",
		experience: "Three years",
		image: "languages/nodejs.svg",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Bun",
		type: "Runtime",
		experience: "One year",
		image: "languages/bun.svg",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "NPM",
		type: "Package Manager",
		experience: "Three years",
		image: "languages/npm.svg",
		progress: 1,
	},
	{
		name: "PNPM",
		type: "Package Manager",
		experience: "One year",
		image: "languages/pnpm.svg",
		progress: 1,
		padding: 8,
	},
	{
		name: "Yarn",
		type: "Package Manager",
		experience: "One year",
		image: "languages/yarn.svg",
		progress: 1,
		padding: 8,
	},
	{
		name: "TailwindCSS",
		type: "Framework",
		experience: "Two years",
		image: "languages/tailwindcss.svg",
		progress: 1.0,
		padding: 5,
	},
	{
		name: "Unreal Engine",
		type: "Language",
		experience: "Five years",
		image: "languages/unreal-engine.svg",
		progress: 0.2,
		padding: 8,
	},
	{
		name: "Github",
		type: "Repository",
		experience: "Four years",
		image: "languages/github.svg",
		progress: 0.9,
		padding: 8,
	},
	{
		name: "Codeberg",
		type: "Repository",
		experience: "Recent",
		image: "languages/codeberg.svg",
		progress: 1.0,
		padding: 8,
	},
	{
		name: "Python",
		type: "Language",
		experience: "Seven years",
		image: "languages/python.svg",
		progress: 0.9,
		padding: 8,
	},
	{
		name: "Discord.js",
		type: "Framework",
		experience: "One year",
		image: "languages/discord.svg",
		progress: 0.6,
		padding: 8,
	},
	{
		name: "PHP",
		type: "Language",
		experience: "Four years",
		image: "languages/php.svg",
		progress: 0.5,
		padding: 8,
	},
	{
		name: "Laravel",
		type: "Framework",
		experience: "Two years",
		image: "languages/laravel.svg",
		progress: 0.4,
		padding: 8,
	},
	{
		name: "Git",
		type: "Tool",
		experience: "Four years",
		image: "languages/git.svg",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Vite",
		type: "Framework",
		experience: "One year",
		image: "languages/vitejs.svg",
		progress: 0.5,
		padding: 8,
	},
	{
		name: "Docker",
		type: "Framework",
		experience: "Recent",
		image: "languages/docker.svg",
		progress: 0.3,
		padding: 8,
	},
	{
		name: "Preact",
		type: "Framework",
		experience: "Recent",
		image: "languages/preact.svg",
		progress: 0.9,
		padding: 5,
	},
	{
		name: "Raspberry Pi",
		type: "Hardware",
		experience: "Seven years",
		image: "languages/raspberry-pi.svg",
		progress: 1.0,
		padding: 8,
	},
	{
		name: "Arduino",
		type: "Hardware",
		experience: "Seven years",
		image: "languages/arduino.svg",
		progress: 0.4,
		padding: 8,
	},
	{
		name: "JQuery",
		type: "Framework",
		experience: "Four years",
		image: "languages/jquery.svg",
		progress: 0.5,
		padding: 8,
	},
	{
		name: "Rust",
		type: "Language",
		experience: "Recent",
		image: "languages/rust.svg",
		progress: 0.2,
		padding: 8,
	},
	{
		name: "Ubuntu",
		type: "OS",
		experience: "Seven years",
		image: "languages/ubuntu.svg",
		progress: 0.8,
		padding: 8,
	},
	{
		name: "Arch Linux",
		type: "OS",
		experience: "Two years",
		image: "languages/archlinux.svg",
		progress: 0.7,
		padding: 8,
	},
];

languages.sort((a, b) => b.progress - a.progress);
</script>
