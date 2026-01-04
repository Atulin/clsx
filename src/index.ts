import type { ClassArray, ClassValue } from "./types.ts";

function toVal(mix: ClassValue): string {
	let str = "";

	if (typeof mix === "string" || typeof mix === "number") {
		str += mix;
	} else if (typeof mix === "object") {
		if (Array.isArray(mix)) {
			for (const value of mix) {
				if (value) {
					const y = toVal(value);
					if (y) {
						if (str) {
							str += " ";
						}
						str += y;
					}
				}
			}
		} else if (!mix) {
			return "";
		} else {
			for (const y in mix) {
				if (mix[y]) {
					if (str) {
						str += " ";
					}
					str += y;
				}
			}
		}
	}

	return str;
}

export function clsx(...inputs: ClassArray): string {
	let str = "";

	for (const tmp of inputs) {
		if (tmp) {
			const value = toVal(tmp);
			if (value) {
				if (str) {
					str += " ";
				}
				str += value;
			}
		}
	}
	return str;
}

export default clsx;
