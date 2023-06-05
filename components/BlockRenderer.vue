<script setup lang="ts">
import { Block } from "~/db/entities/Block";

// import Button from "./button/Button.vue";
const props = defineProps<{
	block: Block;
	edit: boolean;
	isLast: boolean;
}>();

const emit = defineEmits([
	"updateBlock",
	"addNewBlock",
	"deleteBlock",
	"moveBlockUp",
	"moveBlockDown",
]);

const importedComp = (
	await import(
		`~/templates/${props.block.category}/${props.block.component}.vue`
	)
).default;

const editSlot = (e: Event, slot: any) => {
	emit("updateBlock", {
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
		<div
			v-if="edit"
			class="!absolute bottom-0 inset-x-0 justify-center z-50 flex gap-x-2">
			<Button
				theme="gray"
				class="disabled:!opacity-50"
				:disabled="block.index === 0"
				@click="$emit('moveBlockUp')">
				<Icon name="ic:round-keyboard-arrow-up" />
			</Button>
			<Button
				theme="gray"
				class="disabled:!opacity-50"
				:disabled="isLast"
				@click="$emit('moveBlockDown')">
				<Icon name="ic:round-keyboard-arrow-down" />
			</Button>
			<Button
				theme="gray"
				class="!text-red-600"
				@click="$emit('deleteBlock')">
				<Icon name="ic:round-delete" class="mr-2" />
				Delete
			</Button>
			<Button theme="gray" @click="$emit('addNewBlock')">
				<Icon name="ic:round-add-circle-outline" class="mr-2" />
				Add new
			</Button>
		</div>
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
