<script setup lang="ts">
import { nanoid } from "nanoid";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader?: string;
	textSecondary?: string;
	grid?: {
		id: string;
		name: string;
		value: string;
	}[];
}>();

const emit = defineEmits(["editField"]);
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-10 items-start">
		<div class="mx-auto max-w-7xl lg:mx-0">
			<h2
				:contenteditable="editable"
				data-placeholder="Header text here"
				class="text-4xl font-bold tracking-tight inline text-gray-900 sm:text-5xl"
				@focusout="
					editable &&
						emit(
							'editField',
							($event.target as HTMLHeadingElement).innerText,
							'text-header'
						)
				">
				{{ textHeader }}
			</h2>
			<p
				:contenteditable="editable"
				data-placeholder="Header text here"
				class="mt-6 text-lg leading-8 text-gray-700"
				@focusout="
					editable &&
						emit(
							'editField',
							($event.target as HTMLParagraphElement).innerText,
							'text-secondary'
						)
				">
				{{ textSecondary }}
			</p>
		</div>
		<div
			class="grid grid-cols-1 gap-x-4 gap-y-6 text-center lg:grid-cols-3 w-full">
			<TemplatesTemplateList
				v-slot="{
					add,
					deleteItem,
					moveDown,
					moveUp,
					update,
					element,
					index,
				}"
				field-name="grid"
				key-name="id"
				:list="
					grid ?? [
						{
							id: nanoid(),
							name: '',
							value: '',
						},
						{
							id: nanoid(),
							name: '',
							value: '',
						},
						{
							id: nanoid(),
							name: '',
							value: '',
						},
					]
				"
				@edit-field="(...props) => emit('editField', ...props)">
				<div>
					<div
						class="w-full flex flex-col gap-y-4 ring-2 rounded-lg shadow hover:ring-orange-400 ease-in-out duration-500 ring-gray-200 p-6">
						<div
							:contenteditable="editable"
							data-placeholder="Short description here"
							class="text-base leading-7 text-gray-600"
							@focusout="
								editable &&
									update(
										($event.target as any).innerText,
										index,
										'name'
									)
							">
							{{ element.name }}
						</div>
						<div
							:contenteditable="editable"
							data-placeholder="Big Stat"
							class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
							@focusout="
								editable &&
									update(
										($event.target as any).innerText,
										index,
										'value'
									)
							">
							{{ element.value }}
						</div>
					</div>
					<div
						v-if="editable"
						class="flex flex-row gap-1 justify-center mt-3">
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md hover:-translate-y-1"
							@click="moveUp(index)">
							<Icon
								name="ic:round-keyboard-arrow-left"
								class="w-6 h-6" />
						</Button>
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md hover:translate-y-1"
							@click="moveDown(index)">
							<Icon
								name="ic:round-keyboard-arrow-right"
								class="w-6 h-6" />
						</Button>

						<Button
							theme="gray"
							class="!px-1 !py-1 !text-red-600 !shadow-md"
							@click="deleteItem(index)">
							<Icon name="ic:round-delete" class="w-6 h-6" />
						</Button>
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md"
							@click="
								add(index, {
									id: nanoid(),
									name: '',
									value: '',
								})
							">
							<Icon name="ic:round-plus" class="w-6 h-6" />
						</Button>
					</div>
				</div>
			</TemplatesTemplateList>
		</div>
	</PrimaryContainer>
</template>
