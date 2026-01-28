import { DistinctArray } from "./interfaces";

export function createDistinctArray<T extends defined, K = T>(keyMapper?: (value: T) => K): DistinctArray<T> {
	const values: T[] = [];
	const valuesToIndices = new Map<K, number>();

	const getKey = (value: T): K => (keyMapper ? keyMapper(value) : (value as unknown as K));

	const metatable = {} as unknown as { [key: string]: Callback };

	metatable["__newindex"] = (_self: unknown, index: number, value: T) => {
		if (!typeIs(index, "number")) {
			throw "Index must be a number";
		}

		if (index < 0 || index > values.size()) {
			throw "Index out of bounds";
		}

		const key = getKey(value);
		if (valuesToIndices.has(key) && valuesToIndices.get(key) !== index) {
			throw "Value already exists in array";
		}

		if (index === values.size()) {
			values.push(value);
			valuesToIndices.set(key, index);
		} else {
			const oldValue = values[index];
			valuesToIndices.delete(getKey(oldValue));
			values[index] = value;
			valuesToIndices.set(key, index);
		}
	};

	metatable["__index"] = (_self: unknown, index: number) => {
		if (!typeIs(index, "number")) {
			throw "Index must be a number";
		}

		if (index < 0 || index >= values.size()) {
			throw "Index out of bounds";
		}

		return values[index];
	};

	const remove = (index: number): T | undefined => {
		if (index < 0 || index >= values.size()) {
			return undefined;
		}

		const value = values.remove(index)!;
		valuesToIndices.delete(getKey(value));

		for (let i = index; i < values.size(); i++) {
			valuesToIndices.set(getKey(values[i]), i);
		}

		return value;
	};

	const unorderedRemove = (index: number): T | undefined => {
		if (index < 0 || index >= values.size()) {
			return undefined;
		}

		const value = values[index];

		if (index === values.size() - 1) {
			// Removing the last element
			values.pop();
			valuesToIndices.delete(getKey(value));
		} else {
			// Replace with last element and pop
			const lastValue = values.pop()!;
			values[index] = lastValue;
			valuesToIndices.set(getKey(lastValue), index);
			valuesToIndices.delete(getKey(value));
		}

		return value;
	};

	const methodsObject = {
		every(callback: (value: T, index: number, array: readonly T[]) => boolean | undefined): boolean {
			return values.every(callback);
		},

		filter(callback: (value: T, index: number, array: readonly T[]) => boolean | undefined): T[] {
			return values.filter(callback);
		},

		find(predicate: (value: T, index: number, obj: readonly T[]) => boolean | undefined): T | undefined {
			return values.find(predicate);
		},

		findIndex(predicate: (value: T, index: number, obj: readonly T[]) => boolean | undefined): number {
			return values.findIndex(predicate);
		},

		forEach(callback: (value: T, index: number, array: readonly T[]) => void): void {
			return values.forEach(callback);
		},

		has(value: T): boolean {
			return valuesToIndices.has(getKey(value));
		},

		includes(searchElement: T, fromIndex?: number): boolean {
			const indexOfValue = valuesToIndices.get(getKey(searchElement));
			if (indexOfValue === undefined) {
				return false;
			}

			if (fromIndex !== undefined && indexOfValue < fromIndex) {
				return false;
			}

			return true;
		},

		indexOf(searchElement: T, fromIndex?: number): number {
			const index = valuesToIndices.get(getKey(searchElement));

			if (index === undefined) {
				return -1;
			}

			if (fromIndex !== undefined && index < fromIndex) {
				return -1;
			}

			return index;
		},

		map<U>(callback: (value: T, index: number, array: readonly T[]) => U): U[] {
			return values.map(callback);
		},

		mapFiltered<U>(callback: (value: T, index: number, array: readonly T[]) => U): NonNullable<U>[] {
			return values.mapFiltered(callback);
		},

		some(callback: (value: T, index: number, array: readonly T[]) => boolean | undefined): boolean {
			return values.some(callback);
		},

		size(): number {
			return values.size();
		},

		reduce<U>(
			callback: (accumulator: U, currentValue: T, currentIndex: number, array: readonly T[]) => U,
			initialValue: U,
		): U {
			return values.reduce(callback, initialValue);
		},

		// write methods

		clear(): void {
			values.clear();
			valuesToIndices.clear();
		},

		delete(value: T): void {
			const key = getKey(value);
			if (!valuesToIndices.has(key)) {
				return;
			}

			const index = valuesToIndices.get(key)!;
			remove(index);
		},

		insert(index: number, value: T): void {
			if (index < 0 || index > values.size()) {
				throw "Index out of bounds";
			}

			const key = getKey(value);
			const existingIndex = valuesToIndices.get(key);
			if (existingIndex !== undefined && existingIndex !== index) {
				throw "Value already exists in array";
			}

			values.insert(index, value);
			valuesToIndices.set(key, index);

			for (let i = index + 1; i < values.size(); i++) {
				valuesToIndices.set(getKey(values[i]), i);
			}
		},

		pop(): T | undefined {
			const value = values.pop();

			if (value !== undefined) {
				valuesToIndices.delete(getKey(value));
			}

			return value;
		},

		push(...items: T[]): number {
			let nextIndex = values.size();

			for (const item of items) {
				const key = getKey(item);
				if (valuesToIndices.has(key)) {
					throw "Value already exists in array";
				}

				values.push(item);
				valuesToIndices.set(key, nextIndex++);
			}

			return nextIndex;
		},

		remove(index: number): T | undefined {
			return remove(index);
		},

		shift(): T | undefined {
			const shiftedValue = values.shift();

			if (shiftedValue !== undefined) {
				valuesToIndices.delete(getKey(shiftedValue));
			}

			for (let i = 0; i < values.size(); i++) {
				valuesToIndices.set(getKey(values[i]), i);
			}

			return shiftedValue;
		},

		sort(compareFunction?: ((a: T, b: T) => boolean) | undefined): DistinctArray<T> {
			values.sort(compareFunction);

			for (let i = 0; i < values.size(); i++) {
				valuesToIndices.set(getKey(values[i]), i);
			}

			return this;
		},

		unorderedDelete(value: T): void {
			const key = getKey(value);
			if (!valuesToIndices.has(key)) {
				return;
			}

			const index = valuesToIndices.get(key)!;
			unorderedRemove(index);
		},

		unorderedRemove(index: number): T | undefined {
			return unorderedRemove(index);
		},

		unshift(...items: T[]): number {
			for (const item of items) {
				if (valuesToIndices.has(getKey(item))) {
					throw "Value already exists in array";
				}
			}

			for (let i = items.size() - 1; i >= 0; i--) {
				values.unshift(items[i]);
			}

			for (let i = 0; i < values.size(); i++) {
				valuesToIndices.set(getKey(values[i]), i);
			}

			return values.size();
		},
	};

	setmetatable(methodsObject, metatable);

	return methodsObject as DistinctArray<T>;
}
