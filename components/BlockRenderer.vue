<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter } from "@codemirror/lint";
import Button from "./button/Button.vue";
import SlotEditorRenderer from "./SlotEditorRenderer.vue";
import { Block } from "~/db/entities/Block";
import { TemplateMetadata } from "~/types/types";

// import Button from "./button/Button.vue";
const props = defineProps<{
	block: Block;
	edit: boolean;
	isLast: boolean;
	isFirst: boolean;
}>();

const emit = defineEmits([
	"updateBlock",
	"addNewBlock",
	"deleteBlock",
	"moveBlockUp",
	"moveBlockDown",
]);

const _block = ref(props.block);

const code = ref("{}");

const importedComp = (
	await import(
		`~/templates/${props.block.category}/${props.block.component}.vue`
	)
).default;

const importedMeta = (
	await import(
		`~/templates/${props.block.category}/${props.block.component}.json`
	)
).default as TemplateMetadata;

const saveAll = () => {
	emit("updateBlock", _block.value);
	open.value = false;
};

const dialog = ref<HTMLDialogElement | null>(null);

const editTextDialog = (text: string): Promise<string | null> => {
	return new Promise(resolve => {
		if (!dialog.value) return;

		dialog.value.showModal();
		code.value = text;
		// dialog.value.getElementsByTagName("textarea")[0].value = text;

		dialog.value.addEventListener("close", () => {
			// Output the contents of the textarea, otherwise return null
			resolve(
				(dialog.value?.returnValue ?? null) === "submit"
					? code.value
					: null
			);
		});
	});
};

const editRawSlot = async () => {
	const result = await editTextDialog(JSON.stringify(props.block, null, 4));

	if (result) {
		emit("updateBlock", JSON.parse(result));
	}
};

const open = ref(false);

// const log = (...props: any[]) => console.log(...props);
</script>

<template>
	<div class="relative">
		<div
			v-if="edit"
			class="!absolute left-10 items-center inset-y-0 justify-center z-50 flex flex-col gap-2">
			<Button
				v-if="!isFirst"
				theme="gray"
				class="!px-2 !py-2 !shadow-md enabled:hover:translate-x-1"
				@click="$emit('moveBlockUp')">
				<Icon name="ic:round-keyboard-arrow-up" class="w-6 h-6" />
			</Button>
			<Button
				v-if="!isLast"
				theme="gray"
				class="!px-2 !py-2 !shadow-md enabled:hover:translate-x-1"
				@click="$emit('moveBlockDown')">
				<Icon name="ic:round-keyboard-arrow-down" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!text-red-600 !px-2 !py-2 !shadow-md hover:translate-x-1"
				@click="$emit('deleteBlock')">
				<Icon name="ic:round-delete" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md hover:translate-x-1"
				@click="$emit('addNewBlock')">
				<Icon name="ic:round-add-circle-outline" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md hover:translate-x-1"
				@click="editRawSlot">
				<Icon name="ic:round-code" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md hover:translate-x-1"
				@click="open = !open">
				<Icon name="ic:round-settings" class="w-6 h-6" />
			</Button>
		</div>
		<component :is="importedComp" v-bind="_block.slots" :editable="edit">
		</component>

		<HeadlessTransitionRoot v-if="edit" as="template" :show="open">
			<HeadlessDialog
				as="div"
				class="fixed inset-0 overflow-hidden z-100"
				@close="open = false">
				<div class="absolute inset-0 overflow-hidden">
					<div
						class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
						<HeadlessTransitionChild
							as="template"
							enter="transform transition ease-in-out duration-300"
							enter-from="translate-x-full"
							enter-to="translate-x-0"
							leave="transform transition ease-in-out duration-300"
							leave-from="translate-x-0"
							leave-to="translate-x-full">
							<div class="pointer-events-auto w-screen max-w-md">
								<form
									class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
									@submit.prevent>
									<div class="h-0 flex-1 overflow-y-auto">
										<div
											class="bg-orange-600 py-6 px-4 sm:px-6">
											<div
												class="flex items-center justify-between">
												<HeadlessDialogTitle
													class="text-lg font-medium text-white">
													Edit block
												</HeadlessDialogTitle>
												<div
													class="ml-3 flex h-7 items-center">
													<button
														type="button"
														class="rounded-md hover:text-white focus:outline-none text-gray-200 duration-200"
														@click="open = false">
														<span class="sr-only"
															>Close panel</span
														>
														<Icon
															name="ic:round-close"
															class="h-6 w-6"
															aria-hidden="true" />
													</button>
												</div>
											</div>
											<div class="mt-1">
												<p
													class="text-sm text-orange-100">
													Tweaks the settings of this
													block
												</p>
											</div>
										</div>
										<div
											class="flex flex-1 flex-col gap-4 justify-between p-4 sm:p-6">
											<SlotEditorRenderer
												:slots="_block.slots"
												:imported-meta="
													importedMeta.inputs
												"
												:defaults="
													importedMeta.defaults
												"
												@edit-slot="(slots: Block['slots']) => _block.slots = slots" />
										</div>
									</div>
									<div
										class="flex flex-shrink-0 justify-end px-4 py-4 gap-3">
										<Button
											theme="gray"
											type="button"
											@click="open = false">
											Cancel
										</Button>
										<Button
											theme="orange"
											type="submit"
											@click="saveAll">
											Save
										</Button>
									</div>
								</form>
							</div>
						</HeadlessTransitionChild>
					</div>
				</div>
			</HeadlessDialog>
		</HeadlessTransitionRoot>

		<dialog
			ref="dialog"
			class="open:backdrop:backdrop-blur-md open:opacity-100 opacity-0 duration-200 relative rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-3xl p-0">
			<form method="dialog" class="bg-white w-full">
				<div
					class="sm:flex sm:items-start px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
					<div
						class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
						<Icon
							class="h-6 w-6"
							name="ic:round-code"
							aria-hidden="true" />
					</div>
					<div
						class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left grow overflow-hidden">
						<h3
							class="text-base font-semibold leading-6 text-gray-900">
							Edit the raw text
						</h3>
						<div class="mt-1 max-w-full overflow-hidden">
							<codemirror
								v-model="code"
								placeholder="JSON code goes here..."
								:style="{
									height: '22rem',
								}"
								:indent-with-tab="true"
								:tab-size="4"
								:extensions="[
									json(),
									linter(jsonParseLinter()),
								]" />
							<!-- <textarea
								rows="14"
								name="text"
								class="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 w-full" /> -->
						</div>
					</div>
				</div>
				<div
					class="bg-gray-50 px-4 py-3 flex md:flex-row-reverse md:flex-row sm:px-6 gap-2 flex-col">
					<Button type="submit" value="submit" theme="orange">
						Submit
					</Button>
					<Button value="cancel" theme="gray" type="submit">
						Cancel
					</Button>
				</div>
			</form>
		</dialog>
	</div>
</template>
