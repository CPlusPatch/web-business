<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import PrimaryContainer from "../layout/PrimaryContainer.vue";
</script>

<template>
	<PrimaryContainer>
		<div class="relative">
			<h2
				class="text-3xl font-extrabold tracking-tight leading-8 text-center text-gray-900 font-poppins sm:text-4xl">
				Certifications
			</h2>
			<p
				class="mx-auto mt-4 max-w-3xl text-xl text-center text-gray-500 font-inter">
				List of official certifications / experience
			</p>
		</div>

		<div
			class="relative flex-row mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
			<div class="relative">
				<h3
					class="text-2xl font-extrabold tracking-tight text-gray-900 font-poppins sm:text-3xl">
					Astro Pi 2016-17
				</h3>
				<p class="mt-3 text-lg text-gray-500 font-inter">
					Winner of the 2016-2017 international Astro Pi challenge
					organized by the European Space Agency. The code written for
					this challenge was executed aboard the International Space
					Station.
				</p>
			</div>

			<div
				class="hidden relative -mx-4 mt-10 ml-auto lg:mt-0 lg:flex"
				aria-hidden="true">
				<nuxt-img
					format="webp"
					width="500"
					height="500"
					class="relative w-96 h-96 rounded-lg shadow-md hover:rotate-2 duration-200 hover:shadow-xl"
					src="/static/astropi.jpg"
					loading="lazy"
					alt="Photograph of an Astro Pi" />
			</div>
		</div>

		<div
			class="relative mt-12 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
			<div
				class="hidden relative -mx-4 mt-10 mr-auto lg:mt-0 lg:flex"
				aria-hidden="true">
				<nuxt-img
					format="webp"
					width="500"
					height="500"
					class="relative w-96 h-96 rounded-lg shadow-md hover:rotate-2 duration-200 hover:shadow-xl"
					src="/static/spaceshuttle.jpg"
					loading="lazy"
					alt="Photograph of a space shuttle" />
			</div>

			<div class="flex relative flex-col gap-y-3">
				<h3
					class="text-2xl font-extrabold tracking-tight text-gray-900 font-poppins sm:text-3xl">
					GAREF Aerospace Member
				</h3>
				<p class="text-lg text-gray-500 font-inter">
					Member of the GAREF Aerospace Agency for 2 years, official
					CNES partners and creators of the Horus/SERA missions.
				</p>
				<p class="text-lg text-gray-500 font-inter">
					GAREF Aerospace is a scientific club specifically intended
					for students to learn about the aerospace industry in the
					hands of field professionals.
				</p>
				<a
					class="text-lg text-blue-600 font-inter"
					href="https://garef.com"
					target="_blank"
					rel="noreferrer">
					Visit GAREF
				</a>
			</div>
		</div>
	</PrimaryContainer>
</template>
