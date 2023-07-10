<script setup lang="ts">
import SmallLogo from "./SmallLogo.vue";
import { getSettings } from "~/utils/utilities";

const settings = await getSettings();
</script>

<template>
	<span
		className="flex gap-2 items-end leading-none text-2xl font-semibold font-poppins h-8 duration-150 ease-in-out hover:scale-[102%] active:scale-95">
		<SmallLogo />
		{{ settings.brandName ?? "Brand Name" }}
	</span>
</template>
