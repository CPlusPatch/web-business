<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";
import { nanoid } from "nanoid";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader?: string;
	list?: {
		id: string;
		title: string;
		desc: string;
		image: string;
		link: {
			text: string;
			href: string;
		};
	}[];
}>();

const emit = defineEmits(["editField"]);

const _prompt = (...args: any[]) => prompt(...args);
</script>

<template>
	<PrimaryContainer>
		<h2
			class="text-center mt-1 text-4xl inline mx-auto font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
			data-placeholder="Header"
			:contenteditable="editable"
			@focusout="
				emit(
					'editField',
					($event.target as HTMLSpanElement).innerText,
					'text-header'
				)
			">
			{{ textHeader }}
		</h2>

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
			key-name="title"
			:list="
				list ?? [
					{
						id: nanoid(),
						title: '',
						desc: '',
						image: '',
						link: {
							href: '#',
							text: '',
						},
					},
				]
			"
			@edit-field="(...props) => emit('editField', ...props)">
			<div
				class="relative flex-row flex max-w-6xl mx-auto mt-12 lg:mt-24 gap-8 lg:items-center">
				<div
					class="flex-row flex odd:flex-row-reverse justify-between lg:items-center gap-8 grow">
					<div class="relative flex flex-col gap-y-4 md:w-2/3">
						<h3
							:contenteditable="editable"
							data-placeholder="Bold title"
							class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
							@focusout="
								editable &&
									update(
										($event.target as any).innerText,
										index,
										'title'
									)
							">
							{{ element.title }}
						</h3>

						<p
							:contenteditable="editable"
							data-placeholder="A short description here"
							class="mt-3 text-lg text-gray-500 font-inter"
							@focusout="
								editable &&
									update(
										($event.target as any).innerText,
										index,
										'desc'
									)
							">
							{{ element.desc }}
						</p>

						<a
							v-if="element.link.text"
							class="text-lg text-blue-600 font-inter"
							:href="element.link.href"
							target="_blank"
							rel="noreferrer">
							{{ element.link.text }}
							<IconExternalLink class="inline mb-1 w-5 h-5" />
						</a>

						<Button
							v-if="editable"
							theme="gray"
							class="w-20"
							@click="
								update(
									{
										text: _prompt('Link text:'),
										href: _prompt('Link href:'),
									},
									index,
									'link'
								)
							">
							Add link
						</Button>
					</div>

					<div
						class="hidden relative -mx-4 mt-10 lg:mt-0 lg:flex"
						aria-hidden="true">
						<nuxt-img
							class="relative h-72 w-72 rounded-lg shadow-md hover:rotate-2 duration-200 hover:shadow-xl"
							:src="
								element.image === ''
									? 'https://placehold.co/400'
									: element.image
							"
							loading="lazy"
							alt="Photograph of an Astro Pi"
							@click="
								editable &&
									update(
										_prompt('Image URL:'),
										index,
										'image'
									)
							" />
					</div>
				</div>
				<div v-if="editable" class="grid-cols-2 grid gap-1 shrink-0">
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
						<Icon name="ic:round-delete" class="w-6 h-6" />
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
								title: '',
								desc: '',
								image: '',
								link: {
									href: '#',
									text: '',
								},
							})
						">
						<Icon name="ic:round-plus" class="w-6 h-6" />
					</Button>
				</div>
			</div>
		</TemplatesTemplateList>

		<TransitionGroup name="block-list-2"> </TransitionGroup>
	</PrimaryContainer>
</template>

<style scoped>
.block-list-2-move {
	transition: transform 0.2s ease-in-out;
}
</style>
