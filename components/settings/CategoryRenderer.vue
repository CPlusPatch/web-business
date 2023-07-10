<script setup lang="ts">
import { arrayBufferToWebP } from 'webp-converter-browser';
import { UISetting, UISettingType } from '~/types/types';

const props = defineProps<{
	category: UISetting[];
	isLoading: boolean;
}>();

const emit = defineEmits<{
	(event: "update", category: typeof props.category): any
}>();

const isUploading = ref(false);

const token = useCookie("token");

const update = (name: string, value: string) => {
	const updatedCategory = props.category.map(s => s.name === name ? {
		...s,
		value,
	} : s);

	emit("update", updatedCategory);
}

const clickFileInput = (setting: any) => {
	(document.querySelector(`input[name=${setting.name}]`) as HTMLInputElement)
		.click();
}

const uploadFile = async (e: Event, setting: UISetting) => {
	const target = e.target as HTMLInputElement;

	if (!target.files?.length) return false;

	isUploading.value = true;

	// Dont convert WebP and SVG files to WebP automatically
	const file: File = target.files[0].type.includes("webp") || target.files[0].type.includes("svg")
		? target.files[0]
		: new File(
			[await arrayBufferToWebP(await target.files[0].arrayBuffer())],
			target.files[0].name.split(".").slice(0, -1).join(".") + ".webp"
		);

	const formData = new FormData();
	formData.append("file", file);

	fetch("/api/media/upload", {
		method: "POST",
		body: formData,
		headers: {
			Authorization: `Bearer ${token.value}`,
		},
	})
		.then(async res => {
			if (res.ok) {
				update(setting.name, await res.text())
			}
		})
		.finally(() => {
			isUploading.value = false;
		});
}
</script>

<template>
	<div v-for="setting in category" :key="setting.name">
		<div v-if="setting.type === UISettingType.Text" class="sm:col-span-4">
			<label :for="setting.name" class="block text-sm font-medium leading-6 text-gray-900 font-semibold">{{ setting.title }}</label>
			<Input @change="update(setting.name, ($event.target as HTMLInputElement).value)" :value="setting.value" :loading="isLoading" :name="setting.name"
				:icon="setting.icon" placeholder="Text input"
				class="mt-2 w-full md:!w-96" />
			<div class="text-xs mt-1 text-gray-500">{{ setting.text }}</div>
		</div>
		<div v-if="setting.type === UISettingType.Image" class="col-span-full">
			<label :for="setting.name" class="block text-sm font-medium leading-6 text-gray-900 font-semibold">{{ setting.title }}</label>
			<div class="mt-2 ring-1 ring-gray-200 flex items-center gap-x-3 relative h-15 w-15 rounded overflow-hidden group">
				<input accept="image/*" @change="uploadFile($event, setting)" type="file" :name="setting.name" class="hidden" />
				<div @click="!isUploading && clickFileInput(setting)" class="absolute inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm text-gray-800 group-hover:opacity-100 opacity-0 flex duration-200 items-center justify-center">
					<Icon name="ic:round-upload" class="w-8 h-8" />
				</div>
				<div v-if="isUploading" class="absolute inset-0 bg-gray-500 text-gray-800 flex duration-200 items-center justify-center">
					<Spinner theme="gray" class="w-6 h-6" />
				</div>
				<img :src="setting.value" class="h-full w-full object-cover" aria-hidden="true" />
			</div>
			<div class="text-xs mt-1 text-gray-500">{{ setting.text }}</div>
		</div>
	</div>
</template>