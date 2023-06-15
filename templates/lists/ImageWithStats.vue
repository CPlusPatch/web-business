<script setup lang="ts">
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader?: string;
	image?: string;
	items?: {
		id: string;
		title: string;
		value: string;
	}[];
	reversed?: boolean;
}>();
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-20 mt-20">
		<div
			:class="[
				'items-center lg:flex lg:gap-x-10 lg:px-5',
				reversed ? 'flex-row-reverse' : 'flex-row',
			]">
			<div
				class="px-4 sm:px-6 lg:py-16 lg:mx-0 lg:px-0 grow flex flex flex-col gap-y-4">
				<h2
					data-placeholder="Empty title"
					class="text-3xl font-extrabold tracking-tight text-gray-900 font-inter">
					{{ textHeader }}
				</h2>
				<div
					class="text-gray-900 divide-y divide-gray-200 font-inter dark:text-white dark:divide-gray-700 w-full">
					<div
						v-for="item of items"
						:key="item.id"
						class="flex flex-row justify-between">
						<div class="flex flex-col py-3">
							<div
								data-placeholder="Empty title"
								class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								{{ item.title }}
							</div>
							<div
								data-placeholder="Empty value"
								class="text-lg font-semibold">
								{{ item.value }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="hidden justify-center items-center mt-0 md:flex grow h-[35rem]">
				<img
					class="h-full w-auto rounded"
					:src="image === '' ? 'https://placehold.co/600' : image"
					format="webp"
					alt="Laptop"
					width="416"
					height="671"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
			</div>
		</div>
	</PrimaryContainer>
</template>
