<script setup lang="ts">
import PrimaryContainer from "../layout/PrimaryContainer.vue";

const software = [
	{
		name: "",
		img: "/static/stack/desktop-computer.svg",
	},
	{
		name: "",
		img: "/static/stack/globe.svg",
	},
	{
		name: "",
		img: "/static/stack/folder.svg",
	},
	{
		name: "",
		img: "/static/stack/keyboard.svg",
	},
	{
		name: "",
		img: "/static/stack/high-voltage.svg",
	},
	{
		name: "",
		img: "/static/stack/computer-mouse.svg",
	},
];
</script>

<template>
	<PrimaryContainer class="flex flex-row items-center" id="workflow">
		<div class="flex relative z-20 flex-col gap-y-4 sm:w-2/3 lg:w-2/5">
			<h2
				class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl">
				Open-source workflow
			</h2>

			<p class="text-xl text-gray-500 font-inter">
				I use open-source and libre sofware as part of my development
				workflow. This includes:
			</p>

			<ul
				class="space-y-1 max-w-md list-disc list-inside font-inter font-semibold">
				<li>VSCodium</li>
				<li>Ubuntu LTS-based Linux/Arch</li>
				<li>LibreWolf Browser</li>
				<li>Codeberg.org</li>
				<li>GPLv3 license</li>
			</ul>
		</div>
		<div
			class="hidden relative grid-cols-3 grid-rows-2 gap-3 ml-auto sm:w-1/3 lg:w-1/2 sm:grid">
			<nuxt-img
				v-for="app of software"
				:src="app.img"
				class="p-2 w-full rounded-md md:max-w-xl hover:rotate-3 duration-200"
				width="150"
				alt=""
				height="150" />
		</div>
	</PrimaryContainer>
</template>
