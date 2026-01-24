import type { DistinctArray as DA, ReadonlyDistinctArray } from "./interfaces";
export { ReadonlyDistinctArray } from "./interfaces";

import { createDistinctArray } from "./implementation";

export type DistinctArray<T extends defined> = DA<T>;

export const DistinctArray = {
    create<T extends defined>(): DistinctArray<T> {
        return createDistinctArray<T>();
    },

    fromArray<T extends defined>(array: T[]): DistinctArray<T> {
        const distinctArray = createDistinctArray<T>();
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
