<script setup lang="ts">
import { TemplateMetadata } from "~/types/types";

const props = defineProps<{
	blockMeta: TemplateMetadata[];
}>();

// Get array of categories and deduplicate
const categories = [...new Set(props.blockMeta.map(m => m.category))];

const selectedCategory = ref(categories[0]);
const selectedComponent = ref(
	props.blockMeta.filter(m => m.category === selectedCategory.value)[0]
);

const importedComponent = shallowRef(
	(
		await import(
			`../../templates/${selectedComponent.value.category}/${selectedComponent.value.name}.vue`
		)
	).default
);

watch(
	() => selectedCategory.value,
	() => {
		selectedComponent.value = props.blockMeta.filter(
			m => m.category === selectedCategory.value
		)[0];
	}
);

watch(
	() => selectedComponent.value,
	async () => {
		importedComponent.value = (
			await import(
				`../../templates/${selectedComponent.value.category}/${selectedComponent.value.name}.vue`
			)
		).default;
	}
);
</script>

<template>
	<!-- <div v-for="category of categories" :key="category">
		<div
			v-for="component of blockMeta.filter(m => m.category === category)"
			:key="component.name">
			{{ component.category }}
			{{ component.name }}
			<Button
				theme="gray"
				type="submit"
				:value="JSON.stringify(component)"
				>Add new</Button
			>
		</div>
	</div> -->
	<div class="flex flex-row w-full ring-2 ring-gray-200 justify-between">
		<Button
			v-for="category of categories"
			:key="category"
			class="outline-none hover:!bg-gray-200 focus:outline-none w-full !rounded-none !ring-none"
			theme="gray"
			@click="selectedCategory = category"
			>{{ category }}</Button
		>
	</div>
	<div
		class="w-full flex flex-row divide-x-2 h-80 ring-2 ring-gray-200 py-1 h-full grow">
		<div class="w-70 h-full">
			<Button
				v-for="component of blockMeta.filter(
					m => m.category === selectedCategory
				)"
				:key="component.name"
				class="outline-none !items-start flex-col focus:outline-none w-full !rounded-none !ring-none"
				:theme="
					selectedComponent === component ? 'orange' : 'orangeLight'
				"
				@click="selectedComponent = component"
				><div>
					<Icon name="ic:round-widgets" class="mr-2" />{{
						component.displayName
					}}
				</div>
				{{ component.description }}
			</Button>
		</div>
		<div class="h-full grow">
			<component :is="importedComponent" :editable="false"></component>
		</div>
	</div>
</template>
