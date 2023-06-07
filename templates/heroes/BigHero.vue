<script setup lang="ts">
defineProps<{
	imageMain?: string;
	editable: boolean;
}>();

// const emit = defineEmits(["editField"]);
</script>

<template>
	<!-- Main hero -->
	<div class="relative">
		<div class="relative px-4 mx-auto max-w-7xl w-full sm:px-6">
			<nuxt-img
				preload
				:width="1920"
				:height="1080"
				sizes="lg:1920px md:700px sm:400px"
				class="rounded-lg aspect-video shadow-lg w-full duration-150"
				:src="imageMain ?? '/'"
				alt="VSCode screenshot" />
		</div>
		<div class="py-4 sm:py-12" />
	</div>
</template>
