<script setup lang="ts">
import PrimaryContainer from "../layout/PrimaryContainer.vue";

const stats = ref([
	{ id: 1, name: "Transferred data on this website", value: "394 kB" },
	{ id: 2, name: "Percentile in site performance", value: "98th" },
	{ id: 3, name: "Google Lighthouse score", value: "100.00" },
]);
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-10 items-start">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2
				class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Fast, powerful websites
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-700">
				My websites and web applications are fast, responsive,
				well-designed and great with SEO. I am able to leverage the very
				latest in web technologies such as WASM, PWAs, JS Frameworks and
				more to create a great website.
			</p>
		</div>
		<dl
			class="grid grid-cols-1 gap-x-4 gap-y-6 text-center lg:grid-cols-3 w-full">
			<div
				v-for="stat in stats"
				:key="stat.id"
				class="w-full flex flex-col gap-y-4 ring-2 rounded-lg shadow hover:ring-orange-400 ease-in-out duration-500 ring-gray-200 p-6">
				<dt class="text-base leading-7 text-gray-600">
					{{ stat.name }}
				</dt>
				<dd
					class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
					{{ stat.value }}
				</dd>
			</div>
		</dl>
	</PrimaryContainer>
</template>
