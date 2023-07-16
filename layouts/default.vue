<script setup lang="ts">
import { getSettings } from "~/utils/utilities";

const isOnline = useOnline();

const settings = await getSettings();
</script>

<template>
	<div class="bg-gray-50 font-inter bg-gradient-light">
		<Navbar :elements="settings.navbarItems" />
		<TransitionsScaleFadeSlide>
			<div
				v-if="!isOnline"
				class="fixed h-13 bottom-0 inset-x-0 bg-red z-7000 text-white font-semibold flex justify-center items-center gap-x-2">
				<Icon
					name="ic:round-signal-wifi-statusbar-connected-no-internet-4" />
				You are offline
			</div>
		</TransitionsScaleFadeSlide>
		<main class="relative overflow-hidden flex min-h-screen flex-col gap-7">
			<slot />
			<Footer :author-first-name="settings.authorFirstName" :author-last-name="settings.authorLastName" :footer-socials="settings.footerSocials" />
		</main>
	</div>
</template>
