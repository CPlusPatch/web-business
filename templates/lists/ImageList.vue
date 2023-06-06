<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

const props = defineProps<{
	editable: boolean;
	imageMain: string;
	textHeader: string;
	textSecondary: string;
	list: {
		name: string;
		description: string;
		icon: string;
	}[];
}>();

const emit = defineEmits(["editField"]);

const sendChanges = (e: Event, index: number, fieldType: string) => {
	const newList = props.list;

	(newList[index] as any)[fieldType] = (
		e.target as HTMLSpanElement
	).innerText;

	emit("editField", newList, "list");
};
</script>

<template>
	<PrimaryContainer class="flex flex-row items-center">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
			<div class="lg:pr-8">
				<div class="lg:max-w-lg">
					<h2
						:contenteditable="editable"
						data-placeholder="Title"
						class="mt-2 mr-2 inline text-4xl font-bold text-gray-900 sm:text-6xl"
						@input="
							emit(
								'editField',
								($event.target as HTMLSpanElement).innerText,
								'text-header'
							)
						">
						{{ textHeader }}
					</h2>
					<p
						class="mt-6 text-lg leading-8 text-gray-600"
						:contenteditable="editable"
						data-placeholder="Secondary text here"
						@input="
							emit(
								'editField',
								($event.target as HTMLSpanElement).innerText,
								'text-secondary'
							)
						">
						{{ textSecondary }}
					</p>
					<dl
						class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
						<div
							v-for="(feature, index) in list"
							:key="feature.name"
							class="relative pl-9">
							<dt class="inline font-semibold text-gray-900">
								<Icon
									:name="feature.icon"
									class="absolute left-1 top-1 h-5 w-5 text-orange-600"
									aria-hidden="true" />

								<span
									:contenteditable="editable"
									data-placeholder="Bold header"
									@input="sendChanges($event, index, 'name')"
									>{{ feature.name }}</span
								>
							</dt>
							{{ " " }}
							<dd
								class="inline"
								:contenteditable="editable"
								data-placeholder="Secondary text"
								@input="
									sendChanges($event, index, 'description')
								">
								{{ feature.description }}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<nuxt-img
				alt="Product screenshot"
				:src="imageMain"
				class="w-[48rem] max-w-none rounded-xl hidden md:block duration-500 shadow-xl ring-1 ring-gray-400/10 sm:w-[40rem] md:-ml-4 lg:-ml-0" />
		</div>
	</PrimaryContainer>
</template>
