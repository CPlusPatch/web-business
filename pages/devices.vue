<template>
	<PrimaryContainer class="flex flex-col gap-y-20">
		<h2 class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl text-center">Devices</h2>
		<div v-for="list of lists" :key="list.name" class="items-center lg:flex lg:flex-row lg:gap-x-24 lg:px-5 even:flex-row-reverse group">
			<div class="px-4 mx-auto sm:px-6 lg:py-16 lg:mx-0 lg:px-0 w-1/3 group-odd:text-right group-oddn:justify-end flex">
				<div class="flex flex-col gap-y-4">
					<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 font-inter">
						{{ list.name }}
					</h2>
					<dl
						class="max-w-md text-gray-900 divide-y divide-gray-200 font-inter dark:text-white dark:divide-gray-700">

						<div v-for="item of list.items" :key="item.title" class="flex flex-col py-3">
							<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								{{ item.title }}
							</dt>
							<dd class="text-lg font-semibold">{{ item.value }}</dd>
						</div>
					</dl>
				</div>
			</div>

			<div class="hidden justify-center items-center mt-0 md:flex w-2/3 h-[35rem]">
				<img class="h-full w-auto" :src="list.image" format="webp" alt="Laptop"
						width="416" height="671" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
			</div>
		</div>
	</PrimaryContainer>
</template>

<script setup lang="ts">
import PrimaryContainer from '~~/components/layout/PrimaryContainer.vue';

const lists = [
	{
		name: "OnePlus 7",
		image: "/static/devices/oneplus_mockup.webp",
		items: [
			{
				title: "Operating System",
				value: "LineageOS 20 (Android 13)",
			},
			{
				title: "Play Services Backend",
				value: "microG",
			},
			{
				title: "App Store",
				value: "F-Droid",
			},
			{
				title: "Root Provider",
				value: "Magisk",
			},
		]
	},
	{
		name: "Hacktop",
		image: "/static/devices/laptop.webp",
		items: [
			{
				title: "Operating System",
				value: "Arch Linux",
			},
			{
				title: "Specs",
				value: "16 GB RAM, 4x i5 @ 2.2 GHz, 512 GB SSD",
			},
			{
				title: "Preferred Package Format",
				value: "Pacman",
			},
			{
				title: "Notes",
				value: "Used for development and debugging on the go"
			}
		]
	},
	{
		name: "C H U N K Y",
		image: "/static/devices/asus.webp",
		items: [
			{
				title: "Operating System",
				value: "Arch Linux",
			},
			{
				title: "RAM",
				value: "32 GB DDR4 RAM",
			},
			{
				title: "CPU",
				value: "8x i7-6700K @ 4.20 GHz",
			},
			{
				title: "GPU",
				value: "GTX 1070 8 GB VRAM",
			},
			{
				title: "Storage",
				value: "240 GB SSD, 512 GB SSD, 2x 2 TB HDD",
			},
		]
	}
];
</script>