<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter } from "@codemirror/lint";
import { Block } from "~/db/entities/Block";

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

const code = ref("{}");

const importedComp = (
	await import(
		`~/templates/${props.block.category}/${props.block.component}.vue`
	)
).default;

const editSlot = (value: string, slot: any) => {
	emit("updateBlock", {
		...props.block,
		slots: props.block.slots.map(s =>
			s.name === slot
				? {
						name: slot,
						value,
				  }
				: s
		),
	});
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

const passedProps: {
	[name: string]: string | undefined;
} = {};

props.block.slots.forEach(s => {
	passedProps[s.name] = s.value;
});
</script>

<template>
	<div class="relative">
		<div
			v-if="edit"
			class="!absolute left-10 items-center inset-y-0 justify-center z-50 flex flex-col gap-2">
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md enabled:hover:translate-x-1"
				:disabled="isFirst"
				@click="$emit('moveBlockUp')">
				<Icon name="ic:round-keyboard-arrow-up" class="w-6 h-6" />
			</Button>
			<Button
				theme="gray"
				class="!px-2 !py-2 !shadow-md enabled:hover:translate-x-1"
				:disabled="isLast"
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
		</div>
		<component
			:is="importedComp"
			v-bind="passedProps"
			:editable="edit"
			@edit-field="editSlot">
		</component>

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
