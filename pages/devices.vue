<template>
	<PrimaryContainer class="flex flex-col gap-y-10">
		<h2 class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl">Devices</h2>
		<div class="items-center lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-x-24 lg:px-5">
			<div class="px-4 mx-auto sm:px-6 lg:py-16 lg:mx-0 lg:px-0">
				<div class="flex flex-col gap-y-4">
					<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 font-inter">
						OnePlus 7
					</h2>
					<dl
						class="max-w-md text-gray-900 divide-y divide-gray-200 font-inter dark:text-white dark:divide-gray-700">

						<div v-for="item of onePlusList" :key="item.title" class="flex flex-col py-3">
							<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								{{ item.title }}
							</dt>
							<dd class="text-lg font-semibold">{{ item.value }}</dd>
						</div>
					</dl>
				</div>
			</div>
			<div class="hidden flex-col justify-center items-center mt-0 md:flex">
				<div class="w-auto h-[30rem] rounded-3xl shadow-2xl rotate-12">
					<img class="w-full h-full" src="/static/devices/oneplus_mockup.png" format="webp" alt="OnePlus 7"
						width="416" height="671" preload sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</div>
			</div>
		</div>

		<div class="items-center lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-x-24 lg:px-5">
			<div class="hidden flex-col justify-center items-center mt-0 md:flex">
				<div class="w-auto rounded-3xl">
					<img class="w-full h-full" src="/static/devices/laptop-mockup.png" format="webp" alt="Laptop"
						width="416" height="671" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</div>
			</div>
			<div class="px-4 mx-auto sm:px-6 lg:py-16 lg:mx-0 lg:px-0">
				<div class="flex flex-col gap-y-4">
					<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 font-inter">
						Gateway GWTNT141-10BL
					</h2>
					<dl
						class="max-w-md text-gray-900 divide-y divide-gray-200 font-inter dark:text-white dark:divide-gray-700">

						<div v-for="item of gatewayList" :key="item.title" class="flex flex-col py-3">
							<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								{{ item.title }}
							</dt>
							<dd class="text-lg font-semibold">{{ item.value }}</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>

		<div class="items-center lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-x-24 lg:px-5">
			<div class="px-4 mx-auto sm:px-6 lg:py-16 lg:mx-0 lg:px-0">
				<div class="flex flex-col gap-y-4">
					<h2 class="text-3xl font-extrabold tracking-tight text-gray-900 font-inter">
						C H U N K Y
					</h2>
					<dl
						class="max-w-md text-gray-900 divide-y divide-gray-200 font-inter dark:text-white dark:divide-gray-700">

						<div v-for="item of chunkyList" :key="item.title" class="flex flex-col py-3">
							<dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
								{{ item.title }}
							</dt>
							<dd class="text-lg font-semibold">{{ item.value }}</dd>
						</div>
					</dl>
				</div>
			</div>
			<div class="hidden flex-col justify-center items-center mt-0 md:flex">
				<div class="w-auto h-[35rem] rounded-3xl">
					<img class="w-full h-full" src="/static/devices/asus.png" alt="Asus Motherboard" width="416"
						height="671" preload sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</div>
			</div>
		</div>
	</PrimaryContainer>
</template>

<script setup lang="ts">
import PrimaryContainer from '~~/components/layout/PrimaryContainer.vue';

const onePlusList = [
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
];

const gatewayList = [
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
	}
];

const chunkyList = [
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
];
</script>