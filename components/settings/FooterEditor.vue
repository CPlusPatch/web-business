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
</script>

<template>
	<div v-for="item in value" class="grid grid-cols-3">
		<Input :loading="isLoading" name="" :value="item.name" @input="
			updateValue(item.id, {
				name: ($event.target as HTMLInputElement).value,
			})
			" placeholder="Social Title" class="mt-2 w-full md:!w-96" />
		<Input :value="item.icon" :loading="isLoading" name="" placeholder="Social Icon" @input="
			updateValue(item.id, {
				icon: ($event.target as HTMLInputElement).value,
			})
			" class="mt-2 w-full md:!w-96" />
		<Input :value="item.href" :loading="isLoading" name="" placeholder="Social URL (relative)" @input="
			updateValue(item.id, {
				href: ($event.target as HTMLInputElement).value,
			})
			" class="mt-2 w-full md:!w-96" />
	</div>

	Preview:

	<Footer :author-first-name="settings.authorFirstName" :author-last-name="settings.authorLastName" :footer-socials="value" />
</template>
