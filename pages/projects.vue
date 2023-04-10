<script setup lang="ts">
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";

const projects = [
	{
		name: "Fedibase",
		href: "https://codeberg.org/CPlusPatch/fedibase",
		description:
			"Fedibase is my flagship project, a fast, beautiful and easy to use Fediverse client that gets things right. It is written in Vue.js and is the most popular of my applications",
		tags: [
			{
				name: "VueJS",
				color: "bg-green-100",
				textColor: "text-green-800",
			},
			{
				name: "TailwindCSS",
				color: "bg-blue-100",
				textColor: "text-blue-800",
			},
			{
				name: "PNPM",
				color: "bg-orange-100",
				textColor: "text-orange-800",
			},
		],
	},
	{
		name: "CPlusPatch Web",
		href: "https://codeberg.org/CPlusPatch/web-business",
		description:
			"My new personal website, rewritten from the ground up using Nuxt.js and TailwindCSS: it is the 9th iteration of this particular project, preceded by CPlusPatch CMS Next",
		tags: [
			{
				name: "Nuxt.js",
				color: "bg-emerald-100",
				textColor: "text-emerald-800",
			},
			{
				name: "VueJS",
				color: "bg-green-100",
				textColor: "text-green-800",
			},
			{
				name: "TailwindCSS",
				color: "bg-blue-100",
				textColor: "text-blue-800",
			},
			{
				name: "PNPM",
				color: "bg-orange-100",
				textColor: "text-orange-800",
			},
		],
	},
	{
		name: "Matrix Homeserver",
		href: "#",
		description:
			"The Matrix federated protocol allows for secure end-to-end encrypted modern communication between users. I am hosting my own homeserver for better privacy and speed.",
		tags: [
			{
				name: "Privacy",
				color: "bg-red-100",
				textColor: "text-red-800",
			},
			{
				name: "Decentralized",
				color: "bg-black",
				textColor: "text-white",
			},
			{
				name: "Federation",
				color: "bg-orange-100",
				textColor: "text-orange-800",
			},
		],
	},
	{
		name: "CPlusPatch CMS Next",
		href: "https://codeberg.org/CPlusPatch/cpluspatch-cms-next",
		description:
			"My old personal website, part of CPlusPatch CMS. It is a modern application written from the ground up with Next.js and TailwindCSS, incorporated into my CMS.",
		tags: [
			{
				name: "React",
				color: "bg-sky-100",
				textColor: "text-sky-800",
			},
			{
				name: "TailwindCSS",
				color: "bg-blue-100",
				textColor: "text-blue-800",
			},
			{
				name: "NextJS",
				color: "bg-gray-100",
				textColor: "text-gray-800",
			},
			{
				name: "Yarn",
				color: "bg-green-100",
				textColor: "text-green-800",
			},
		],
	},
	{
		name: "GAREF Orbit Camera",
		href: "https://github.com/CPlusPatch/garef-rpi-gopro-interface",
		description:
			"This application is a simple Python application to control an onboard GoPro 10 aboard a satellite to be launched in 2023. It takes images and communicates with a chip to beam them back to Earth.",
		tags: [
			{
				name: "Python",
				color: "bg-yellow-100",
				textColor: "text-yellow-800",
			},
			{
				name: "GoPro",
				color: "bg-slate-100",
				textColor: "text-slate-800",
			},
			{
				name: "Aerospace",
				color: "bg-indigo-100",
				textColor: "text-indigo-800",
			},
		],
	},
	{
		name: "Astro Pi Challenge",
		href: "https://www.esa.int/Education/AstroPI/2016_17_European_Astro_Pi_Challenge_Winners",
		description:
			"Winner of the 2016 Astro Pi international program, written by me at age 10. The program measured atmospheric and magnetic sensor data an logged them to a SenseHAT screen. This program was executed aboard the International Space Station.",
		tags: [
			{
				name: "Python",
				color: "bg-yellow-100",
				textColor: "text-yellow-800",
			},
			{
				name: "Raspberry Pi",
				color: "bg-rose-100",
				textColor: "text-rose-800",
			},
			{
				name: "Aerospace",
				color: "bg-indigo-100",
				textColor: "text-indigo-800",
			},
		],
	},
];
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-10">
		<h1
			class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl">
			Projects
		</h1>
		<div>
			<h2
				class="text-xs font-medium tracking-wide text-gray-500 uppercase">
				Pinned Projects
			</h2>
			<ul
				role="list"
				class="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<li
					v-for="project of projects"
					:key="project.name"
					class="flex col-span-1 rounded-md shadow-sm font-inter duration-200 ease-in-out hover:shadow-xl hover:ring-2 ring-orange-400">
					<a
						:href="project.href"
						class="flex flex-col justify-between items-start p-3 max-w-full bg-white rounded-md border border-gray-200">
						<h3
							class="pb-4 text-lg font-bold text-gray-900 hover:text-gray-600">
							{{ project.name }}
						</h3>
						<p class="text-gray-500">{{ project.description }}</p>
						<div
							class="flex flex-wrap flex-row gap-2 mt-3 max-w-full no-scroll">
							<span
								v-for="tag of project.tags"
								:key="tag.name"
								:class="`${tag.color} inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tag.textColor}`">
								{{ tag.name }}
							</span>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</PrimaryContainer>
</template>
