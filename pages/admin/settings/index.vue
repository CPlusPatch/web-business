<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";
import { UISetting, UISettingType } from "~/types/types";
import { Setting } from "~/db/entities/Setting";

const user = (await useFetch("/api/user/get")).data.value;
const token = useCookie("token");
const loading = ref(false);

definePageMeta({
	middleware: "auth",
})


const receivedSettings = (await useFetch<Setting>("/api/admin/settings")).data.value?.value ?? {};

const getValue = (name: string) => {
	return receivedSettings[name]
}

const infoSettings: UISetting[] = [
	{
		name: "logo",
		type: UISettingType.Image,
		title: "Site logo",
		text: "Your site's logo here",
		value: getValue("logo"),
	},
	{
		name: "siteName",
		type: UISettingType.Text,
		title: "Site name",
		value: getValue("siteName"),
		text: "",
		icon: "ic:round-drive-file-rename-outline",
	}
]

const categories = ref([
	{
		name: "Info",
		description: "Information about your website, like logos and description",
		settings: infoSettings,
	}
])

const saveSettings = async (newCategory: UISetting[], index: number) => {
	categories.value[index].settings = newCategory;

	const response = await useFetch("/api/admin/settings", {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token.value}`
		},
		body: categories.value.map(cat => {
			return cat.settings.map(setting => ({
				[setting.name]: setting.value
			})).reduce((previous, current) => ({
				...previous,
				...current
			}))
		}).reduce((previous, current) => ({
			...previous,
			...current
		}))
	})
}

</script>

<template>
	<PrimaryContainer class="mt-30">
		<form @submit.prevent="">
			<div class="space-y-12">
				<div v-for="(category, index) in categories" class="border-b border-gray-900/10 pb-12">
					<h2 class="text-xl font-bold leading-7 text-gray-900">
						{{ category.name }}
					</h2>
					<p class="mt-1 text-sm leading-6 text-gray-600">
						{{ category.description }}
					</p>

					<div class="mt-10 flex flex-col gap-8">
						<SettingsCategoryRenderer :category="category.settings" :is-loading="loading" @update="newCategory => saveSettings(newCategory, index)" />
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-x-2">
				<Button :loading="loading" type="submit" theme="orange" class="w-full md:w-auto">Save</Button>
			</div>
		</form>
	</PrimaryContainer>
</template>
