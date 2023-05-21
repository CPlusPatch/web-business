<script setup lang="ts">
import { ButtonHTMLAttributes } from "nuxt/dist/app/compat/capi";
import Spinner from "../spinner/Spinner.vue";

const themes: { [key: string]: string } = {
	gray: "dark:text-gray-200 !bg-gray-50 text-black dark:bg-dark-800 dark:border-gray-600 outline-none hover:scale-105",
	orange: "!bg-orange-600 hover:bg-orange-700 text-white border-transparent",
	orangeLight:
		"text-orange-700 dark:text-orange-200 !bg-orange-100 dark:bg-orange-800 hover:bg-orange-200 border-transparent",
};

interface ButtonProps extends ButtonHTMLAttributes {
	theme?: "gray" | "orange" | "orangeLight";
	loading?: boolean;
	spinnerClasses?: string;
	disabled?: boolean;
}

defineProps<ButtonProps>();
</script>

<template>
	<button
		:class="[
			'inline-flex justify-center relative ease-in-out items-center no-bad-scale px-4 py-2 text-base font-medium rounded-md border shadow-sm duration-200 font-inter focus:outline-none sm:text-sm',
			theme && themes[theme],
			loading && '!text-transparent',
		]"
		:disabled="disabled || loading"
		type="button">
		<Spinner
			v-if="loading"
			:theme="theme"
			:class="[spinnerClasses, 'absolute']" />
		<slot />
	</button>
</template>
