import type { DistinctArray as DA, ReadonlyDistinctArray } from "./interfaces";
export { ReadonlyDistinctArray } from "./interfaces";

import { createDistinctArray } from "./implementation";

export type DistinctArray<T extends defined> = DA<T>;

export const DistinctArray = {
	create<T extends defined, K = T>(keyMapper?: (value: T) => K): DistinctArray<T> {
		return createDistinctArray<T, K>(keyMapper);
	},

	fromArray<T extends defined, K = T>(array: T[], keyMapper?: (value: T) => K): DistinctArray<T> {
		const distinctArray = createDistinctArray<T, K>(keyMapper);
		for (const value of array) {
			distinctArray.push(value);
		}
		return distinctArray;
	},

    fromSet<T extends defined>(set: Set<T>): DistinctArray<T> {
        const distinctArray = createDistinctArray<T>();
		for (const value of set) {
			distinctArray.push(value);
		}
		return distinctArray;
	},
};
