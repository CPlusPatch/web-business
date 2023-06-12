<script setup lang="ts">
import { Block } from "~/db/entities/Block";
import BlockRenderer from "~/components/BlockRenderer.vue";

useServerSeoMeta({
	title: "CPlusPatch",
	ogTitle: "Website for CPlusPatch, aka Gaspard Wierzbinski",
	description: "My blog, about me and how you can contact me!",
	ogDescription: "My blog, about me and how you can contact me!",
	ogImage: "/static/servers.webp",
	twitterCard: "summary_large_image",
	author: "Gaspard Wierzbinski",
});

const token = useCookie("token");

const pageId = 1;
const data = (await useFetch(`/api/blocks/${pageId}`)).data as Ref<
	Block[] | null
>;

if (!data.value) {
	throw createError("No blocks returned!");
}

const blockMeta =
	(
		await useFetch(`/api/blocks/meta`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token.value}`,
			},
		})
	).data.value ?? [];

const isAdmin = (await useFetch("/api/user/admin")).data.value;

const blockChooseDialog = ref<HTMLDialogElement | null>(null);

const saveAll = async () => {
	if (!data.value) return false;

	await useFetch(`/api/blocks/1`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify(data.value),
	});

	// if (result.data.value) data.value = result.data.value as unknown as Block[];
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

	const { category, component } = await chooseBlockDialog();

	const block = await useFetch(`/api/blocks/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			category,
			component,
			index: index + 1,
			page_id: pageId,
		}),
	});

	if (!block.data.value) return;

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
		...data.value.slice(0, index),
		// inserted item
		block.data.value as unknown as Block,
		// part of the array after the specified index
		...data.value.slice(index),
	];

	console.log(data.value);

	// Recalculate indexes
	data.value = data.value.map((d, index) => ({
		...d,
		index,
	}));
};

const createNewPage = async () => {
	const page = await useFetch(`/api/pages/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: JSON.stringify({
			path: "",
		}),
	});

	console.log(page.data.value);
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
}> => {
	return new Promise(resolve => {
		if (!blockChooseDialog.value) return;

		blockChooseDialog.value.showModal();

		blockChooseDialog.value.addEventListener("close", () => {
			resolve({
				component: JSON.parse(
					blockChooseDialog.value?.returnValue ?? ""
				).name,
				category: JSON.parse(blockChooseDialog.value?.returnValue ?? "")
					.category,
			});
		});
	});
};
</script>

<template>
	<div v-if="data?.length === 0" class="mt-40">
		No posts yet!
		<Button v-if="isAdmin ?? false" theme="orange" @click="createNewPage"
			>Create new page</Button
		>
	</div>
	<TransitionGroup name="block-list">
		<BlockRenderer
			v-for="block in data?.sort((a, b) => a.index - b.index)"
			:key="block.id"
			:block="block"
			:edit="isAdmin ?? false"
			:is-last="block.index === (data?.length ?? 0) - 1"
			:is-first="block.index === 0"
			@move-block-down="moveBlockDown(block.index)"
			@move-block-up="moveBlockUp(block.index)"
			@delete-block="deleteBlock(block.index)"
			@add-new-block="addNewBlock(block.index)"
			@update-block="(newBlock: Block) => { data![newBlock.index] = newBlock; saveAll() }" />
	</TransitionGroup>

	<dialog
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
