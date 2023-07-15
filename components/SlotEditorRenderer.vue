<script setup lang="ts">
// eslint-disable vue/no-use-v-if-with-v-for
import { Block } from "~/db/entities/Block";
import { TemplateMetadata, InputType } from "~/types/types";
import { generateIds } from "~/utils/utilities";

const props = defineProps<{
	importedMeta: TemplateMetadata["inputs"];
	defaults: TemplateMetadata["defaults"];
	slots: Block["slots"];
}>();

const emit = defineEmits(["editSlot"]);

const expanded = ref(false);

// const log = (...props: any[]) => console.log(...props);

const moveUp = (index: number, name: string) => {
	const tempSlots = props.slots[name];
	const temp = tempSlots[index - 1];
	tempSlots[index - 1] = tempSlots[index];
	tempSlots[index] = temp;

	emit("editSlot", {
		...props.slots,
		[name]: tempSlots,
	});
};

const moveDown = (index: number, name: string) => {
	const tempSlots = props.slots[name];
	const temp = tempSlots[index + 1];
	tempSlots[index + 1] = tempSlots[index];
	tempSlots[index] = temp;

	emit("editSlot", {
		...props.slots,
		[name]: tempSlots,
	});
};

const addItem = (index: number, name: string) => {
	const tempSlots = [
		...(props.slots[name] as any[]).slice(0, index + 1),
		generateIds(props.defaults[name][0]),
		...(props.slots[name] as any[]).slice(index + 1),
	];

	emit("editSlot", {
		...props.slots,
		[name]: tempSlots,
	});
};

const deleteItem = (index: number, name: string) => {
	const tempSlots = [
		...(props.slots[name] as any[]).slice(0, index),
		...(props.slots[name] as any[]).slice(index + 1),
	];

	emit("editSlot", {
		...props.slots,
		[name]: tempSlots,
	});
};
</script>

<template>
	<div v-for="[name, inputType] in Object.entries(importedMeta)" :key="name">
		<template v-if="inputType === InputType.String && name !== 'id'">
			<label
				for="project-name"
				class="block text-sm font-medium text-gray-900">
				{{ name }}
			</label>
			<div class="mt-1">
				<Input
					id="project-name"
					:value="slots[name]"
					type="text"
					name="project-name"
					class="!ring-orange-500 focus:!border-orange-500"
					@input="
						emit('editSlot', {
							...slots,
							[name]: ($event as any).target.value,
						})
					" />
			</div>
		</template>

		<template v-if="inputType === InputType.Paragraph">
			<label
				for="project-name"
				class="block text-sm font-medium text-gray-900">
				{{ name }}
			</label>
			<div class="mt-1">
				<textarea
					id="project-name"
					:value="slots[name]"
					type="text"
					name="project-name"
					rows="3"
					class="!ring-orange-500 focus:!border-orange-500 block peer pr-3 py-1.5 focus:ring-2 border border-gray-300 placeholder:text-gray-400 w-full pl-3 bg-white rounded-md shadow-sm duration-200 outline-none disabled:bg-gray-100 focus:outline-none text-sm leading-6"
					@input="
						emit('editSlot', {
							...slots,
							[name]: ($event as any).target.value,
						})
					"></textarea>
			</div>
		</template>

		<template v-if="inputType === InputType.Boolean">
			<label
				for="project-name"
				class="block text-sm font-medium text-gray-900">
				{{ name }}
			</label>
			<div class="mt-1">
				<input
					id="project-name"
					:checked="slots[name]"
					type="checkbox"
					name="project-name"
					class="!ring-orange-500 focus:!border-orange-500 rounded h-4 w-4 text-orange-600"
					@input="
						emit('editSlot', {
							...slots,
							[name]: ($event as any).target.checked,
						})
					" />
			</div>
		</template>

		<!-- Then the input is an object or an array of objects -->
		<template v-if="Array.isArray(inputType)">
			<label
				@click="expanded = !expanded"
				for="project-name"
				class="block text-sm font-medium text-gray-900">
				{{ name }}
				<Icon
					:name="
						expanded
							? 'material-symbols:collapse-all-rounded'
							: 'material-symbols:expand-all-rounded'
					" />
			</label>
			<TransitionGroup
				tag="div"
				name="block-list"
				v-if="expanded"
				class="border-l-2 px-2 pb-2">
				<div
					v-for="(element, index) of slots[name]"
					:key="element.id"
					class="mt-2 flex flex-col gap-1">
					<SlotEditorRenderer
						:slots="element"
						:imported-meta="importedMeta[name][0]"
						:defaults="defaults[name][0]"
						@edit-slot="(newSlots: Block['slots']) => emit('editSlot', {
							...slots,
							[name]: slots[name].toSpliced(index, 1, newSlots),
						})" />
					<div class="flex gap-2 mt-1">
						<Button
							v-if="!(index === 0)"
							theme="gray"
							class="!px-2 !py-2"
							@click="moveUp(index, name)">
							<Icon name="ic:round-keyboard-arrow-up" />
						</Button>
						<Button
							v-if="!(index === slots[name].length - 1)"
							theme="gray"
							class="!px-2 !py-2"
							@click="moveDown(index, name)">
							<Icon name="ic:round-keyboard-arrow-down" />
						</Button>
						<Button
							theme="gray"
							class="!px-2 !py-2"
							@click="addItem(index, name)">
							<Icon name="ic:round-add" />
						</Button>
						<Button
							theme="gray"
							class="!px-2 !py-2 !text-red-600"
							@click="deleteItem(index, name)">
							<Icon name="ic:round-delete" />
						</Button>
					</div>
				</div>
			</TransitionGroup>
		</template>
	</div>
</template>

<style scoped>
.block-list-move {
	transition: transform 0.2s ease-in-out;
}
</style>
