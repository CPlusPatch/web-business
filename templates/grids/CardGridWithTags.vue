<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	textHeader: string;
	grid: {
		name: string;
		href: string;
		description: string;
		tags: {
			name: string;
			color: string;
			textColor: string;
		}[];
	}[];
	editable: boolean;
}>();
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-10 mt-20">
		<h1
			data-placeholder="Header"
			class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl">
			{{ textHeader }}
		</h1>
		<div>
			<h2
				class="text-xs font-medium tracking-wide text-gray-500 uppercase">
				Pinned
			</h2>
			<ul
				role="list"
				class="grid grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<li
					v-for="project of grid"
					:key="project.name"
					class="flex rounded-md shadow-sm font-inter duration-200 ease-in-out hover:shadow-xl hover:ring-2 ring-orange-400">
					<a
						:href="project.href"
						class="flex flex-col w-full justify-between items-start p-3 max-w-full bg-white rounded-md border border-gray-200">
						<h3
							data-placeholder="Card Name"
							class="pb-4 text-lg font-bold text-gray-900 hover:text-gray-600">
							{{ project.name }}
						</h3>
						<p
							data-placeholder="Description of the card"
							class="text-gray-500 mb-auto">
							{{ project.description }}
						</p>
						<div
							class="flex flex-wrap flex-row gap-2 mt-3 max-w-full no-scroll">
							<span
								v-for="tag of project.tags"
								:key="tag.name"
								:class="`${tag.color} inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tag.textColor}`">
								{{ tag.name }}
							</span>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</PrimaryContainer>
</template>
