import { reactive, watch } from "vue";

export interface StateType {
	theme: "light" | "dark";
}

let initialData: StateType = {
	theme: "light",
};

if (localStorage.getItem("store")) {
	initialData = JSON.parse(
		(localStorage.getItem("store") as any) ?? initialData
	);
}

export const store = reactive<StateType>(initialData);

watch(
	store,
	() => {
		localStorage.setItem("store", JSON.stringify(store));
	},
	{
		deep: true,
	}
);
