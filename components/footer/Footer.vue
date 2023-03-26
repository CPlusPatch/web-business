<script setup lang="ts">
import { IconMail } from '@tabler/icons-vue'
import { IconBrandMatrix } from '@tabler/icons-vue';
import { IconCopyleft } from '@tabler/icons-vue';
import { IconBrandStackoverflow } from '@tabler/icons-vue';
import { IconCode } from '@tabler/icons-vue'
import { IconBrandGithub } from '@tabler/icons-vue'

const socials = [
	{
		name: "GitHub",
		href: "https://github.com/CPlusPatch",
		icon: IconBrandGithub,
	},
	{
		name: "Codeberg",
		href: "https://codeberg.org/CPlusPatch",
		icon: IconCode,
	},
	{
		name: "E-mail",
		href: "mailto:contact@cpluspatch.com",
		icon: IconMail,
	},
	{
		name: "StackOverflow",
		href: "https://stackoverflow.com/users/12187615/cpluspatch",
		icon: IconBrandStackoverflow,
	},
	{
		name: "Matrix",
		href: "https://matrix.to/#/@jesse:cpluspatch.dev",
		icon: IconBrandMatrix,
	},
];
</script>

<template>
	<footer class="">
		<div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8 font-inter">
			<div id="contact" class="flex justify-center space-x-6 ring-blue-500 md:order-2 focus:ring-1">
				<a v-for="item of socials" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">{{ item.name }}</span>
					<component :is="item.icon" aria-hidden="true" size="24"/>
				</a>
			</div>
			<div class="mt-8 md:mt-0 md:order-1">
				<p class="text-base text-center text-gray-600">
					<IconCopyleft class="h-[1em] inline mb-0.5" /> {{ new Date().getFullYear() }}&nbsp;
					Gaspard Wierzbinski. Licensed under GPLv3
				</p>
			</div>
		</div>
	</footer>
</template>