<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";
import PrimaryContainer from "../layout/PrimaryContainer.vue";

const certs = [
	{
		title: "Astro Pi 2016-17",
		desc: [
			"Winner of the 2016-2017 international Astro Pi challenge organized by the European Space Agency.The code written for this challenge was executed aboard the International Space Station.",
		],
		image: "/static/astropi.webp",
		link: {
			text: "Contest Results",
			href: "https://www.esa.int/Education/AstroPI/2016_17_European_Astro_Pi_Challenge_Winners",
		},
	},
	{
		title: "GAREF Aerospace Member",
		desc: [
			"Member of the GAREF Aerospace Agency for 2 years, official CNES partners and creators of the Horus / SERA missions.",
			"GAREF Aerospace is a scientific club specifically intended for students to learn about the aerospace industry in the hands of field professionals.",
		],
		image: "/static/spaceshuttle.webp",
		link: {
			text: "Visit GAREF",
			href: "https://garef.com",
		},
	},
	{
		title: "2023 Coding Challenge Winner",
		desc: [
			"Winner of a national programming challenge in the entirety of French Polynesia, where I was personally commended by the examinators for my work and beating several previously established speed records.",
		],
		image: "https://cdn-web.cpluspatch.com/macbook-colored.webp",
		link: {
			text: "Contest results (Python section)",
			href: "https://maths.pf/non-classe/resultats-du-defi-codage-et-robotique-2023/",
		},
	},
];
</script>

<template>
	<PrimaryContainer>
		<p
			class="text-center mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
			Achievements
		</p>

		<div
			v-for="cert of certs"
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
