<!-- eslint-disable vue/require-default-prop -->
<script lang="ts">
export enum SelectDirection {
	Right = "right",
	Left = "left",
	Center = "center",
}

export enum SelectOrientation {
	Up = "up",
	Down = "down",
}

export interface SelectItem {
	text: string;
	value: string;
	icon: any;
	description?: string;
}
</script>

<script setup lang="ts">
interface SelectProps {
	items: SelectItem[];
	defaultValue: number;
	direction?: SelectDirection;
	orientation?: SelectOrientation;
	name?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
	direction: SelectDirection.Right,
	orientation: SelectOrientation.Down,
});
const emit = defineEmits(["update:modelValue"]);

const selected = ref<SelectItem>(props.items[props.defaultValue]);
</script>

<template>
	<HeadlessListbox
		v-model="selected"
		:name="name"
		as="div"
		class="relative font-inter"
		@update:model-value="(value: any) => emit('update:modelValue', value)">
		<HeadlessListboxButton
			v-bind="$attrs"
			class="flex relative flex-row gap-x-1 items-center p-2 text-gray-600 rounded duration-200 cursor-default dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
			<component
				:is="selected.icon"
				:stroke-width="2"
				class="w-6 h-6"
				aria-hidden="true" />
		</HeadlessListboxButton>
		<TransitionsScaleFadeSlide>
			<HeadlessListboxOptions
				:class="[
					'p-1.5 gap-x-4 outline-none text-base absolute w-44 overflow-hidden sm:text-sm rounded-lg shadow-lg bg-white dark:bg-dark-700/60 backdrop-blur-lg focus:outline-none',
					direction === SelectDirection.Left &&
						'right-0 origin-top-right',
					direction === SelectDirection.Center &&
						'right-0 origin-top-right translate-x-[50%]',
					orientation === SelectOrientation.Up && 'bottom-[110%]',
					orientation === SelectOrientation.Down && 'top-[110%]',
				]">
				<HeadlessListboxOption
					v-for="item in items"
					:key="item.value"
					:value="item"
					as="button"
					class="text-gray-700 duration-300 w-full dark:text-gray-50 hover:bg-orange-200 rounded-lg text-sm dark:hover:bg-orange-700/20 flex flex-row items-center py-2">
					<component
						:is="item.icon"
						class="mx-2 h-[1.2em] w-[1.2em] mb-0.5"
						aria-hidden="true" />
					{{ item.text }}
				</HeadlessListboxOption>
			</HeadlessListboxOptions>
		</TransitionsScaleFadeSlide>
	</HeadlessListbox>
</template>
