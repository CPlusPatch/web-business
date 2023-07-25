import { nanoid } from "nanoid";
import { arrayBufferToWebP } from "webp-converter-browser";
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

export const getSettings = async () =>
	(await useFetch<Setting>("/api/admin/settings")).data.value?.value ?? {};


export const uploadFile = async (e: Event, token: string, setLoading: (loading: boolean) => void) => {
	return new Promise(async (resolve, reject) => {
		const target = e.target as HTMLInputElement;

		if (!target.files?.length) return false;

		setLoading(true);

		// Dont convert WebP and SVG files to WebP automatically
		const file: File =
			target.files[0].type.includes("webp") ||
			target.files[0].type.includes("svg")
				? target.files[0]
				: new File(
						[
							await arrayBufferToWebP(
								await target.files[0].arrayBuffer()
							),
						],
						target.files[0].name.split(".").slice(0, -1).join(".") +
							".webp"
				  );

		const formData = new FormData();
		formData.append("file", file);

		fetch("/api/media/upload", {
			method: "POST",
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(async res => {
				if (res.ok) {
					setLoading(false);
					resolve(await res.text())
				}
			})
			.catch(err => {
				setLoading(false);
				reject(err)
			});
	});
};