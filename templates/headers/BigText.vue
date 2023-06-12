<script lang="ts">
// import Typewriter from "~/components/typewriter/Typewriter.vue";
</script>

<script setup lang="ts">
defineProps<{
	textPrimary?: string;
	textTypewriter?: string;
	editable: boolean;
}>();

const emit = defineEmits(["editField"]);
</script>

<template>
	<!-- Big landing title -->
	<div class="relative pb-16 sm:pb-24 mt-40">
		<div class="px-4 mx-auto mt-16 max-w-7xl ssm:mt-12 sm:px-6 font-inter">
			<div class="text-left">
				<h1
					class="text-4xl font-black text-gray-900 dark:text-gray-300 sm:text-5xl md:text-6xl flex flex-col">
					<span
						class="inline mr-auto"
						:contenteditable="editable"
						data-placeholder="Your"
						@input="
							editable &&
								emit(
									'editField',
									($event.target as HTMLSpanElement)
										.innerText,
									'text-primary'
								)
						"
						>{{ textPrimary }}</span
					>
					<span
						:contenteditable="editable"
						data-placeholder="Title here"
						class="py-2 text-transparent mr-auto bg-clip-text bg-gradient-to-tr from-pink-500 !to-yellow-500 via-red-500"
						@input="
							editable &&
								emit(
									'editField',
									($event.target as HTMLSpanElement)
										.innerText,
									'text-typewriter'
								)
						">
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
