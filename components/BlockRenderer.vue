<script setup lang="ts">
import { Block } from "~/db/entities/Block";

// import Button from "./button/Button.vue";
const props = defineProps<{
	block: Block;
	edit: boolean;
	isLast: boolean;
	isFirst: boolean;
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

const editSlot = (value: string, slot: any) => {
	emit("updateBlock", {
		...props.block,
		slots: props.block.slots.map(s =>
			s.name === slot
				? {
						name: slot,
						value,
				  }
				: s
		),
	});
};

const passedProps: {
	[name: string]: string | undefined;
} = {};

props.block.slots.forEach(s => {
	passedProps[s.name] = s.value;
});
</script>

<template>
	<div class="relative">
		<div
			v-if="edit"
			class="!absolute left-10 items-center inset-y-0 justify-center z-50 flex flex-col gap-2">
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md hover:translate-x-1"
				:disabled="isFirst"
				@click="$emit('moveBlockUp')">
				<Icon name="ic:round-keyboard-arrow-up" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md hover:translate-x-1"
				:disabled="isLast"
				@click="$emit('moveBlockDown')">
				<Icon name="ic:round-keyboard-arrow-down" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!text-red-600 !px-2 !py-2 !shadow-md hover:translate-x-1"
				@click="$emit('deleteBlock')">
				<Icon name="ic:round-delete" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md hover:translate-x-1"
				@click="$emit('addNewBlock')">
				<Icon name="ic:round-add-circle-outline" class="w-6 h-6" />
			</Button>
		</div>
		<component
			:is="importedComp"
			v-bind="passedProps"
			:editable="edit"
			@edit-field="editSlot">
			<!-- <template
				v-for="slot in block.slots"
				:key="slot.name"
				#[slot.name]=""
				><span
					v-if="
						meta.inputs.find(i => i.name === slot.name)?.type ===
						InputType.String
					"
					:contenteditable="edit"
					@input="editSlot($event, slot)"
					>{{
						block.slots.find(s => s.name === slot.name)?.value
					}}</span
				>
				{{
					meta.inputs.find(i => i.name === slot.name)?.type ===
					InputType.Image
						? block.slots.find(s => s.name === slot.name)?.value
						: undefined
				}}
			</template> -->
		</component>
	</div>
</template>
