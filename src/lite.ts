import type { ClassArray } from "./types.ts";

export function clsx(...inputs: ClassArray): string {
	let str = "";

	for (const tmp of inputs) {
		if (tmp) {
			if (typeof tmp === "string") {
				str += (str && " ") + tmp;
			}
		}
	}
	return str;
}

export default clsx;
