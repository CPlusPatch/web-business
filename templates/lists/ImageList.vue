<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	imageMain?: string;
	textHeader?: string;
	textSecondary?: string;
	list?: {
		id: string;
		name: string;
		description: string;
		icon: string;
	}[];
}>();
</script>

<template>
	<PrimaryContainer class="flex flex-row items-center">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
			<div class="lg:pr-8">
				<div class="lg:max-w-lg">
					<h2
						data-placeholder="Example header"
						class="mt-2 mr-2 inline text-4xl font-bold text-gray-900 sm:text-6xl">
						{{ textHeader }}
					</h2>
					<p
						data-placeholder="Secondary text here to explain something"
						class="mt-6 text-lg leading-8 text-gray-600">
						{{ textSecondary }}
					</p>
					<div
						class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
						<div
							v-for="element of list"
							:key="element.id"
							class="relative pl-9 flex flex-row gap-2">
							<div class="grow">
								<div class="inline font-semibold text-gray-900">
									<Icon
										:name="
											element.icon === ''
												? 'tabler:dots'
												: element.icon
										"
										class="absolute left-1 top-1 h-5 w-5 text-orange-600"
										aria-hidden="true" />

									<span data-placeholder="Element name">{{
										element.name
									}}</span>
								</div>
								{{ " " }}
								<div
									class="inline"
									data-placeholder="Element description">
									{{ element.description }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nuxt-img
				alt="Product screenshot"
				:src="
					imageMain === '' ? 'https://placehold.co/1200' : imageMain
				"
				class="w-[48rem] max-w-none rounded-xl hidden md:block duration-500 shadow-xl ring-1 ring-gray-400/10 sm:w-[40rem] md:-ml-4 lg:-ml-0" />
		</div>
	</PrimaryContainer>
</template>
