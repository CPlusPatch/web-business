<script setup lang="ts">
import { IconLockOff, IconServer, IconShield } from "@tabler/icons-vue";
import PrimaryContainer from "../layout/PrimaryContainer.vue";

const features = [
	{
		name: "Security first",
		description:
			"I use a secure encrypted Linux computer and key-based authentication for maximum security.",
		icon: IconShield,
	},
	{
		name: "Good Licensing",
		description:
			"Almost all of my personal work is licensed under GPLv3 or a license that gives freedom to the user",
		icon: IconLockOff,
	},
	{
		name: "Built to be changed",
		description:
			"I try to make my apps and systems as modular and extensible as possible, as well as polyvalent and infrastructure-agnostic",
		icon: IconServer,
	},
];
</script>

<template>
	<PrimaryContainer class="flex flex-row items-center">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
			<div class="lg:pr-8">
				<div class="lg:max-w-lg">
					<p
						class="mt-2 text-4xl font-bold text-gray-900 sm:text-6xl">
						Better, secure programming
					</p>
					<p class="mt-6 text-lg leading-8 text-gray-600">
						I always try to be at the cutting edge of technology
						while maintaining excellent security on all my systems.
						I use FOSS software for quality and efficiency, to
						develop systems.
					</p>
					<dl
						class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
						<div
							v-for="feature in features"
							:key="feature.name"
							class="relative pl-9">
							<dt class="inline font-semibold text-gray-900">
								<component
									:is="feature.icon"
									class="absolute left-1 top-1 h-5 w-5 text-orange-600"
									aria-hidden="true" />
								{{ feature.name }}
							</dt>
							{{ " " }}
							<dd class="inline">{{ feature.description }}</dd>
						</div>
					</dl>
				</div>
			</div>
			<nuxt-img
				alt="Product screenshot"
				src="/static/photo-motherboard-square.webp"
				class="w-[48rem] max-w-none rounded-xl hidden md:block duration-500 shadow-xl ring-1 ring-gray-400/10 sm:w-[40rem] md:-ml-4 lg:-ml-0" />
		</div>

		<!-- <div class="flex relative z-20 flex-col gap-y-4 sm:w-2/3 lg:w-2/5">
			<h2
				class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl">
				Open-source workflow
			</h2>

			<p class="text-xl text-gray-500 font-inter">
				I use open-source and libre sofware as part of my development
				workflow. This includes:
			</p>

			<ul
				class="space-y-1 max-w-md list-disc list-inside font-inter font-semibold">
				<li>VSCodium</li>
				<li>Ubuntu LTS-based Linux/Arch</li>
				<li>LibreWolf Browser</li>
				<li>Codeberg.org</li>
				<li>GPLv3 license</li>
			</ul>
		</div>
		<div
			class="hidden relative grid-cols-3 grid-rows-2 gap-3 ml-auto sm:w-1/3 lg:w-1/2 sm:grid">
			<nuxt-img
				v-for="app of software"
				:key="app.name"
				:src="app.img"
				class="p-2 w-full rounded-md md:max-w-xl hover:rotate-3 duration-200"
				width="150"
				alt=""
				height="150" />
		</div> -->
	</PrimaryContainer>
</template>
