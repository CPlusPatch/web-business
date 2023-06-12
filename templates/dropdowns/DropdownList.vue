<script setup lang="ts">
import { nanoid } from "nanoid";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader: string;
	list?: {
		id: string;
		question: string;
		answer: string;
	}[];
}>();

const emit = defineEmits(["editField"]);
</script>

<template>
	<PrimaryContainer>
		<div class="mx-auto max-w-3xl flex flex-col gap-y-10">
			<h2
				data-placeholder="Header"
				:contenteditable="editable"
				class="text-3xl inline mx-auto font-extrabold text-center text-gray-900 dark:text-gray-200 sm:text-4xl font-poppins"
				@focusout="
					emit(
						'editField',
						($event.target as HTMLSpanElement).innerText,
						'text-header'
					)
				">
				{{ textHeader }}
			</h2>
			<dl class="gap-y-3 flex flex-col">
				<TemplatesTemplateList
					v-slot="{
						add,
						deleteItem,
						element,
						index,
						moveDown,
						moveUp,
						update,
					}"
					:list="
						list ?? [
							{
								id: nanoid(),
								question: '',
								answer: '',
							},
							{
								id: nanoid(),
								question: '',
								answer: '',
							},
							{
								id: nanoid(),
								question: '',
								answer: '',
							},
							{
								id: nanoid(),
								question: '',
								answer: '',
							},
						]
					"
					key-name="id"
					field-name="list"
					@edit-field="(...props) => emit('editField', ...props)">
					<HeadlessDisclosure
						v-slot="{ open }"
						class="flex flex-row"
						as="div">
						<div class="mx-3 py-4 space-y-3 grow border-b">
							<dt class="text-lg font-poppins">
								<HeadlessDisclosureButton
									class="flex justify-between items-start w-full text-left text-gray-400 font-inter">
									<span
										:contenteditable="editable"
										data-placeholder="Question"
										class="font-medium text-gray-900 dark:text-gray-300"
										@focusout="
											editable &&
												update(
													($event.target as any)
														.innerText,
													index,
													'question'
												)
										">
										{{ element.question }}
									</span>
									<span class="flex items-center ml-6 h-7">
										<Icon
											name="tabler:chevron-down"
											:class="[
												open
													? '-rotate-180'
													: 'rotate-0',
												'w-6 h-6 duration-300 ease-in-out transform',
											]"
											aria-hidden="true" />
									</span>
								</HeadlessDisclosureButton>
							</dt>
							<transition
								enter-active-class="transition duration-100 ease-in"
								enter-from-class="transform scale-95 opacity-0"
								enter-to-class="transform scale-100 opacity-100"
								leave-active-class="transition duration-75 ease-out"
								leave-from-class="transform scale-100 opacity-100"
								leave-to-class="transform scale-95 opacity-0">
								<HeadlessDisclosurePanel>
									<dd class="pr-12 mt-2">
										<p
											:contenteditable="editable"
											data-placeholder="Disclosure content"
											class="text-base text-gray-600 whitespace-pre-line font-inter"
											@focusout="
												editable &&
													update(
														($event.target as any)
															.innerText,
														index,
														'answer'
													)
											">
											{{ element.answer }}
										</p>
									</dd>
								</HeadlessDisclosurePanel>
							</transition>
						</div>
						<div v-if="editable" class="flex gap-1">
							<div class="flex flex-col gap-1">
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
									class="!px-1 !py-1 !shadow-md hover:translate-y-1"
									@click="moveDown(index)">
									<Icon
										name="ic:round-keyboard-arrow-down"
										class="w-6 h-6" />
								</Button>
							</div>
							<div class="flex flex-col gap-1">
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
									class="!px-1 !py-1 !shadow-md"
									@click="
										add(index, {
											id: nanoid(),
											question: '',
											answer: '',
										})
									">
									<Icon
										name="ic:round-plus"
										class="w-6 h-6" />
								</Button>
							</div>
						</div>
					</HeadlessDisclosure>
				</TemplatesTemplateList>
			</dl>
		</div>
	</PrimaryContainer>
</template>
