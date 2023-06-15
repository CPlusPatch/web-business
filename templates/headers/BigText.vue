<script lang="ts">
// import Typewriter from "~/components/typewriter/Typewriter.vue";
</script>

<script setup lang="ts">
defineProps<{
	textPrimary?: string;
	textTypewriter?: string;
	editable: boolean;
}>();
</script>

<template>
	<!-- Big landing title -->
	<div class="relative">
		<div class="px-4 mx-auto max-w-7xl sm:px-6 font-inter">
			<div class="text-left">
				<h1
					class="text-4xl font-black text-gray-900 dark:text-gray-300 sm:text-5xl md:text-6xl flex flex-col">
					<span class="inline mr-auto">{{ textPrimary }}</span>
					<span
						class="py-2 text-transparent mr-auto bg-clip-text bg-gradient-to-tr from-pink-500 !to-yellow-500 via-red-500">
						{{ textTypewriter }}
					</span>

					<!-- <Typewriter
							class="inline"
							:text-array="[
								'CPlusPatch',
								'a developer',
								'a Linux user',
								'a FOSS supporter',
							]"
							:speed="100"
							:wait="1500" /> -->
				</h1>
			</div>
		</div>
	</div>
</template>
