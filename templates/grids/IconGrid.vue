<template>
	<PrimaryContainer>
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4">
				<h2
					:contenteditable="editable"
					data-placeholder="Header text here"
					class="mb-3 text-3xl font-black inline mr-2 text-gray-800 font-poppins sm:text-5xl"
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
				<p
					:contenteditable="editable"
					data-placeholder="Secondary text here"
					class="text-xl text-gray-500 dark:text-gray-300 font-inter"
					@focusout="
						editable &&
							emit(
								'editField',
								($event.target as HTMLSpanElement).innerText,
								'text-secondary'
							)
					">
					{{ textSecondary }}
				</p>
			</div>
		</div>
		<div
			class="grid grid-cols-1 gap-5 mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 font-inter">
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
							type: '',
							experience: '',
							image: '',
							padding: false,
						},
						{
							id: nanoid(),
							name: '',
							type: '',
							experience: '',
							image: '',
							padding: false,
						},
						{
							id: nanoid(),
							name: '',
							type: '',
							experience: '',
							image: '',
							padding: false,
						},
						{
							id: nanoid(),
							name: '',
							type: '',
							experience: '',
							image: '',
							padding: false,
						},
					]
				"
				@edit-field="(...props) => emit('editField', ...props)">
				<div>
					<div
						class="flex overflow-hidden col-span-1 divide-x divide-gray-300 ring-gray-300 rounded shadow ring-1 duration-200 hover:scale-[102%] no-bad-scale hover:shadow-2xl hover:ring-2 hover:ring-orange-500">
						<Icon
							:name="
								element.image !== ''
									? element.image
									: 'ic:round-image'
							"
							loading="lazy"
							:class="[
								'object-contain rounded-sm duration-150 aspect-1 flex flex-shrink-0 sm:w-24 h-20 sm:h-24 w-20',
								element.padding ? 'p-2' : '',
							]"
							alt=""
							@click="
								editable &&
									update(
										_prompt('Icon name', element.image),
										index,
										'image'
									)
							" />

						<div
							class="flex relative flex-col flex-1 justify-between items-start truncate bg-white">
							<div class="flex-1 px-4 py-2 text-sm truncate">
								<h3
									data-placeholder="Name"
									class="text-lg font-bold text-gray-900"
									:contenteditable="editable"
									@focusout="
										editable &&
											update(
												($event.target as any)
													.innerText,
												index,
												'name'
											)
									">
									{{ element.name }}
								</h3>
								<p
									data-placeholder="Subtitle"
									class="text-gray-500"
									:contenteditable="editable"
									@focusout="
										editable &&
											update(
												($event.target as any)
													.innerText,
												index,
												'experience'
											)
									">
									{{ element.experience }}
								</p>
							</div>
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
									name: '',
									type: '',
									experience: '',
									image: '',
								})
							">
							<Icon name="ic:round-plus" class="w-6 h-6" />
						</Button>
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md"
							@click="update(!element.padding, index, 'padding')">
							<Icon name="ic:outline-padding" class="w-6 h-6" />
						</Button>
					</div>
				</div>
			</TemplatesTemplateList>
		</div>
	</PrimaryContainer>
</template>

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
		type: string;
		experience: string;
		image: string;
		padding: boolean;
	}[];
}>();

const _prompt = (...props: any[]) => prompt(...props);
const emit = defineEmits(["editField"]);
</script>
