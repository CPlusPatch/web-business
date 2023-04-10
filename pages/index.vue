<script setup lang="ts">
import Skills from "~~/components/landing/Skills.vue";
import OpenSourceWorkflow from "~~/components/landing/OpenSourceWorkflow.vue";
import LighthouseScores from "~~/components/landing/LighthouseScores.vue";
import Certs from "~~/components/landing/Certs.vue";
import Testimonials from "~~/components/landing/Testimonials.vue";
import Faqs from "~~/components/landing/Faqs.vue";
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
							fill="currentColor"></rect>
					</pattern>
				</defs>
				<rect
					width="404"
					height="284"
					fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"></rect></svg
			><svg
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
							fill="currentColor"></rect>
					</pattern>
				</defs>
				<rect
					width="404"
					height="784"
					fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"></rect>
			</svg>
		</div>
	</div>

	<!-- Big landing title -->
	<div class="relative pb-16 sm:pb-24">
		<div class="px-4 mx-auto mt-16 max-w-7xl ssm:mt-12 sm:px-6 font-inter">
			<div class="text-left">
				<h1
					class="text-4xl font-black text-gray-900 dark:text-gray-300 sm:text-5xl md:text-6xl">
					<span class="block">Hey,</span>
					<span
						class="block pb-2 text-transparent bg-clip-text bg-gradient-to-tl from-fuchsia-500 via-red-600 to-orange-400">
						I&apos;m

						<Typewriter
							class="inline"
							:text-array="[
								'CPlusPatch',
								'a developer',
								'a Linux user',
								'a FOSS supporter',
							]"
							:speed="100"
							:wait="1500" />
					</span>
				</h1>
			</div>
		</div>
	</div>

	<!-- Main hero -->
	<div class="relative" v-memo>
		<div class="flex absolute inset-0 flex-col" aria-hidden="true">
			<div class="flex-1" />
			<div
				class="flex-1 w-full bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-indigo-500" />
		</div>
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
		<div class="py-4 sm:py-12"></div>
	</div>

	<Skills v-once />

	<OpenSourceWorkflow v-once />

	<LighthouseScores v-once />

	<Certs v-once />

	<Testimonials />

	<Faqs />
</template>
