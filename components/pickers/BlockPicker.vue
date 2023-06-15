<script setup lang="ts">
import { TemplateMetadata } from "~/types/types";
import { generateIds } from "~/utils/utils";

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
	<div class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full grow">
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
						selectedComponent === component
							? 'orange'
							: 'orangeLight'
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
			<div class="h-full grow p-10">
				<Transition
					mode="out-in"
					enter-from-class="opacity-0 sm:scale-95"
					enter-to-class="opacity-100 sm:scale-100"
					enter-active-class="ease-out duration-100"
					leave-active-class="ease-in duration-100"
					leave-from-class="opacity-100 sm:scale-100"
					leave-to-class="opacity-0 sm:scale-95">
					<component
						:is="importedComponent"
						v-bind="
							selectedComponent.defaults
								? generateIds(selectedComponent.defaults)
								: Object.fromEntries(
										Object.entries(
											selectedComponent.inputs
										).map(obj => [obj[0], null])
								  )
						"
						:editable="false"></component>
				</Transition>
			</div>
		</div>
	</div>
	<div
		class="bg-gray-50 px-4 py-3 flex md:flex-row-reverse md:flex-row sm:px-6 gap-2 flex-col">
		<Button theme="gray" type="submit"> Cancel </Button>
		<Button
			theme="orange"
			type="submit"
			:value="JSON.stringify(selectedComponent)">
			Confirm
		</Button>
	</div>
</template>
