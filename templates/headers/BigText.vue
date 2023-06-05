<script lang="ts">
import { InputType, TemplateMetadata } from "~/types/types";
// import Typewriter from "~/components/typewriter/Typewriter.vue";
const meta: TemplateMetadata = {
	category: "headers",
	name: "bigtext1",
	inputs: [
		{
			name: "text-primary",
			type: InputType.String,
		},
		{
			name: "text-typewriter",
			type: InputType.String,
		},
	],
};

export { meta };
</script>

<template>
	<!-- Big landing title -->
	<div class="relative pb-16 sm:pb-24 mt-40">
		<div class="px-4 mx-auto mt-16 max-w-7xl ssm:mt-12 sm:px-6 font-inter">
			<div class="text-left">
				<h1
					class="text-4xl font-black text-gray-900 dark:text-gray-300 sm:text-5xl md:text-6xl">
					<span class="block"><slot name="text-primary" /></span>
					<span
						class="pb-2 text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 !to-yellow-500 via-red-500">
						<slot name="text-typewriter" />
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
					</span>
				</h1>
			</div>
		</div>
	</div>
</template>
