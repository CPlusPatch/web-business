<template>
	<div v-bind="$attrs">
		{{ currentText }}
	</div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";

interface Props {
	textArray: string[];
	speed: number;
	wait: number;
}

const props: Props = defineProps<Props>();

const currentIndex = ref(0);
const currentText = ref("");
let timeout: ReturnType<typeof setTimeout> | null = null;

const updateText = () => {
	const text = props.textArray[currentIndex.value];
	if (!text) {
		return;
	}
	const length = text.length;

	let i = 0;
	timeout = setInterval(() => {
		currentText.value = text.slice(0, i);
		i++;
		if (i > length) {
			clearInterval(timeout!);
			setTimeout(() => {
				timeout = setInterval(() => {
					currentText.value = text.slice(0, length - i);
					i++;
					if (i > length * 2) {
						clearInterval(timeout!);

						currentIndex.value++;
						if (currentIndex.value >= props.textArray.length) {
							currentIndex.value = 0;
						}
						updateText();
					}
				}, props.speed);
			}, props.wait);
		}
	}, props.speed);
};

onUnmounted(() => {
	if (timeout) {
		clearInterval(timeout);
	}
});

updateText();
</script>
