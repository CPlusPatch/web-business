/**
 * Checks if an object is empty (= to {})
 * @param obj The object to check
 * @returns True if the object is {}
 */
export function isEmpty(obj: any): boolean {
	return JSON.stringify(obj) === "{}" || JSON.stringify(obj) === "[]";
}

/**
 * Joins two sets of classNames with a space
 * @param classes Classes to join
 * @returns Joined classes
 */
export function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}