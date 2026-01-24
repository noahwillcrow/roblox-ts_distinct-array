# DistinctArray

A TypeScript/roblox-ts array that enforces uniqueness of elements. Each value can only appear once in the array.

## Features

- **Unique elements**: Automatically prevents duplicate values from being added
- **Fast lookups**: O(1) membership testing with `has()` and `indexOf()`
- **Standard Array API**: Implements familiar array methods like `push`, `pop`, `forEach`, `map`, `filter`
- **Unordered operations**: `unorderedRemove()` and `unorderedDelete()` for O(1) removals when order doesn't matter

## Installation

```bash
npm install @your-org/distinct-array
```

## Usage

```typescript
import { DistinctArray } from "@your-org/distinct-array";

// Create an empty DistinctArray
const arr = DistinctArray.create<number>();

// Add values - duplicates will throw
arr.push(1, 2, 3);
arr.push(1); // Throws: "Value already exists in array"

// Check membership - O(1) lookup
arr.has(2); // true
arr.has(4); // false

// Remove by value
arr.delete(2);
arr.has(2); // false

// Create from existing array
const arr2 = DistinctArray.fromArray([1, 2, 3]);
```

## API

### Static Methods

| Method | Description |
|--------|-------------|
| `create<T>()` | Creates an empty `DistinctArray<T>` |
| `fromArray<T>(array: T[])` | Creates from an array (throws on duplicates) |
| `fromSet<T>(set: Set<T>)` | Creates from a `Set` |

### Instance Methods

#### Read Methods

| Method | Description |
|--------|-------------|
| `has(value: T): boolean` | O(1) check if value exists |
| `includes(searchElement: T, fromIndex?: number): boolean` | Check if value exists (with optional fromIndex) |
| `indexOf(searchElement: T, fromIndex?: number): number` | Get index of value (O(1)) |
| `size(): number` | Get the number of elements in the array |
| `find(predicate): T \| undefined` | Find first matching element |
| `findIndex(predicate): number` | Find index of first matching element |
| `every(callback): boolean` | Test if all elements pass |
| `some(callback): boolean` | Test if any element passes |
| `filter(callback): T[]` | Return filtered array |
| `map<U>(callback): U[]` | Return mapped array |
| `mapFiltered<U>(callback): NonNullable<U>[]` | Map, filtering out undefined values |
| `forEach(callback): void` | Iterate over elements |
| `reduce<U>(callback, initialValue): U` | Reduce to single value |

#### Write Methods

| Method | Description |
|--------|-------------|
| `push(...items: T[]): number` | Add elements (throws on duplicates) |
| `pop(): T \| undefined` | Remove and return last element |
| `shift(): T \| undefined` | Remove and return first element |
| `unshift(...items: T[]): number` | Add elements at start (throws on duplicates) |
| `insert(index: number, value: T): void` | Insert at index (throws on duplicates) |
| `remove(index: number): T \| undefined` | Remove at index, shifting elements |
| `unorderedRemove(index: number): T \| undefined` | Remove at index, replacing with last (O(1)) |
| `delete(value: T): void` | Remove by value |
| `unorderedDelete(value: T): void` | Remove by value, replacing with last (O(1)) |
| `clear(): void` | Remove all elements |
| `sort(compareFunction?): this` | Sort in place |

## Dependencies

This package has **no external dependencies**. It only uses built-in TypeScript/roblox-ts types (`Array`, `Map`, `Set`).

## License

MIT
