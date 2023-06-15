<script setup lang="ts">
// eslint-disable vue/no-use-v-if-with-v-for
import { Block } from "~/db/entities/Block";
import { TemplateMetadata, InputType } from "~/types/types";

defineProps<{
	importedMeta: TemplateMetadata["inputs"];
	slots: Block["slots"];
}>();

const emit = defineEmits(["editSlot"]);

// const log = (...props: any[]) => console.log(...props);
</script>

<template>
	<div v-for="[name, inputType] in Object.entries(importedMeta)" :key="name">
		<template v-if="inputType === InputType.String">
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
					class="!ring-orange-500 focus:!border-orange-500 rounded h-4 w-4 text-orange-600 rounded"
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
				for="project-name"
				class="block text-sm font-medium text-gray-900">
				{{ name }}
			</label>
			<div class="mt-1">
				<SlotEditorRenderer
					v-for="(element, index) of slots[name]"
					:key="element.id"
					:slots="element"
					:imported-meta="importedMeta[name][0]"
					@edit-slot="(newSlots: Block['slots']) => emit('editSlot', {
						...slots,
						[name]: slots[name].toSpliced(index, 1, newSlots),
					})" />
			</div>
		</template>
	</div>
</template>
