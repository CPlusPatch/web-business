<script setup lang="ts">
import PrimaryContainer from "~/components/layout/PrimaryContainer.vue";

defineProps<{
	editable: boolean;
	textHeader?: string;
	list?: {
		id: string;
		question: string;
		answer: string;
	}[];
}>();
</script>

<template>
	<PrimaryContainer>
		<div class="mx-auto max-w-3xl flex flex-col gap-y-10">
			<h2
				data-placeholder="Header"
				class="text-3xl inline mx-auto font-extrabold text-center text-gray-900 dark:text-gray-200 sm:text-4xl font-poppins">
				{{ textHeader }}
			</h2>
			<div class="gap-y-3 flex flex-col">
				<HeadlessDisclosure
					v-for="element of list"
					:key="element.id"
					v-slot="{ open }"
					class="flex flex-row"
					as="div">
					<div class="mx-3 py-4 space-y-3 grow border-b">
						<div class="text-lg font-poppins">
							<HeadlessDisclosureButton
								class="flex justify-between items-start w-full text-left text-gray-400 font-inter">
								<span
									data-placeholder="Element title here"
									class="font-medium text-gray-900 dark:text-gray-300">
									{{ element.question }}
								</span>
								<span class="flex items-center ml-6 h-7">
									<Icon
										name="tabler:chevron-down"
										:class="[
											open ? '-rotate-180' : 'rotate-0',
											'w-6 h-6 duration-300 ease-in-out transform',
										]"
										aria-hidden="true" />
								</span>
							</HeadlessDisclosureButton>
						</div>
						<transition
							enter-active-class="transition duration-100 ease-in"
							enter-from-class="transform scale-95 opacity-0"
							enter-to-class="transform scale-100 opacity-100"
							leave-active-class="transition duration-75 ease-out"
							leave-from-class="transform scale-100 opacity-100"
							leave-to-class="transform scale-95 opacity-0">
							<HeadlessDisclosurePanel>
								<div class="pr-12 mt-2">
									<p
										data-placeholder="Element to reveal here"
										class="text-base text-gray-600 whitespace-pre-line font-inter">
										{{ element.answer }}
									</p>
								</div>
							</HeadlessDisclosurePanel>
						</transition>
					</div>
				</HeadlessDisclosure>
			</div>
		</div>
	</PrimaryContainer>
</template>
