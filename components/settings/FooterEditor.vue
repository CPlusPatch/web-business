<script setup lang="ts">
import { nanoid } from "nanoid";
import { FooterUISetting, UISetting } from "types/types";

const settings = await getSettings();

const props = defineProps<{
	setting: UISetting;
	isLoading: boolean;
}>();

const emit = defineEmits<{
	(event: "update", setting: UISetting): void;
}>();

const value = ref(
	(props.setting.value as FooterUISetting[]) ?? [
		{
			id: nanoid(),
			name: "",
			href: "#",
			icon: "",
		},
		{
			id: nanoid(),
			name: "",
			href: "#",
			icon: "",
		},
		{
			id: nanoid(),
			name: "",
			href: "#",
			icon: "",
		},
		{
			id: nanoid(),
			name: "",
			href: "#",
			icon: "",
		},
		{
			id: nanoid(),
			name: "",
			href: "#",
			icon: "",
		},
	]
);

const updateValue = (id: FooterUISetting["id"], attrs: any) => {
	const foundItemIndex = value.value.findIndex(v => v.id == id);

	value.value[foundItemIndex] = {
		...value.value[foundItemIndex],
		...attrs,
	};

	emit("update", {
		...props.setting,
		value: value.value,
	});
};

const moveUp = (index: number) => {
	const temp = value.value[index];

	value.value[index] = value.value[index - 1];
	value.value[index - 1] = temp;

	emit("update", {
		...props.setting,
		value: value.value,
	});
};

const moveDown = (index: number) => {
	const temp = value.value[index];

	value.value[index] = value.value[index + 1];
	value.value[index + 1] = temp;

	emit("update", {
		...props.setting,
		value: value.value,
	});
};

const addItem = (index: number) => {
	value.value = [
		...value.value.slice(0, index + 1),
		{
			id: nanoid(),
			name: "",
			href: "",
			icon: ""
		},
		...value.value.slice(index + 1)
	];

	emit("update", {
		...props.setting,
		value: value.value,
	});
}

const deleteItem = (index: number) => {
	value.value = [
		...value.value.slice(0, index),
		...value.value.slice(index + 1)
	];

	emit("update", {
		...props.setting,
		value: value.value,
	});
}
</script>

<template>
	<div class="flex flex-col gap-2">
		<TransitionGroup move-class="duration-200 ease-in-out">
			<div v-for="(item, index) in value" :key="item.id" class="grid grid-cols-4 gap-3 justify-center">
				<InputCMInput :loading="isLoading" name="" :value="item.name" @input="
					updateValue(item.id, {
						name: ($event.target as HTMLInputElement).value,
					})
					" placeholder="Social Title" class="w-full" />
				<InputCMInput :value="item.icon" :loading="isLoading" name="" placeholder="Social Icon" @input="
					updateValue(item.id, {
						icon: ($event.target as HTMLInputElement).value,
					})
					" class="w-full" />
				<InputCMInput :value="item.href" :loading="isLoading" name="" placeholder="Social URL (relative)" @input="
					updateValue(item.id, {
						href: ($event.target as HTMLInputElement).value,
					})
					" class="w-full" />
				<div class="flex flex-row gap-2 items-center">
					<Button
						theme="gray"
						class="h-full w-full"
						@click="moveUp(index)">
						<Icon name="ic:round-keyboard-arrow-up" class="w-6 h-6" />
					</Button>
					<Button
						theme="gray"
						class="h-full w-full"
						@click="moveDown(index)">
						<Icon name="ic:round-keyboard-arrow-down" class="w-6 h-6" />
					</Button>
					<Button
						theme="gray"
						class="h-full w-full"
						@click="addItem(index)">
						<Icon name="ic:round-plus" class="w-6 h-6" />
					</Button>
					<Button
						theme="gray"
						class="h-full w-full"
						@click="deleteItem(index)">
						<Icon name="ic:round-delete" class="w-6 h-6 text-red-600" />
					</Button>
				</div>
			</div>
		</TransitionGroup>

		<div class="mt-6 rounded ring-2 ring-orange-500 overflow-hidden">
			<Footer :author-first-name="settings.authorFirstName" :author-last-name="settings.authorLastName" :footer-socials="value" />
		</div>
	</div>
</template>
