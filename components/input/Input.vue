<script setup lang="ts">
import { InputHTMLAttributes } from "nuxt/dist/app/compat/capi";

interface InputProps extends InputHTMLAttributes {
	loading?: boolean;
	name: string;
	icon?: string;
}

const props = defineProps<InputProps>();
</script>

<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>

<template>
	<div class="relative overflow-hidden">
		<input
			:name="props.name"
			:disabled="props.loading"
			:class="[
				'block peer pr-3 py-2 focus:shadow-xl w-full pt-[0.6rem] pl-3 placeholder-gray-500 bg-white rounded-md border border-gray-300 shadow-sm duration-200 appearance-none outline-none dark:text-gray-100 dark:bg-dark-800 dark:border-dark-600 disabled:bg-gray-100 focus:outline-none sm:text-sm',
				props.icon && 'focus:pl-8',
			]"
			v-bind="$attrs" />
		<div
			v-if="icon"
			class="absolute left-2 inset-y-0 flex items-center peer-focus:translate-x-0 -translate-x-7 duration-200">
			<Icon :name="icon" class="w-5 h-5 text-gray-400" />
		</div>
	</div>
</template>
