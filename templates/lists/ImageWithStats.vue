<script setup lang="ts">
import { nanoid } from "nanoid";
import PrimaryContainer from "~~/components/layout/PrimaryContainer.vue";

const props = defineProps<{
	editable: boolean;
	textHeader?: string;
	image?: string;
	items?: {
		id: string;
		title: string;
		value: string;
	}[];
	reversed?: boolean;
}>();

const _reversed = ref(props.reversed);

const emit = defineEmits(["editField"]);
const _prompt = (...props: any[]) => prompt(...props);
</script>

<template>
	<PrimaryContainer class="flex flex-col gap-y-20 mt-20">
		<div
			:class="[
				'items-center lg:flex lg:gap-x-10 lg:px-5',
				_reversed ? 'flex-row-reverse' : 'flex-row',
			]">
			<div
				class="px-4 sm:px-6 lg:py-16 lg:mx-0 lg:px-0 grow flex flex flex-col gap-y-4">
				<h2
					:contenteditable="editable"
					data-placeholder="Title"
					class="text-3xl font-extrabold tracking-tight text-gray-900 font-inter"
					@focusout="
						editable &&
							emit(
								'editField',
								($event.target as HTMLSpanElement).innerText,
								'text-header'
							)
					">
					{{ textHeader }}
				</h2>
				<div
					class="text-gray-900 divide-y divide-gray-200 font-inter dark:text-white dark:divide-gray-700 w-full">
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
						field-name="items"
						key-name="id"
						:list="
							items ?? [
								{
									id: nanoid(),
									title: '',
									value: '',
								},
								{
									id: nanoid(),
									title: '',
									value: '',
								},
								{
									id: nanoid(),
									title: '',
									value: '',
								},
							]
						"
						@edit-field="(...props) => emit('editField', ...props)">
						<div class="flex flex-row justify-between">
							<div class="flex flex-col py-3">
								<div
									:contenteditable="editable"
									data-placeholder="Element title"
									class="mb-1 text-gray-500 md:text-lg dark:text-gray-400"
									@focusout="
										editable &&
											update(
												($event.target as any)
													.innerText,
												index,
												'title'
											)
									">
									{{ element.title }}
								</div>
								<div
									:contenteditable="editable"
									data-placeholder="Element value"
									class="text-lg font-semibold"
									@focusout="
										editable &&
											update(
												($event.target as any)
													.innerText,
												index,
												'value'
											)
									">
									{{ element.value }}
								</div>
							</div>
							<div
								v-if="editable"
								class="grid-cols-2 grid gap-1 shrink-0 p-2">
								<Button
									theme="gray"
									class="!px-1 !py-1 !shadow-md hover:-translate-y-1"
									@click="moveUp(index)">
									<Icon
										name="ic:round-keyboard-arrow-up"
										class="w-6 h-6" />
								</Button>
								<Button
									theme="gray"
									class="!px-1 !py-1 !text-red-600 !shadow-md"
									@click="deleteItem(index)">
									<Icon
										name="ic:round-delete"
										class="w-6 h-6" />
								</Button>
								<Button
									theme="gray"
									class="!px-1 !py-1 !shadow-md hover:translate-y-1"
									@click="moveDown(index)">
									<Icon
										name="ic:round-keyboard-arrow-down"
										class="w-6 h-6" />
								</Button>
								<Button
									theme="gray"
									class="!px-1 !py-1 !shadow-md"
									@click="
										add(index, {
											id: nanoid(),
											title: '',
											value: '',
										})
									">
									<Icon
										name="ic:round-plus"
										class="w-6 h-6" />
								</Button>
							</div>
						</div>
					</TemplatesTemplateList>
				</div>
			</div>

			<Button
				theme="gray"
				class="!px-1 !py-1 !shadow-md hover:translate-y-1">
				<Icon
					name="ic:round-swap-horiz"
					class="w-6 h-6"
					@click="
						() => {
							_reversed = !_reversed;
							editable &&
								emit(
									'editField',
									_reversed ?? false,
									'reversed'
								);
						}
					" />
			</Button>

			<div
				class="hidden justify-center items-center mt-0 md:flex grow h-[35rem]">
				<img
					class="h-full w-auto"
					:src="image ?? 'https://placehold.co/600'"
					format="webp"
					alt="Laptop"
					width="416"
					height="671"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					@click="
						editable &&
							emit(
								'editField',
								_prompt('Image URL:', image),
								'image'
							)
					" />
			</div>
		</div>
	</PrimaryContainer>
</template>
