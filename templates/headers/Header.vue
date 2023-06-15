<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	textHeader?: string;
	size: number;
	align: "left" | "right" | "center";
	editable: boolean;
}>();
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-20 mt-20">
		<h2
			data-placeholder="Example header"
			class="mb-3 text-3xl font-black text-gray-800 font-poppins sm:text-5xl text-center">
			{{ textHeader }}
		</h2>
	</PrimaryContainer>
</template>
