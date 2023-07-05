<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import WideLogo from "./logos/WideLogo.vue";
import SmallLogo from "./logos/SmallLogo.vue";
import Button from "./button/Button.vue";

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

const user = (await useFetch("/api/user/get")).data.value;

const route = useRoute();
const shrunk = ref<boolean>(!!route.meta.smallNavbar);
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

const signOut = () => {
	const token = useCookie("token");

	token.value = null;

	window.location.pathname = "/";
};

onMounted(() => {
	if (!route.meta.smallNavbar)
		window.addEventListener("scroll", handler, { passive: true });
});

onUnmounted(() => {
	window.removeEventListener("scroll", handler);
});
</script>

<template>
	<header
		:class="[
			'fixed inset-x-0 top-0 z-30 backdrop-blur-lg duration-200 font-poppins',
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
				<Icon name="tabler:menu-2" class="w-8 h-8" />
			</Button>

			<HeadlessMenu
				v-if="user"
				v-slot="{ open }"
				as="div"
				class="relative text-left hidden md:flex">
				<div>
					<HeadlessMenuButton
						:as="Button"
						theme="gray"
						class="flex flex-row gap-x-2 py-2 text-left">
						<div class="flex items-center">
							<div>
								<img
									class="inline-block h-9 w-9 rounded"
									:src="user.avatar"
									alt="" />
							</div>
							<div class="ml-3">
								<p
									class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
									{{ user.display_name }}
								</p>
								<p
									class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
									View profile
								</p>
							</div>
						</div>
						<Icon
							name="ic:round-keyboard-arrow-down"
							:class="[
								'-mr-1 duration-200 h-5 w-5 text-gray-400',
								open ? 'rotate-180' : '',
							]"
							aria-hidden="true" />
					</HeadlessMenuButton>
				</div>

				<transition
					enter-active-class="transition ease-out duration-100"
					enter-from-class="transform opacity-0 scale-95"
					enter-to-class="transform opacity-100 scale-100"
					leave-active-class="transition ease-in duration-75"
					leave-from-class="transform opacity-100 scale-100"
					leave-to-class="transform opacity-0 scale-95">
					<HeadlessMenuItems
						class="absolute font-inter outline-none focus:outline-none right-0 z-10 mt-2 top-[100%] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div class="py-1">
							<HeadlessMenuItem v-slot="{ active }">
								<a
									href="/account/"
									:class="[
										active
											? 'bg-gray-100 text-gray-900'
											: 'text-gray-700',
										'block px-3 py-1 text-sm opacity-50 hover:bg-transparent',
									]"
									><Icon
										name="ic:round-manage-accounts"
										class="mr-3" />Account settings</a
								>
							</HeadlessMenuItem>
							<HeadlessMenuItem v-slot="{ active }">
								<NuxtLink
									to="/blog/"
									:class="[
										active
											? 'bg-gray-100 text-gray-900'
											: 'text-gray-700',
										'block px-3 py-1 text-sm',
									]">
									<Icon name="ic:round-feed" class="mr-2" />
									My posts</NuxtLink
								>
							</HeadlessMenuItem>
							<form method="POST" action="#" @submit="signOut">
								<HeadlessMenuItem v-slot="{ active }">
									<button
										type="submit"
										:class="[
											active
												? 'bg-gray-100 text-gray-900'
												: 'text-gray-700',
											'block w-full px-3 py-1 text-left text-sm hover:bg-red-200 hover:text-red-600 duration-200',
										]">
										<Icon
											name="ic:round-logout"
											class="mr-2" />
										Sign out
									</button>
								</HeadlessMenuItem>
							</form>
						</div>
					</HeadlessMenuItems>
				</transition>
			</HeadlessMenu>

			<a
				v-else
				href="https://codeberg.org/CPlusPatch/web-business"
				class="px-5 py-3 no-bad-scale font-inter text-white flex-row gap-x-2 items-center bg-orange-700 rounded-lg shadow-md duration-150 ease-in-out hover:scale-[102%] active:scale-95 hidden md:flex">
				<Icon name="ic:round-code" class="w-5 h-5 no-bad-scale" />
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
