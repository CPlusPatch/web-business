<template>
	<Transition
		:appear="appear"
		enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		enter-to-class="opacity-100 translate-y-0 sm:scale-100"
		enter-active-class="ease-out duration-100"
		leave-active-class="ease-in duration-100"
		leave-from-class="opacity-100 translate-y-0 sm:scale-100"
		leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
		<slot />
	</Transition>
</template>

<script lang="ts">
import { Transition, defineComponent } from "vue";

export default defineComponent({
	name: "ScaleFadeSlide",
	components: { Transition },
	props: {
		appear: {
			type: Boolean,
			default: true,
		},
	},
});
</script>
