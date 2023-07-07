<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";
import { Setting, SettingType } from "~/types/types";

const user = (await useFetch("/api/user/get")).data.value;
const token = useCookie("token");
const loading = ref(false);

const infoSettings: Setting[] = [
	{
		id: "yZkEOijkF3Z-A1sn8MfuS",
		name: "logo",
		type: SettingType.Image,
		title: "Site logo",
		text: "Your site's logo here",
		value: "http://localhost:3000/_ipx/_/images/icons/logo.svg",
	},
	{
		id: "sSDRSf-Ou_nBjw3ooqmAg",
		name: "siteName",
		type: SettingType.Text,
		title: "Site name",
		value: "",
		text: "",
		icon: "ic:round-drive-file-rename-outline",
	}
]

const categories = ref<{
	[key: string]: Setting[],
}>({
	info: infoSettings
})

const saveSettings = (newCategory: Setting[], name: string | number) => {
	categories.value[name] = newCategory;
}

</script>

<template>
	<PrimaryContainer class="mt-20">
		<form @submit.prevent="">
			<div class="space-y-12">
				<div v-for="(category, name) in categories" class="border-b border-gray-900/10 pb-12">
					<h2 class="text-xl font-bold leading-7 text-gray-900">
						Profile
					</h2>
					<p class="mt-1 text-sm leading-6 text-gray-600">
						Fill out your profile and personal details here!
					</p>

					<div class="mt-10 flex flex-col gap-8">
						<SettingsCategoryRenderer :category="category" :is-loading="loading" @update="newCategory => saveSettings(newCategory, name)" />
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-x-2">
				<Button :loading="loading" type="submit" theme="orange" class="w-full md:w-auto">Save</Button>
			</div>
		</form>
	</PrimaryContainer>
</template>
