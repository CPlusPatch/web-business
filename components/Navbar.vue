<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { IconFileCode } from "@tabler/icons-vue";
import WideLogo from "./logos/WideLogo.vue";
import SmallLogo from "./logos/SmallLogo.vue";

const nav = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Skills",
		href: "/#skills",
	},
	{
		title: "Devices",
		href: "/devices",
	},
	{
		title: "CMS",
		href: "/blog",
	},
	{
		title: "Projects",
		href: "/projects",
	},
];

const shrunk = ref<boolean>(false);

const handler = () => {
	let bst = document.body.scrollTop;
	let est = document.documentElement.scrollTop;

	if (!shrunk.value && (bst > 20 || est > 20)) shrunk.value = true;

	if (shrunk.value && bst < 20 && est < 20) shrunk.value = false;
};

onMounted(() => {
	window.addEventListener("scroll", handler, { passive: true });
})

onUnmounted(() => {
	window.removeEventListener("scroll", handler);
});
</script>

<template>
	<header
		:class="[
			'sticky top-0 z-30 backdrop-blur-lg duration-200 font-poppins',
			shrunk ? 'bg-white/30' : 'bg-transparent',
		]">
		<div
			:class="[
				'flex flex-row justify-between mx-auto max-w-7xl duration-150 bg-transparent',
				shrunk ? 'px-5 py-3' : 'p-8',
			]">
			<div class="hidden justify-center items-center md:flex">
				<WideLogo />
			</div>
			<div class="flex justify-center items-center md:hidden">
				<SmallLogo />
			</div>

			<nav class="hidden justify-center items-center md:flex">
				<ul class="flex flex-row gap-8 justify-between h-100">
					<li v-for="n of nav" :key="n.title">
						<NuxtLink :to="n.href" class="text-lg text-gray-800">
							{{ n.title }}
						</NuxtLink>
					</li>
				</ul>
			</nav>

			<a
				href="https://codeberg.org/CPlusPatch/web-business"
				class="px-5 py-3 no-bad-scale font-inter text-white flex-row gap-x-2 items-center bg-orange-700 rounded-lg shadow-md duration-150 ease-in-out hover:scale-[102%] active:scale-95 hidden md:flex">
				<IconFileCode class="w-5 h-5 no-bad-scale" />
				Source code
			</a>
		</div>
	</header>
</template>
