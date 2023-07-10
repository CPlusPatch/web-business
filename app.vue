<script lang="ts">
import "./styles/index.css";
import "@unocss/reset/tailwind.css";
import { getSettings } from "./utils/utilities";
</script>

<script setup lang="ts">
const settings = await getSettings();

const me = definePerson({
	name: `${settings.authorFirstName ?? "John"} ${settings.authorLastName ?? "Doe"}`,
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

const myOrg = defineOrganization({
	name: "CPlusPatch Development",
	logo: "/public/images/icons/logo.svg",
});

useSchemaOrg([me, myOrg]);

useServerSeoMeta({
	titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} · ${settings?.siteName}` : settings?.siteName ?? "",
	author: me.name
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
