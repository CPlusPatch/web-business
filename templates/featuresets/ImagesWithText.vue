<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader?: string;
	list?: {
		id: string;
		title: string;
		desc: string;
		image: string;
		link: string;
	}[];
}>();
</script>

<template>
	<PrimaryContainer>
		<h2
			data-placeholder="Title"
			class="text-center mt-1 text-4xl inline mx-auto font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
			{{ textHeader }}
		</h2>

		<div
			v-for="element of list"
			:key="element.id"
			class="relative flex-row flex max-w-6xl mx-auto mt-12 lg:mt-24 gap-8 lg:items-center">
			<div
				class="flex-row flex odd:flex-row-reverse justify-between lg:items-center gap-8 grow">
				<div class="relative flex flex-col gap-y-4 md:w-2/3">
					<h3
						data-placeholder="Title"
						class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						{{ element.title }}
					</h3>

					<p
						data-placeholder="Description element"
						class="mt-3 text-lg text-gray-500 font-inter">
						{{ element.desc }}
					</p>

					<a
						v-if="element.link"
						class="text-lg text-blue-600 font-inter"
						:href="element.link.split('|')[1]"
						target="_blank"
						data-placeholder="Link text"
						rel="noreferrer">
						{{ element.link.split("|")[0] }}
						<Icon
							name="tabler:external-link"
							class="inline mb-1 w-5 h-5" />
					</a>
				</div>

				<div
					class="hidden relative -mx-4 mt-10 lg:mt-0 lg:flex"
					aria-hidden="true">
					<nuxt-img
						class="relative h-72 w-72 rounded-lg shadow-md hover:rotate-2 duration-200 hover:shadow-xl"
						:src="
							element.image === ''
								? 'https://placehold.co/400'
								: element.image
						"
						loading="lazy"
						alt="Photograph of an Astro Pi" />
				</div>
			</div>
		</div>
	</PrimaryContainer>
</template>

<style scoped>
.block-list-2-move {
	transition: transform 0.2s ease-in-out;
}
</style>
