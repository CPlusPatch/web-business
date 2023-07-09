<script lang="ts">
import "./styles/index.css";
import "@unocss/reset/tailwind.css";
import { getSettings } from "./utils/utilities";

export const me = definePerson({
	name: "Gaspard Wierzbinski",
	image: "/images/avatars/with_background.webp",
	sameAs: [
		"https://codeberg.org/CPlusPatch",
		"mailto:contact@cpluspatch.com",
		"https://matrix.to/#/@jesse:cpluspatch.dev",
	],
	description:
		"Young aspiring software engineer, proficient in Web technologies and computers in general",
	url: "/",
});

export const myOrg = defineOrganization({
	name: "CPlusPatch Development",
	logo: "/public/images/icons/logo.svg",
});
</script>

<script setup lang="ts">
useSchemaOrg([me, myOrg]);

const settings = await getSettings();

useServerSeoMeta({
	titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} · ${settings?.siteName}` : settings?.siteName ?? "",
})
</script>

<template>
	<div>
		<SeoKit />
		<OgImageScreenshot />
		<OgImageStatic />
		<NuxtLayout>
			<NuxtLoadingIndicator />
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
