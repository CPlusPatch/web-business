<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	list?: {
		id: string;
		name: string;
		profession: string;
		avatar: string;
		text: string;
	}[];
}>();
</script>

<template>
	<PrimaryContainer class="!max-w-[90rem]">
		<div class="lg:m-0 gap-6 duration-200 grid lg:grid-cols-2 grid-cols-1">
			<div
				v-for="element of list"
				:key="element.id"
				class="h-full flex flex-col justify-between">
				<div
					class="flex overflow-hidden h-full lg:flex-row flex-col rounded shadow ring-2 ring-gray-200 duration-200 hover:shadow-xl hover:ring-orange-500">
					<div class="p-3 lg:w-40 w-full overflow-hidden shrink-0">
						<img
							:contenteditable="editable"
							alt=""
							:src="
								element.avatar === ''
									? 'https://placehold.co/400'
									: element.avatar
							"
							class="w-full rounded h-full object-cover shadow" />
					</div>
					<div class="flex grow flex-col p-3 gap-3 justify-between">
						<p
							data-placeholder="Element text"
							class="text-gray-700">
							{{ element.text }}
						</p>
						<div>
							<h3
								data-placeholder="Name for the card"
								class="text-black font-semibold text-lg">
								{{ element.name }}
							</h3>
							<h3
								data-placeholder="Colored subtitle"
								class="text-transparent bg-clip-text bg-gradient-to-tl from-fuchsia-500 via-red-600 !to-orange-400">
								{{ element.profession }}
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	</PrimaryContainer>
</template>
