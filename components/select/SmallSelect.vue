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
	icon: string;
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

const props = defineProps<SelectProps>();
const emit = defineEmits(["update:model-value"]);

const selected = ref<SelectItem>(props.items[props.defaultValue]);
</script>

<template>
	<HeadlessListbox
		v-model="selected"
		:name="name"
		as="div"
		class="relative"
		@update:model-value="value => emit('update:model-value', value)">
		<HeadlessListboxButton
			class="flex relative flex-row gap-x-1 items-center p-2 text-gray-600 rounded duration-200 cursor-default dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700">
			<Icon
				:name="selected.icon"
				:stroke-width="2"
				class="w-6 h-6"
				aria-hidden="true" />
		</HeadlessListboxButton>
		<Transition
			appear
			enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			enter-to-class="opacity-100 translate-y-0 sm:scale-100"
			enter-active-class="ease-out duration-100"
			leave-active-class="ease-in duration-100"
			leave-from-class="opacity-100 translate-y-0 sm:scale-100"
			leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
			<HeadlessListboxOptions
				:class="[
					'absolute z-30 shadow-lg mt-1 text-base rounded-md overflow-hidden bg-gray-100/75 dark:bg-dark-800/75 backdrop-blur-md',
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
					:class="[
						item.value === selected.value &&
							'bg-orange-100 dark:bg-orange-500/10',
						'flex relative flex-row gap-x-3 items-center py-2 px-3 text-gray-800 dark:text-gray-100 duration-200 cursor-default select-none hover:bg-gray-200 dark:hover:bg-dark-700/75',
					]">
					<Icon
						:name="item.icon"
						class="w-5 h-auto text-gray-500"
						aria-hidden="true" />
					<div class="flex flex-col">
						<span class="text-sm font-semibold font-poppins">
							{{ item.text }}
						</span>
						<span
							v-if="item.description"
							class="text-sm min-w-40 text-orange-700 dark:text-orange-200">
							{{ item.description ?? "" }}
						</span>
					</div>
				</HeadlessListboxOption>
			</HeadlessListboxOptions>
		</Transition>
	</HeadlessListbox>
</template>
