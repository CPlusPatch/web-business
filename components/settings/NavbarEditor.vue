<script setup lang="ts">
import { nanoid } from "nanoid";
import { NavbarUISetting, UISetting } from "types/types";

const props = defineProps<{
	setting: UISetting;
	isLoading: boolean;
}>();

const emit = defineEmits<{
	(event: "update", setting: UISetting): void;
}>();

const value = ref(
	(props.setting.value as NavbarUISetting[]) ?? [
		{
			id: nanoid(),
			title: "",
			href: "",
		},
		{
			id: nanoid(),
			title: "",
			href: "",
		},
		{
			id: nanoid(),
			title: "",
			href: "",
		},
		{
			id: nanoid(),
			title: "",
			href: "",
		},
		{
			id: nanoid(),
			title: "",
			href: "",
		},
	]
);

const updateValue = (id: NavbarUISetting["id"], attrs: any) => {
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
			title: "",
			href: "#",
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
			<div v-for="(item, index) in value" :key="item.id" class="grid grid-cols-3 gap-3">
				<Input
					:loading="isLoading"
					name=""
					:value="item.title"
					@input="
						updateValue(item.id, {
							title: ($event.target as HTMLInputElement).value,
						})
					"
					icon=""
					placeholder="Link title"
					class="w-full" />
				<Input
					:value="item.href"
					:loading="isLoading"
					name=""
					icon=""
					placeholder="Relative URL (/something)"
					@input="
						updateValue(item.id, {
							href: ($event.target as HTMLInputElement).value,
						})
					"
					class="w-full" />
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
	</div>

	<div class="mt-6 rounded ring-2 ring-orange-500 overflow-hidden">
		<Navbar :inline="true" :elements="value" />
	</div>

</template>
