<script setup lang="ts">
const isOnline = useOnline();
</script>

<template>
	<div class="bg-gray-50 font-inter bg-gradient-light">
		<Navbar />
		<TransitionsScaleFadeSlide>
			<div
				v-if="!isOnline"
				class="fixed h-13 bottom-0 inset-x-0 bg-red z-7000 text-white font-semibold flex justify-center items-center gap-x-2">
				<Icon
					name="ic:round-signal-wifi-statusbar-connected-no-internet-4" />
				You are offline
			</div>
		</TransitionsScaleFadeSlide>
		<main class="relative overflow-hidden flex min-h-screen flex-col">
			<slot />
			<Footer />
		</main>
	</div>
</template>
