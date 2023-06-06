<script setup lang="ts">
import Skills from "~~/components/landing/Skills.vue";
import OpenSourceWorkflow from "~~/components/landing/OpenSourceWorkflow.vue";
import LighthouseScores from "~~/components/landing/LighthouseScores.vue";
import Certs from "~~/components/landing/Certs.vue";
import Testimonials from "~~/components/landing/Testimonials.vue";
import Faqs from "~~/components/landing/Faqs.vue";
import { Block } from "~/db/entities/Block";
import BlockRenderer from "~/components/BlockRenderer.vue";

useServerSeoMeta({
	title: "CPlusPatch",
	ogTitle: "Website for CPlusPatch, aka Gaspard Wierzbinski",
	description: "My blog, about me and how you can contact me!",
	ogDescription: "My blog, about me and how you can contact me!",
	ogImage: "/static/servers.webp",
	twitterCard: "summary_large_image",
	author: "Gaspard Wierzbinski",
});

const token = useCookie("token");

const data = (await useFetch("/api/blocks/1")).data as Ref<Block[] | null>;

if (!data.value) {
	throw createError("No blocks returned!");
}
const isAdmin = (await useFetch("/api/user/admin")).data.value;

const saveBlock = (newBlock: Block, index: number) => {
	if (!data.value) return false;
	data.value[index] = newBlock;

	fetch(`/api/blocks/${newBlock.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify(newBlock),
	})
		.then(data => {
			switch (data.status) {
				case 201:
				case 200: {
					break;
				}
			}
		})
		.catch(err => {
			console.error(err);
		});
};

const moveBlockUp = (index: number) => {
	if (!data.value) return false;
	if (index === 0) return false;

	const temp = data.value[index];
	data.value[index] = data.value[index - 1];
	data.value[index].index = index; // Update index of the current block

	data.value[index - 1] = temp;
	data.value[index - 1].index = index - 1; // Update index of the previous block

	saveBlock(data.value[index - 1], index - 1);
};

const moveBlockDown = (index: number) => {
	if (!data.value) return false;
	if (index === data.value.length - 1) return false;

	const temp = data.value[index];
	data.value[index] = data.value[index + 1];
	data.value[index].index = index; // Update index of the current block

	data.value[index + 1] = temp;
	data.value[index + 1].index = index + 1; // Update index of the next block

	saveBlock(data.value[index], index + 1);
};

const addNewBlock = async (index: number) => {
	if (!data.value) return false;

	const block = await useFetch(`/api/blocks/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			category: "headers",
			component: "BigText",
			index: index + 1,
		}),
	});

	if (!block.data.value) return;

	data.value = data.value.map(d =>
		d.index >= index
			? {
					...d,
					index: d.index + 1,
			  }
			: d
	);

	data.value = [
		// part of the array before the specified index
		...data.value.slice(0, index),
		// inserted item
		block.data.value as unknown as Block,
		// part of the array after the specified index
		...data.value.slice(index),
	];
};

const deleteBlock = async (index: number) => {
	if (!data.value) return false;

	const block = await useFetch(`/api/blocks/${data.value[index].id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
	});

	if (!block.data.value) return;

	data.value = [
		...data.value.slice(0, index),
		...data.value.slice(index + 1),
	];
};
</script>

<template>
	<!-- SVG dots -->
	<div class="absolute inset-y-0 w-full h-96 -z-20" aria-hidden="true">
		<div class="relative h-auto">
			<svg
				class="hidden absolute right-full transform translate-x-1/4 translate-y-1/3 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full md:block"
				width="404"
				height="584"
				fill="none"
				viewBox="0 0 404 184">
				<defs>
					<pattern
						id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
						x="0"
						y="0"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse">
						<rect
							x="0"
							y="0"
							width="4"
							height="4"
							class="text-gray-200"
							fill="currentColor" />
					</pattern>
				</defs>
				<rect
					width="404"
					height="284"
					fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)" />
			</svg>
			<svg
				class="absolute left-full transform -translate-x-1/4 -translate-y-3/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
				width="404"
				height="784"
				fill="none"
				viewBox="0 0 404 784">
				<defs>
					<pattern
						id="d2a68204-c383-44b1-b99f-42ccff4e5365"
						x="0"
						y="0"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse">
						<rect
							x="0"
							y="0"
							width="4"
							height="4"
							class="text-gray-200"
							fill="currentColor" />
					</pattern>
				</defs>
				<rect
					width="404"
					height="784"
					fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)" />
			</svg>
		</div>
	</div>

	<BlockRenderer
		v-for="(block, index) in data"
		:key="block.index"
		:block="block"
		:edit="isAdmin ?? false"
		:is-last="index === (data?.length ?? 0) - 1"
		:is-first="index === 0"
		@move-block-down="moveBlockDown(index)"
		@move-block-up="moveBlockUp(index)"
		@delete-block="deleteBlock(index)"
		@add-new-block="addNewBlock(index)"
		@update-block="(newBlock: Block) => saveBlock(newBlock, index)" />

	<Skills v-once />

	<OpenSourceWorkflow v-once />

	<LighthouseScores v-once />

	<Certs v-once />

	<Testimonials />

	<Faqs />
</template>
