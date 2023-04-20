<script lang="ts">
import "./styles/index.css";
import "reflect-metadata";

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
</script>

<template>
	<SeoKit />
	<OgImageScreenshot />
	<OgImageStatic />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
