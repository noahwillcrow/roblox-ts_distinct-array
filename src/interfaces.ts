export interface ReadonlyDistinctArray<T extends defined> {
	readonly [index: number]: T;

	/**
	 * Returns whether **all** the members of an array satisfy the specified test.
	 * Returns true for empty Arrays.
	 * @param callback A function that accepts up to three arguments. The every method calls the callback function for
	 * each element in array1 until the callback returns false, or until the end of the array.
	 */
	every(callback: (value: T, index: number, array: ReadonlyArray<T>) => boolean | undefined): boolean;

	/**
	 * Returns the elements of an array that meet the condition specified in a callback function.
	 * @param callback A function that accepts up to three arguments. The filter method calls the callback function one
	 * time for each element in the array.
	 */
	filter(callback: (value: T, index: number, array: ReadonlyArray<T>) => boolean | undefined): Array<T>;

	/**
	 * Returns the value of the first element in the array where predicate is true, and undefined
	 * otherwise.
	 * @param predicate find calls predicate once for each element of the array, in ascending
	 * order, until it finds one where predicate returns true. If such an element is found, find
	 * immediately returns that element value. Otherwise, find returns undefined.
	 */
	find(predicate: (value: T, index: number, obj: ReadonlyArray<T>) => boolean | undefined): T | undefined;

	/**
	 * Returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it
	 * returns -1, indicating no element passed the test.
	 * @param predicate findIndex calls predicate once for each element of the array, in ascending
	 * order, until it finds one where predicate returns true. If such an element is found, find
	 * immediately returns the index at which it was found. Otherwise, find returns -1.
	 */
	findIndex(predicate: (value: T, index: number, obj: ReadonlyArray<T>) => boolean | undefined): number;

	/**
	 * Performs the specified action for each element in an array.
	 * @param callback  A function that accepts up to three arguments. forEach calls the callback function one time for
	 * each element in the array.
	 */
	forEach(callback: (value: T, index: number, array: ReadonlyArray<T>) => void): void;

	/**
	 * Gets whether the Array contains the given value.
	 */
	has(value: T): boolean;

	/**
	 * Returns the number of elements in the array.
	 */
	size(): number;

	/**
	 * Returns whether an array includes a certain element.
	 * @param searchElement The element to search for.
	 * @param fromIndex The position in this array at which to begin searching for searchElement.
	 */
	includes(searchElement: T, fromIndex?: number): boolean;

	/**
	 * Returns the index of the first occurrence of a value in an array, else returns -1.
	 * @param searchElement The value to locate in the array.
	 * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at
	 * index 0.
	 */
	indexOf(searchElement: T, fromIndex?: number): number;

	/**
	 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
	 * @param callback A function that accepts up to three arguments. The map method calls the callback function one
	 * time for each element in the array.
	 */
	map<U>(callback: (value: T, index: number, array: ReadonlyArray<T>) => U): Array<U>;

	/**
	 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
	 * Undefined values will not be included, so keep in mind this does not create a 1:1 map.
	 * @param callback A function that accepts up to three arguments. The map method calls the callback function one
	 * time for each element in the array.
	 * @example
	 * // Gets an Array of all existing characters
	 * const characters = playerlist.mapFiltered(plr => plr.Character);
	 */
	mapFiltered<U>(callback: (value: T, index: number, array: ReadonlyArray<T>) => U): Array<NonNullable<U>>;

	/**
	 * Returns whether the specified callback function returns true for any element of an array.
	 * Returns false for empty Arrays.
	 * @param callback A function that accepts up to three arguments. The some method calls the callback function for
	 * each element in array1 until the callback returns true, or until the end of the array.
	 */
	some(callback: (value: T, index: number, array: ReadonlyArray<T>) => boolean | undefined): boolean;

	/**
	 * Calls the specified callback function for all the elements in an array. The return value of the callback function
	 * is the accumulated result, and is provided as an argument in the next call to the callback function.
	 * @param callback A function that accepts up to four arguments. The reduce method calls the callback function one
	 * time for each element in the array.
	 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The
	 * first call to the callback function provides this value as an argument instead of an array value.
	 */
	reduce<U>(
		callback: (accumulator: U, currentValue: T, currentIndex: number, array: ReadonlyArray<T>) => U,
		initialValue: U,
	): U;
}

export interface DistinctArray<T extends defined> extends ReadonlyDistinctArray<T> {
	[n: number]: T;

	/** Deletes all values in the Array */
	clear(): void;

	/** Deletes the value from the array */
	delete(value: T): void;

	/**
	 * Inserts `value` into the array at `index` and shifts array members forwards if needed.
	 */
	insert(index: number, value: T): void;

	/**
	 * Removes the last element from an array and returns it.
	 */
	pop(): T | undefined;

	/**
	 * Appends new elements to an array and returns the new length of the array.
	 * @param items New elements of the Array.
	 */
	push(...items: Array<T>): number;

	/**
	 * Removes the array member at `index` and returns it and shifts array members backwards if needed.
	 */
	remove(index: number): T | undefined;

	/**
	 * Removes the first element from an array and returns it.
	 */
	shift(): T | undefined;

	/**
	 * Sorts list elements in a given order, in-place, from `list[1]` to `list[#list]`, so that
	 * (`!comp(list[i+1], list[i])` will be true after the sort). Alias to Lua's `table.sort`.
	 * @param compareFunction A function that defines the sort order. Returns true when the first element must come
	 * before the second. If omitted, the array is sorted according to the `<` operator.
	 */
	sort(compareFunction?: (a: T, b: T) => boolean): DistinctArray<T>;

	/** Deletes the value from the array and shifts the last element in the array into its place. */
	unorderedDelete(value: T): void;

	/**
	 * Removes a value at `index` from this array, replacing it with the last value in this array and popping the last
	 * value.
	 * Returns the value removed from `index` in this way if it exists, otherwise `undefined`.
	 * @param index The index to remove from this array and return
	 */
	unorderedRemove(index: number): T | undefined;

	/**
	 * Inserts new elements at the start of an array and returns the new length of the array.
	 * @param items  Elements to insert at the start of the Array.
	 */
	unshift(...items: Array<T>): number;
}
