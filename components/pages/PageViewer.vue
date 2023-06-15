<script setup lang="ts">
import { nanoid } from "nanoid";
import { Block } from "~/db/entities/Block";
import BlockRenderer from "~/components/BlockRenderer.vue";
import { Page } from "~/db/entities/Page";

const props = defineProps<{
	page: Page;
}>();

const token = useCookie("token");

const loading = ref(false);

const data = ref(
	(await useFetch(`/api/blocks/${props.page.id}`)).data.value
) as Ref<Block[] | null>;

if (!data.value) {
	throw createError("No blocks returned!");
}

const valueToUpdate = ref(nanoid());

const isAdmin = (await useFetch("/api/user/admin")).data.value;

const blockMeta = isAdmin
	? (
			await useFetch(`/api/blocks/meta`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token.value}`,
				},
			})
	  ).data.value ?? []
	: [];

const blockChooseDialog = ref<HTMLDialogElement | null>(null);

const saveAll = async () => {
	if (!data.value) return false;

	await useFetch(`/api/blocks/${props.page.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify(data.value),
	});
};

const moveBlockUp = (index: number) => {
	if (!data.value) return false;
	if (index === 0) return false;

	const temp = data.value[index];
	data.value[index] = data.value[index - 1];
	data.value[index - 1] = temp;

	// Recalculate indexes
	data.value = data.value.map((d, index) => ({
		...d,
		index,
	}));

	saveAll();
};

const moveBlockDown = (index: number) => {
	if (!data.value) return false;
	if (index === data.value.length - 1) return false;

	const temp = data.value[index];
	data.value[index] = data.value[index + 1];
	data.value[index + 1] = temp;

	// Recalculate indexes
	data.value = data.value.map((d, index) => ({
		...d,
		index,
	}));

	saveAll();
};

const addNewBlock = async (index: number) => {
	if (!data.value) return false;

	const block = await chooseBlockDialog();

	if (!block) {
		return console.log("User cancelled dialog");
	}

	const blockResult = await useFetch(`/api/blocks/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			category: block.category,
			component: block.component,
			index: index + 1,
			page_id: props.page.id,
		}),
	});

	if (!blockResult.data.value) return;

	data.value = data.value.map(d =>
		d.index >= index
			? {
					...d,
					index: d.index + 1,
			  }
			: d
	);

	data.value = [
		// part of the array before the specified index
		...data.value.slice(0, index + 1),
		// inserted item
		blockResult.data.value as unknown as Block,
		// part of the array after the specified index
		...data.value.slice(index),
	];

	// Recalculate indexes
	data.value = data.value.map((d, index) => ({
		...d,
		index,
	}));
};

const deleteBlock = async (index: number) => {
	if (!data.value) return false;

	const block = await useFetch(`/api/blocks/${data.value[index].id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
	});

	if (!block.data.value) return;

	data.value = [
		...data.value.slice(0, index),
		...data.value.slice(index + 1),
	];
};

const chooseBlockDialog = (): Promise<{
	component: string;
	category: string;
} | null> => {
	return new Promise(resolve => {
		if (!blockChooseDialog.value) return;

		blockChooseDialog.value.showModal();

		blockChooseDialog.value.addEventListener("close", () => {
			try {
				resolve({
					component: JSON.parse(
						blockChooseDialog.value?.returnValue ?? ""
					).name,
					category: JSON.parse(
						blockChooseDialog.value?.returnValue ?? ""
					).category,
				});
			} catch {
				resolve(null);
			}
		});
	});
};

const updateBlock = (newBlock: Block, index: number) => {
	if (!data.value) return;
	data.value.splice(index, 1, newBlock);
	saveAll();
};
</script>

<template>
	<div
		v-if="data?.length === 0"
		class="mt-40 max-w-7xl mx-auto w-full flex items-center justify-center flex-col gap-4 grow">
		<h1 class="font-mono text-8xl">/{{ props.page.path }}</h1>
		<Button
			theme="orange"
			:loading="loading"
			@click="
				async () => {
					loading = true;
					await addNewBlock(0);
					loading = false;
				}
			"
			>Add new block</Button
		>
	</div>
	<div class="w-full h-40"></div>
	<TransitionGroup
		:key="valueToUpdate"
		tag="div"
		name="block-list"
		class="flex flex-col gap-30">
		<BlockRenderer
			v-for="(block, index) in data"
			:key="block.id"
			:block="block"
			:edit="isAdmin ?? false"
			:is-last="index === (data?.length ?? 0) - 1"
			:is-first="index === 0"
			@move-block-down="moveBlockDown(index)"
			@move-block-up="moveBlockUp(index)"
			@delete-block="deleteBlock(index)"
			@add-new-block="addNewBlock(index)"
			@update-block="(newBlock: Block) => updateBlock(newBlock, index)" />
	</TransitionGroup>

	<dialog
		v-if="isAdmin"
		ref="blockChooseDialog"
		class="open:backdrop:backdrop-blur-md open:opacity-100 opacity-0 duration-200 relative rounded-lg bg-white text-left shadow-xl transition-all w-full h-full p-0">
		<form
			method="dialog"
			class="bg-white w-full flex flex-col justify-between h-full">
			<PickersBlockPicker :block-meta="blockMeta" />
		</form>
	</dialog>
</template>

<style scoped>
.block-list-move {
	transition: transform 0.2s ease-in-out;
}
</style>
