<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader: string;
	textSecondary: string;
	grid: {
		id: string;
		name: string;
		value: string;
	}[];
}>();

const emit = defineEmits(["editField"]);
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-10 items-start">
		<div class="mx-auto max-w-7xl lg:mx-0">
			<h2
				:contenteditable="editable"
				data-placeholder="Header text here"
				class="text-4xl font-bold tracking-tight inline text-gray-900 sm:text-5xl"
				@focusout="
					emit(
						'editField',
						($event.target as HTMLHeadingElement).innerText,
						'text-header'
					)
				">
				{{ textHeader }}
			</h2>
			<p
				:contenteditable="editable"
				data-placeholder="Header text here"
				class="mt-6 text-lg leading-8 text-gray-700"
				@focusout="
					emit(
						'editField',
						($event.target as HTMLParagraphElement).innerText,
						'text-secondary'
					)
				">
				{{ textSecondary }}
			</p>
		</div>
		<dl
			class="grid grid-cols-1 gap-x-4 gap-y-6 text-center lg:grid-cols-3 w-full">
			<div
				v-for="stat in grid"
				:key="stat.id"
				class="w-full flex flex-col gap-y-4 ring-2 rounded-lg shadow hover:ring-orange-400 ease-in-out duration-500 ring-gray-200 p-6">
				<dt class="text-base leading-7 text-gray-600">
					{{ stat.name }}
				</dt>
				<dd
					class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
					{{ stat.value }}
				</dd>
			</div>
		</dl>
	</PrimaryContainer>
</template>
