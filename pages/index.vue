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

const data = (await useFetch("/api/blocks/1")).data.value as Block[] | null;

if (!data) {
	throw createError("No blocks returned!");
}
const isAdmin = (await useFetch("/api/user/admin")).data.value;

const saveBlock = (newBlock: Block, index: number) => {
	data[index] = newBlock;

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
		:key="index"
		:block="block"
		:edit="isAdmin ?? false"
		:update-block="(newBlock: Block) => saveBlock(newBlock, index)" />

	<!-- Main hero -->
	<div class="relative">
		<div class="relative px-4 mx-auto max-w-7xl w-full sm:px-6">
			<nuxt-img
				preload
				:width="1920"
				:height="1080"
				sizes="lg:1920px md:700px sm:400px"
				class="rounded-lg aspect-video shadow-lg w-full duration-150"
				src="/static/banner.webp"
				alt="VSCode screenshot" />
		</div>
		<div class="py-4 sm:py-12" />
	</div>

	<Skills v-once />

	<OpenSourceWorkflow v-once />

	<LighthouseScores v-once />

	<Certs v-once />

	<Testimonials />

	<Faqs />
</template>
