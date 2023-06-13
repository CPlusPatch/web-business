<script setup lang="ts">
import { nanoid } from "nanoid";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	imageMain?: string;
	textHeader?: string;
	textSecondary?: string;
	list?: {
		id: string;
		name: string;
		description: string;
		icon: string;
	}[];
}>();

const emit = defineEmits(["editField"]);

const _prompt = (...props: any[]) => prompt(...props);
</script>

<template>
	<PrimaryContainer class="flex flex-row items-center">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
			<div class="lg:pr-8">
				<div class="lg:max-w-lg">
					<h2
						:contenteditable="editable"
						data-placeholder="Title"
						class="mt-2 mr-2 inline text-4xl font-bold text-gray-900 sm:text-6xl"
						@focusout="
							editable &&
								emit(
									'editField',
									($event.target as HTMLSpanElement)
										.innerText,
									'text-header'
								)
						">
						{{ textHeader }}
					</h2>
					<p
						class="mt-6 text-lg leading-8 text-gray-600"
						:contenteditable="editable"
						data-placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
						@focusout="
							editable &&
								emit(
									'editField',
									($event.target as HTMLSpanElement)
										.innerText,
									'text-secondary'
								)
						">
						{{ textSecondary }}
					</p>
					<div
						class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
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
							field-name="list"
							key-name="id"
							:list="
								list ?? [
									{
										id: nanoid(),
										name: '',
										description: '',
										icon: '',
									},
									{
										id: nanoid(),
										name: '',
										description: '',
										icon: '',
									},
									{
										id: nanoid(),
										name: '',
										description: '',
										icon: '',
									},
								]
							"
							@edit-field="
								(...props) => emit('editField', ...props)
							">
							<div class="relative pl-9 flex flex-row gap-2">
								<div class="grow">
									<div
										class="inline font-semibold text-gray-900">
										<Icon
											:name="
												element.icon === ''
													? 'tabler:dots'
													: element.icon
											"
											class="absolute left-1 top-1 h-5 w-5 text-orange-600"
											aria-hidden="true"
											@click="
												editable &&
													update(
														_prompt('Icon name:'),
														index,
														'icon'
													)
											" />

										<span
											:contenteditable="editable"
											data-placeholder="Bold header"
											@focusout="
												editable &&
													update(
														($event.target as any)
															.innerText,
														index,
														'name'
													)
											"
											>{{ element.name }}</span
										>
									</div>
									{{ " " }}
									<div
										class="inline"
										:contenteditable="editable"
										data-placeholder="Secondary text"
										@focusout="
											editable &&
												update(
													($event.target as any)
														.innerText,
													index,
													'description'
												)
										">
										{{ element.description }}
									</div>
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
													name: '',
													description: '',
													icon: '',
												})
											">
											<Icon
												name="ic:round-plus"
												class="w-6 h-6" />
										</Button>
									</div>
								</div>
							</div>
						</TemplatesTemplateList>
					</div>
				</div>
			</div>
			<nuxt-img
				alt="Product screenshot"
				:src="imageMain ?? 'https://placehold.co/1200'"
				class="w-[48rem] max-w-none rounded-xl hidden md:block duration-500 shadow-xl ring-1 ring-gray-400/10 sm:w-[40rem] md:-ml-4 lg:-ml-0" />
		</div>
	</PrimaryContainer>
</template>
