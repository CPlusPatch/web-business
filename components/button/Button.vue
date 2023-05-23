<script setup lang="ts">
import { ButtonHTMLAttributes } from "nuxt/dist/app/compat/capi";
import Spinner from "../spinner/Spinner.vue";

const themes: { [key: string]: string } = {
	gray: "dark:text-gray-200 !bg-white text-black dark:bg-dark-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline-none",
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
			'inline-flex justify-center relative ease-in-out items-center no-bad-scale rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm duration-200 font-inter focus:outline-none',
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
