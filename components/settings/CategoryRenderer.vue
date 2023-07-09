<script setup lang="ts">
import { UISetting, UISettingType } from '~/types/types';

const props = defineProps<{
	category: UISetting[];
	isLoading: boolean;
}>();

const emit = defineEmits<{
	(event: "update", category: typeof props.category): any
}>();

const update = (name: string, value: string) => {
	const updatedCategory = props.category.map(s => s.name === name ? {
		...s,
		value,
	} : s);

	emit("update", updatedCategory);
}

const clickFileInput = (setting: any) => {
	(document.querySelector(`input[name=${setting.name}]`) as HTMLInputElement).click();
}
</script>

<template>
	<div v-for="setting in category" :key="setting.name">
		<div v-if="setting.type === UISettingType.Text" class="sm:col-span-4">
			<label :for="setting.name" class="block text-sm font-medium leading-6 text-gray-900 font-semibold">{{ setting.title }}</label>
			<Input @change="update(setting.name, ($event.target as HTMLInputElement).value)" :value="setting.value" :loading="isLoading" :name="setting.name"
				:icon="setting.icon" placeholder="Text input"
				class="mt-2 w-full md:!w-96" />
		</div>
		<div v-if="setting.type === UISettingType.Image" class="col-span-full">
			<label :for="setting.name" class="block text-sm font-medium leading-6 text-gray-900 font-semibold">{{ setting.title }}</label>
			<div class="mt-2 flex items-center gap-x-3 relative h-15 w-15 rounded overflow-hidden group">
				<input type="file" :name="setting.name" class="hidden" />
				<div @click="clickFileInput(setting)" class="absolute inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm text-gray-800 group-hover:opacity-100 opacity-0 flex duration-200 items-center justify-center">
					<Icon name="ic:round-upload" class="w-8 h-8" />
				</div>
				<img :src="setting.value" class="h-full w-full object-cover" aria-hidden="true" />
			</div>
		</div>
	</div>
</template>