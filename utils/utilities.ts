import { nanoid } from "nanoid";
import { Setting } from "~/db/entities/Setting";

export interface AnyObject {
	[key: string]: any;
}

export function generateIds(obj: AnyObject): AnyObject {
	if (Array.isArray(obj)) {
		return obj.map(item => generateIds(item));
	}

	const newObj: AnyObject = {};

	for (const key in obj) {
		if (typeof obj[key] === "object" && obj[key] !== null) {
			newObj[key] = generateIds(obj[key]);
		} else if (obj[key] === "#ID#") {
			newObj[key] = nanoid();
		} else {
			newObj[key] = obj[key];
		}
	}

	return newObj;
}

export const getSettings = async () => (await useFetch<Setting>("/api/admin/settings")).data.value?.value ?? {}
