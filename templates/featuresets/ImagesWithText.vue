<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

const props = defineProps<{
	editable: boolean;
	textHeader: string;
	list: {
		title: string;
		desc: string;
		image: string;
		link: {
			text: string;
			href: string;
		};
	}[];
}>();

const _list = ref(props.list);

const emit = defineEmits(["editField"]);

const sendChanges = (e: Event, index: number, fieldType: string) => {
	const newList = _list.value;

	if (fieldType === "image") {
		(newList[index] as any)[fieldType] = prompt("Image URL:");
	} else if (fieldType === "link") {
		(newList[index] as any)[fieldType] = {
			text: prompt("Link text:"),
			href: prompt("Link URL:"),
		};
	} else {
		(newList[index] as any)[fieldType] = (
			e.target as HTMLSpanElement
		).innerText;
	}

	emit("editField", newList, "list");
};

const moveUp = (index: number) => {
	if (index === 0) return;
	const tempList = _list.value;
	const temp = tempList[index];
	tempList[index] = tempList[index - 1];
	tempList[index - 1] = temp;

	_list.value = tempList;
	emit("editField", tempList, "list");
};

const moveDown = (index: number) => {
	if (index === _list.value.length - 1) return;
	const tempList = _list.value;
	const temp = tempList[index];
	tempList[index] = tempList[index + 1];
	tempList[index + 1] = temp;

	_list.value = tempList;
	emit("editField", tempList, "list");
};

const addItem = (index: number) => {
	_list.value = [
		..._list.value.slice(0, index + 1),
		{
			title: "",
			desc: "",
			image: "",
			link: {
				href: "#",
				text: "",
			},
		},
		..._list.value.splice(index + 1),
	];
	emit("editField", _list.value, "list");
};

const deleteItem = (index: number) => {
	_list.value = [
		..._list.value.slice(0, index),
		..._list.value.splice(index + 1),
	];
	emit("editField", _list.value, "list");
};
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

		<TransitionGroup name="block-list-2">
			<div
				v-for="(cert, index) of list"
				:key="cert.title"
				class="relative flex-row flex max-w-6xl mx-auto mt-12 lg:mt-24 gap-8 lg:items-center">
				<div
					class="flex-row flex odd:flex-row-reverse justify-between lg:items-center gap-8 grow">
					<div class="relative flex flex-col gap-y-4 md:w-2/3">
						<h3
							:contenteditable="editable"
							data-placeholder="Bold title"
							class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
							@focusout="sendChanges($event, index, 'title')">
							{{ cert.title }}
						</h3>

						<p
							:contenteditable="editable"
							data-placeholder="A short description here"
							class="mt-3 text-lg text-gray-500 font-inter"
							@focusout="sendChanges($event, index, 'desc')">
							{{ cert.desc }}
						</p>

						<a
							v-if="cert.link.text"
							class="text-lg text-blue-600 font-inter"
							:href="cert.link.href"
							target="_blank"
							rel="noreferrer">
							{{ cert.link.text }}
							<IconExternalLink class="inline mb-1 w-5 h-5" />
						</a>

						<Button
							v-if="editable"
							theme="gray"
							class="w-20"
							@click="sendChanges($event, index, 'link')">
							Add link
						</Button>
					</div>

					<div
						class="hidden relative -mx-4 mt-10 lg:mt-0 lg:flex"
						aria-hidden="true">
						<nuxt-img
							class="relative h-72 w-72 rounded-lg shadow-md hover:rotate-2 duration-200 hover:shadow-xl"
							:src="cert.image === '' ? '#' : cert.image"
							loading="lazy"
							alt="Photograph of an Astro Pi"
							@click="sendChanges($event, index, 'image')" />
					</div>
				</div>
				<div class="flex gap-1">
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
							<Icon name="ic:round-delete" class="w-6 h-6" />
						</Button>
						<Button
							theme="gray"
							class="!px-1 !py-1 !shadow-md"
							@click="addItem(index)">
							<Icon name="ic:round-plus" class="w-6 h-6" />
						</Button>
					</div>
				</div>
			</div>
		</TransitionGroup>
	</PrimaryContainer>
</template>

<style scoped>
.block-list-2-move {
	transition: transform 0.2s ease-in-out;
}
</style>
