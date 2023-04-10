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
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/vue";
import { ref } from "vue";
import ScaleFadeSlide from "../transitions/ScaleFadeSlide.vue";

interface SelectProps {
	items: SelectItem[];
	defaultValue: number;
	direction?: SelectDirection;
	orientation?: SelectOrientation;
	name?: string;
}

const props = defineProps<SelectProps>();
const emit = defineEmits(["update:modelValue"]);

const selected = ref<SelectItem>(props.items[props.defaultValue]);
</script>

<template>
	<Listbox
		:name="name"
		v-model="selected"
		as="div"
		class="relative font-inter"
		@update:modelValue="value => emit('update:modelValue', value)">
		<ListboxButton
			title="Open select menu"
			class="flex relative flex-row gap-x-1 items-center p-2 text-gray-600 rounded duration-200 cursor-default dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
			<component
				:is="selected.icon"
				:strokeWidth="2"
				class="w-6 h-6"
				aria-hidden="true" />
		</ListboxButton>
		<ScaleFadeSlide>
			<ListboxOptions
				:class="[
					'overflow-auto absolute z-30 dark:border-gray-700 shadow-lg mt-1 w-64 text-base rounded-md border font-inter bg-gray-100/75 dark:bg-dark-800/75 backdrop-blur-md',
					direction === SelectDirection.Left &&
						'right-0 origin-top-right',
					direction === SelectDirection.Center &&
						'right-0 origin-top-right translate-x-[50%]',
					orientation === SelectOrientation.Up && 'bottom-[110%]',
				]">
				<ListboxOption
					v-for="item in items"
					:key="item.value"
					:value="item"
					:class="[
						item.value === selected.value &&
							'bg-orange-100 dark:bg-orange-500/10',
						'm-2 rounded flex relative flex-row gap-x-3 items-center py-2 px-3 text-gray-800 dark:text-gray-100 duration-200 cursor-default select-none hover:bg-gray-200 dark:hover:bg-gray-700',
					]"
					:title="item.description">
					<component
						:is="item.icon"
						class="w-5 h-auto text-gray-500"
						aria-hidden="true" />
					<div class="flex flex-col">
						<span class="text-sm font-semibold font-poppins">
							{{ item.text }}
						</span>
						<span
							class="text-sm text-orange-700 dark:text-orange-200">
							{{ item.description ?? "" }}
						</span>
					</div>
				</ListboxOption>
			</ListboxOptions>
		</ScaleFadeSlide>
	</Listbox>
</template>
