<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader?: string;
	textSecondary?: string;
	grid?: {
		id: string;
		name: string;
		value: string;
	}[];
}>();
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-10 items-start">
		<div class="mx-auto max-w-7xl lg:mx-0">
			<h2
				data-placeholder="Title"
				class="text-4xl font-bold tracking-tight inline text-gray-900 sm:text-5xl">
				{{ textHeader }}
			</h2>
			<p
				data-placeholder="Secondary text here"
				class="mt-6 text-lg leading-8 text-gray-700">
				{{ textSecondary }}
			</p>
		</div>
		<div
			class="grid grid-cols-1 gap-x-4 gap-y-6 text-center lg:grid-cols-3 w-full">
			<div v-for="element of grid" :key="element.id">
				<div
					class="w-full flex flex-col gap-y-4 ring-2 rounded-lg shadow hover:ring-orange-400 ease-in-out duration-500 ring-gray-200 p-6">
					<div
						data-placeholder="Element name"
						class="text-base leading-7 text-gray-600">
						{{ element.name }}
					</div>
					<div
						data-placeholder="Element value"
						class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
						{{ element.value }}
					</div>
				</div>
			</div>
		</div>
	</PrimaryContainer>
</template>
