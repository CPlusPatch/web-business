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
</script>

<template>
	<div v-for="item in value">
		<label class="block text-sm leading-6 text-gray-900 font-semibold"
			>Navbar Element</label
		>
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
			class="mt-2 w-full md:!w-96" />
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
			class="mt-2 w-full md:!w-96" />
	</div>

	Preview:

	<Navbar :inline="true" :elements="value" />
</template>
