export type ClassValue =
	| ClassArray
	| ClassDictionary
	| string
	| number
	| bigint
	| null
	| boolean
	| undefined;
export type ClassDictionary = Record<string, unknown>;
export type ClassArray = ClassValue[];
