<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader: string;
	list: {
		title: string;
		desc: string;
		image: string;
		link: {
			text: string;
			href: string;
		};
	}[];
}>();

const emit = defineEmits(["editField"]);
</script>

<template>
	<PrimaryContainer>
		<h2
			class="text-center mt-1 text-4xl inline mx-auto font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
			data-placeholder="Header"
			:contenteditable="editable"
			@focusout="
				emit(
					'editField',
					($event.target as HTMLSpanElement).innerText,
					'text-header'
				)
			">
			{{ textHeader }}
		</h2>

		<div
			v-for="cert of list"
			:key="cert.title"
			class="relative flex-row flex justify-between odd:flex-row-reverse max-w-6xl mx-auto gap-6 mt-12 lg:mt-24 gap-8 lg:items-center">
			<div class="relative flex flex-col gap-y-4 md:w-2/3">
				<h3
					class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
					{{ cert.title }}
				</h3>

				<p
					v-for="d of cert.desc"
					:key="d"
					class="mt-3 text-lg text-gray-500 font-inter">
					{{ d }}
				</p>

				<a
					v-if="cert.link"
					class="text-lg text-blue-600 font-inter"
					:href="cert.link.href"
					target="_blank"
					rel="noreferrer">
					{{ cert.link.text }}
					<IconExternalLink class="inline mb-1 w-5 h-5" />
				</a>
			</div>

			<div
				class="hidden relative -mx-4 mt-10 lg:mt-0 lg:flex"
				aria-hidden="true">
				<nuxt-img
					width="500"
					height="500"
					class="relative h-72 w-72 rounded-lg shadow-md hover:rotate-2 duration-200 hover:shadow-xl"
					:src="cert.image"
					loading="lazy"
					alt="Photograph of an Astro Pi" />
			</div>
		</div>
	</PrimaryContainer>
</template>
