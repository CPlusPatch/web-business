<template>
	<PrimaryContainer>
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4">
				<h2
					class="mb-3 text-3xl font-black inline mr-2 text-gray-800 font-poppins sm:text-5xl">
					{{ textHeader }}
				</h2>
				<p class="text-xl text-gray-500 dark:text-gray-300 font-inter">
					{{ textSecondary }}
				</p>
			</div>
		</div>
		<div
			class="grid grid-cols-1 gap-5 mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 font-inter">
			<div v-for="element of grid" :key="element.id">
				<div
					class="flex overflow-hidden col-span-1 divide-x divide-gray-300 ring-gray-300 rounded shadow ring-1 duration-200 hover:scale-[102%] no-bad-scale hover:shadow-2xl hover:ring-2 hover:ring-orange-500">
					<Icon
						:name="
							element.image !== ''
								? element.image
								: 'ic:round-image'
						"
						loading="lazy"
						:class="[
							'object-contain rounded-sm duration-150 aspect-1 flex flex-shrink-0 sm:w-24 h-20 sm:h-24 w-20',
							element.padding ? 'p-2' : '',
						]"
						alt="" />

					<div
						class="flex relative flex-col flex-1 justify-between items-start truncate bg-white">
						<div class="flex-1 px-4 py-2 text-sm truncate">
							<h3 class="text-lg font-bold text-gray-900">
								{{ element.name }}
							</h3>
							<p class="text-gray-500">
								{{ element.experience }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</PrimaryContainer>
</template>

<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader?: string;
	textSecondary?: string;
	grid?: {
		id: string;
		name: string;
		type: string;
		experience: string;
		image: string;
		padding: boolean;
	}[];
}>();
</script>
