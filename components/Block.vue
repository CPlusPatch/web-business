<script setup lang="ts">
const props = defineProps<{
	component: string;
	category: string;
	slots: any[];
}>();

const importedComp = (
	await import(`~/templates/${props.category}/${props.component}.vue`)
).default;
</script>

<template>
	<component :is="importedComp">
		<template v-for="slot in slots" #[slot.name]="">{{
			slots.find(s => s.name === slot.name)?.value
		}}</template>
	</component>
</template>
