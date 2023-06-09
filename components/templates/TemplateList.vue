<script setup lang="ts">
const props = defineProps<{
	list: Array<any>;
	keyName: string;
	fieldName: string;
}>();

const _list = ref(props.list);

const emit = defineEmits(["editField"]);

// Pass "null" for newValue to send no changes
const update = (newValue: any, index: number, fieldType: string) => {
	const newList = _list.value;

	if (newValue === null) return;

	(newList[index] as any)[fieldType] = newValue;

	emit("editField", newList, props.fieldName);
};

const moveUp = (index: number) => {
	if (index === 0) return;
	const tempList = _list.value;
	const temp = tempList[index];
	tempList[index] = tempList[index - 1];
	tempList[index - 1] = temp;

	_list.value = tempList;
	emit("editField", tempList, props.fieldName);
};

const moveDown = (index: number) => {
	if (index === _list.value.length - 1) return;
	const tempList = _list.value;
	const temp = tempList[index];
	tempList[index] = tempList[index + 1];
	tempList[index + 1] = temp;

	_list.value = tempList;
	emit("editField", tempList, props.fieldName);
};

const addItem = (index: number, emptyItem: any) => {
	_list.value = [
		..._list.value.slice(0, index + 1),
		emptyItem,
		..._list.value.splice(index + 1),
	];
	emit("editField", _list.value, props.fieldName);
};

const deleteItem = (index: number) => {
	_list.value = [
		..._list.value.slice(0, index),
		..._list.value.splice(index + 1),
	];
	emit("editField", _list.value, props.fieldName);
};
</script>

<template>
	<TransitionGroup name="block-list-2">
		<slot
			v-for="(item, index) in _list"
			:key="item[keyName]"
			:element="item"
			:index="index"
			:update="update"
			:move-up="moveUp"
			:move-down="moveDown"
			:delete-item="deleteItem"
			:add="addItem"></slot>
	</TransitionGroup>
</template>
<style>
.block-list-2-move {
	transition: transform 0.2s ease-in-out;
}
</style>
