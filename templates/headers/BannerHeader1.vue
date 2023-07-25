<script setup lang="ts">
defineProps<{
	textHeader?: string;
	imageMain?: string;
}>();
</script>

<template>
	<div class="w-full h-screen md:h-[70vh] relative -mt-40">
			<div
				class="bg-cover w-full h-full bg-fixed bg-center"
				:style="{
					backgroundImage: `url(${imageMain})`,
				}"></div>
			<!-- Floor fade overlay that-->
			<div
				class="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)]"></div>
			<div
				class="absolute max-w-5xl inset-0 mx-auto flex items-center justify-center">
				<h1
					data-placeholder="Example Title Text"
					class="mb-4 rounded p-2 text-3xl inline font-extrabold text-center text-white md:text-5xl">
					{{ textHeader }}
				</h1>
			</div>
		</div>
</template>
