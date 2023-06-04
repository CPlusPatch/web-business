<script setup lang="ts">
import { Block } from "~/db/entities/Block";

// import Button from "./button/Button.vue";
const props = defineProps<{
	block: Block;
	edit: boolean;
	updateBlock: (newBlock: Block) => any;
}>();

const importedComp = (
	await import(
		`~/templates/${props.block.category}/${props.block.component}.vue`
	)
).default;

const editSlot = (e: Event, slot: any) => {
	props.updateBlock({
		...props.block,
		slots: props.block.slots.map(s =>
			s.name === slot.name
				? {
						name: slot.name,
						value: (e.target as HTMLSpanElement).innerText,
				  }
				: s
		),
	});
};
</script>

<template>
	<div class="relative">
		<!-- <Button
			class="!absolute bottom-0 right-0 z-50"
			theme="gray"
			@click="open = true">
			Edit
		</Button> -->
		<component :is="importedComp">
			<template
				v-for="slot in block.slots"
				:key="slot.name"
				#[slot.name]=""
				><span
					:contenteditable="edit"
					@input="editSlot($event, slot)"
					>{{
						block.slots.find(s => s.name === slot.name)?.value
					}}</span
				></template
			>
		</component>
	</div>
</template>
