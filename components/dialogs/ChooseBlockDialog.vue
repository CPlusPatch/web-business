<script setup lang="ts">
import { TemplateMetadata } from 'types/types';

defineProps<{
	blockMeta: TemplateMetadata[];
}>()
</script>

<script lang="ts">
const show = ref(false);

let resolvePromise: any = () => {};

export const chooseBlockDialog = (): Promise<{
	component: string;
	category: string;
} | null> => {
	return new Promise(resolve => {
		show.value = true;

		resolvePromise = (event: SubmitEvent) => {
			event.preventDefault();
			const value = JSON.parse(((event.target as any).value as HTMLInputElement).value);

			try {
				resolve({
					component: value.name,
					category: value.category,
				});
			} catch {
				resolve(null);
			} finally {
				show.value = false;
			}
		};
	});
};
</script>
<template>
	<HeadlessTransitionRoot as="template" :show="show" v-if="show">
			<HeadlessDialog as="div" class="relative z-70" @close="show = false">
				<HeadlessTransitionChild
					as="template"
					enter="ease-out duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="ease-in duration-200"
					leave-from="opacity-100"
					leave-to="opacity-0">
					<div
						class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</HeadlessTransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div
						class="flex min-h-full p-4 w-full items-end justify-center text-center sm:items-center">
						<HeadlessTransitionChild
							as="template"
							enter="ease-out duration-300"
							enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enter-to="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leave-from="opacity-100 translate-y-0 sm:scale-100"
							leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<HeadlessDialogPanel
								class="w-full min-h-full rounded-lg overflow-hidden bg-white text-left shadow-xl transition-all">
								<form @submit="resolvePromise">
									<PickersBlockPicker :block-meta="blockMeta" />
	
									<div
										class="bg-gray-50 px-4 py-3 flex md:flex-row md:justify-end sm:px-6 gap-2 flex-col">
										<Button theme="gray" @click="show = false"> Cancel </Button>
										<Button
											theme="orange"
											type="submit">
											Confirm
										</Button>
									</div>
								</form>
							</HeadlessDialogPanel>
						</HeadlessTransitionChild>
					</div>
				</div>
			</HeadlessDialog>
		</HeadlessTransitionRoot>
</template>