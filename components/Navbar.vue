<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { IconFileCode, IconMenu2 } from "@tabler/icons-vue";
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
const open = ref(false);

type DebounceFunc<T extends any[]> = (...args: T) => void;

const debounce = <T extends any[]>(
	func: DebounceFunc<T>,
	delay: number
): DebounceFunc<T> => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return (...args: T) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

const handler = debounce(() => {
	const bst = document.body.scrollTop;
	const est = document.documentElement.scrollTop;

	if (!shrunk.value && (bst > 20 || est > 20)) {
		shrunk.value = true;
	}

	if (shrunk.value && bst < 20 && est < 20) {
		shrunk.value = false;
	}
}, 100);

onMounted(() => {
	window.addEventListener("scroll", handler, { passive: true });
});

onUnmounted(() => {
	window.removeEventListener("scroll", handler);
});
</script>

<template>
	<header
		:class="[
			'sticky inset-x-0 top-0 z-30 backdrop-blur-lg duration-200 font-poppins',
			shrunk ? 'bg-gray-50/30 px-5 py-4' : 'bg-transparent p-8',
		]">
		<div
			:class="[
				'flex flex-row justify-between mx-auto max-w-7xl duration-150 bg-transparent',
			]">
			<div class="hidden justify-center items-center md:flex">
				<WideLogo />
			</div>
			<div class="flex justify-center items-center md:hidden">
				<SmallLogo />
			</div>

			<nav class="hidden justify-center items-center md:flex">
				<ul class="flex flex-row gap-8 justify-between">
					<li v-for="n of nav" :key="n.title">
						<NuxtLink :to="n.href" class="text-lg text-gray-800">
							{{ n.title }}
						</NuxtLink>
					</li>
				</ul>
			</nav>

			<Button
				title="Open mobile navbar"
				class="!border-none !p-0 !outline-none !shadow-none md:hidden"
				@click="open = !open">
				<IconMenu2 class="w-8 h-8" />
			</Button>

			<a
				href="https://codeberg.org/CPlusPatch/web-business"
				class="px-5 py-3 no-bad-scale font-inter text-white flex-row gap-x-2 items-center bg-orange-700 rounded-lg shadow-md duration-150 ease-in-out hover:scale-[102%] active:scale-95 hidden md:flex">
				<IconFileCode class="w-5 h-5 no-bad-scale" />
				Source code
			</a>
		</div>
		<Transition
			appear
			enter-from-class="opacity-0 -translate-y-4 sm:translate-y-0 sm:scale-95"
			enter-to-class="opacity-100 translate-y-0 sm:scale-100"
			enter-active-class="ease-out duration-100"
			leave-active-class="ease-in duration-100"
			leave-from-class="opacity-100 translate-y-0 sm:scale-100"
			leave-to-class="opacity-0 -translate-y-4 sm:translate-y-0 sm:scale-95">
			<ul v-if="open" class="flex flex-col gap-4 justify-between mt-4">
				<li v-for="n of nav" :key="n.title">
					<NuxtLink :to="n.href" class="text-lg text-gray-800">
						{{ n.title }}
					</NuxtLink>
				</li>
			</ul>
		</Transition>
	</header>
</template>
