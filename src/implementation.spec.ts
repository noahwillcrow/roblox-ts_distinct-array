/// <reference types="@rbxts/testez/globals" />

import { DistinctArray } from "./index";

export = () => {
	describe("DistinctArray", () => {
		describe("create", () => {
			it("should create an empty array", () => {
				const arr = DistinctArray.create<number>();
				expect(arr.size()).to.equal(0);
			});
		});

		describe("size", () => {
			it("should return 0 for empty array", () => {
				const arr = DistinctArray.create<number>();
				expect(arr.size()).to.equal(0);
			});

			it("should return correct size for non-empty array", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.size()).to.equal(3);
			});

			it("should update size after push", () => {
				const arr = DistinctArray.create<number>();
				arr.push(1, 2);
				expect(arr.size()).to.equal(2);
			});

			it("should update size after remove", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				arr.remove(1);
				expect(arr.size()).to.equal(2);
			});

			it("should update size after clear", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				arr.clear();
				expect(arr.size()).to.equal(0);
			});
		});

		describe("fromArray", () => {
			it("should create from an array", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.size()).to.equal(3);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(2);
				expect(arr[2]).to.equal(3);
			});

			it("should throw on duplicate values", () => {
				expect(() => {
					DistinctArray.fromArray([1, 2, 1]);
				}).to.throw();
			});
		});

		describe("fromSet", () => {
			it("should create from a set", () => {
				const set = new Set([1, 2, 3]);
				const arr = DistinctArray.fromSet(set);
				expect(arr.size()).to.equal(3);
				expect(arr.has(1)).to.equal(true);
				expect(arr.has(2)).to.equal(true);
				expect(arr.has(3)).to.equal(true);
			});
		});

		describe("push", () => {
			it("should add values and return new length", () => {
				const arr = DistinctArray.create<number>();
				const length = arr.push(1, 2, 3);
				expect(length).to.equal(3);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(2);
				expect(arr[2]).to.equal(3);
			});

			it("should throw on duplicate values", () => {
				const arr = DistinctArray.create<number>();
				arr.push(1);
				expect(() => {
					arr.push(1);
				}).to.throw();
			});
		});

		describe("pop", () => {
			it("should remove and return last element", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				const value = arr.pop();
				expect(value).to.equal(3);
				expect(arr.size()).to.equal(2);
				expect(arr.has(3)).to.equal(false);
			});

			it("should return undefined for empty array", () => {
				const arr = DistinctArray.create<number>();
				const value = arr.pop();
				expect(value).to.equal(undefined);
			});
		});

		describe("shift", () => {
			it("should remove and return first element", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				const value = arr.shift();
				expect(value).to.equal(1);
				expect(arr.size()).to.equal(2);
				expect(arr[0]).to.equal(2);
				expect(arr[1]).to.equal(3);
			});

			it("should return undefined for empty array", () => {
				const arr = DistinctArray.create<number>();
				const value = arr.shift();
				expect(value).to.equal(undefined);
			});
		});

		describe("unshift", () => {
			it("should add elements at start and return new length", () => {
				const arr = DistinctArray.fromArray([2, 3]);
				const length = arr.unshift(0, 1);
				expect(length).to.equal(4);
				expect(arr[0]).to.equal(0);
				expect(arr[1]).to.equal(1);
				expect(arr[2]).to.equal(2);
				expect(arr[3]).to.equal(3);
			});

			it("should throw on duplicate values", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				expect(() => {
					arr.unshift(1);
				}).to.throw();
			});
		});

		describe("insert", () => {
			it("should insert value at index", () => {
				const arr = DistinctArray.fromArray([1, 3]);
				arr.insert(1, 2);
				expect(arr.size()).to.equal(3);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(2);
				expect(arr[2]).to.equal(3);
			});

			it("should throw on duplicate values", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				expect(() => {
					arr.insert(1, 1);
				}).to.throw();
			});

			it("should throw on out of bounds index", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				expect(() => {
					arr.insert(5, 3);
				}).to.throw();
			});
		});

		describe("remove", () => {
			it("should remove element at index and return it", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				const value = arr.remove(1);
				expect(value).to.equal(2);
				expect(arr.size()).to.equal(2);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(3);
			});

			it("should return undefined for out of bounds index", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				const value = arr.remove(5);
				expect(value).to.equal(undefined);
			});
		});

		describe("unorderedRemove", () => {
			it("should remove element at index and replace with last", () => {
				const arr = DistinctArray.fromArray([1, 2, 3, 4]);
				const value = arr.unorderedRemove(1);
				expect(value).to.equal(2);
				expect(arr.size()).to.equal(3);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(4);
				expect(arr[2]).to.equal(3);
			});

			it("should return undefined for out of bounds index", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				const value = arr.unorderedRemove(5);
				expect(value).to.equal(undefined);
			});
		});

		describe("delete", () => {
			it("should delete value from array", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				arr.delete(2);
				expect(arr.size()).to.equal(2);
				expect(arr.has(2)).to.equal(false);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(3);
			});

			it("should do nothing if value not found", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				arr.delete(3);
				expect(arr.size()).to.equal(2);
			});
		});

		describe("unorderedDelete", () => {
			it("should delete value and replace with last", () => {
				const arr = DistinctArray.fromArray([1, 2, 3, 4]);
				arr.unorderedDelete(2);
				expect(arr.size()).to.equal(3);
				expect(arr.has(2)).to.equal(false);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(4);
				expect(arr[2]).to.equal(3);
			});
		});

		describe("clear", () => {
			it("should remove all elements", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				arr.clear();
				expect(arr.size()).to.equal(0);
				expect(arr.has(1)).to.equal(false);
				expect(arr.has(2)).to.equal(false);
				expect(arr.has(3)).to.equal(false);
			});
		});

		describe("sort", () => {
			it("should sort array in place", () => {
				const arr = DistinctArray.fromArray([3, 1, 2]);
				arr.sort((a, b) => a < b);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(2);
				expect(arr[2]).to.equal(3);
			});

			it("should return this for chaining", () => {
				const arr = DistinctArray.fromArray([2, 1]);
				const result = arr.sort((a, b) => a < b);
				expect(result).to.equal(arr);
			});
		});

		describe("has", () => {
			it("should return true for existing value", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.has(2)).to.equal(true);
			});

			it("should return false for non-existing value", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.has(4)).to.equal(false);
			});
		});

		describe("includes", () => {
			it("should return true for existing value", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.includes(2)).to.equal(true);
			});

			it("should return false for non-existing value", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.includes(4)).to.equal(false);
			});

			it("should respect fromIndex parameter", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.includes(1, 1)).to.equal(false);
				expect(arr.includes(2, 1)).to.equal(true);
			});
		});

		describe("indexOf", () => {
			it("should return index of existing value", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.indexOf(2)).to.equal(1);
			});

			it("should return -1 for non-existing value", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.indexOf(4)).to.equal(-1);
			});

			it("should respect fromIndex parameter", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr.indexOf(1, 1)).to.equal(-1);
				expect(arr.indexOf(2, 1)).to.equal(1);
			});
		});

		describe("find", () => {
			it("should return first matching element", () => {
				const arr = DistinctArray.fromArray([1, 2, 3, 4]);
				const result = arr.find((value) => value % 2 === 0);
				expect(result).to.equal(2);
			});

			it("should return undefined if no match", () => {
				const arr = DistinctArray.fromArray([1, 3, 5]);
				const result = arr.find((value) => value % 2 === 0);
				expect(result).to.equal(undefined);
			});
		});

		describe("findIndex", () => {
			it("should return index of first matching element", () => {
				const arr = DistinctArray.fromArray([1, 2, 3, 4]);
				const index = arr.findIndex((value) => value % 2 === 0);
				expect(index).to.equal(1);
			});

			it("should return -1 if no match", () => {
				const arr = DistinctArray.fromArray([1, 3, 5]);
				const index = arr.findIndex((value) => value % 2 === 0);
				expect(index).to.equal(-1);
			});
		});

		describe("every", () => {
			it("should return true if all elements pass", () => {
				const arr = DistinctArray.fromArray([2, 4, 6]);
				const result = arr.every((value) => value % 2 === 0);
				expect(result).to.equal(true);
			});

			it("should return false if any element fails", () => {
				const arr = DistinctArray.fromArray([2, 3, 4]);
				const result = arr.every((value) => value % 2 === 0);
				expect(result).to.equal(false);
			});

			it("should return true for empty array", () => {
				const arr = DistinctArray.create<number>();
				const result = arr.every(() => false);
				expect(result).to.equal(true);
			});
		});

		describe("some", () => {
			it("should return true if any element passes", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				const result = arr.some((value) => value % 2 === 0);
				expect(result).to.equal(true);
			});

			it("should return false if no element passes", () => {
				const arr = DistinctArray.fromArray([1, 3, 5]);
				const result = arr.some((value) => value % 2 === 0);
				expect(result).to.equal(false);
			});

			it("should return false for empty array", () => {
				const arr = DistinctArray.create<number>();
				const result = arr.some(() => true);
				expect(result).to.equal(false);
			});
		});

		describe("filter", () => {
			it("should return filtered array", () => {
				const arr = DistinctArray.fromArray([1, 2, 3, 4]);
				const result = arr.filter((value) => value % 2 === 0);
				expect(result.size()).to.equal(2);
				expect(result[0]).to.equal(2);
				expect(result[1]).to.equal(4);
			});
		});

		describe("map", () => {
			it("should return mapped array", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				const result = arr.map((value) => value * 2);
				expect(result.size()).to.equal(3);
				expect(result[0]).to.equal(2);
				expect(result[1]).to.equal(4);
				expect(result[2]).to.equal(6);
			});
		});

		describe("mapFiltered", () => {
			it("should return mapped array without undefined values", () => {
				const arr = DistinctArray.fromArray([1, 2, 3, 4]);
				const result = arr.mapFiltered((value) => (value % 2 === 0 ? value : undefined));
				expect(result.size()).to.equal(2);
				expect(result[0]).to.equal(2);
				expect(result[1]).to.equal(4);
			});
		});

		describe("forEach", () => {
			it("should iterate over all elements", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				const values: number[] = [];
				arr.forEach((value) => {
					values.push(value);
				});
				expect(values.size()).to.equal(3);
				expect(values[0]).to.equal(1);
				expect(values[1]).to.equal(2);
				expect(values[2]).to.equal(3);
			});
		});

		describe("reduce", () => {
			it("should reduce array to single value", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				const result = arr.reduce((sum, value) => sum + value, 0);
				expect(result).to.equal(6);
			});
		});

		describe("index access", () => {
			it("should allow reading by index", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				expect(arr[0]).to.equal(1);
				expect(arr[1]).to.equal(2);
				expect(arr[2]).to.equal(3);
			});

			it("should allow writing by index", () => {
				const arr = DistinctArray.fromArray([1, 2, 3]);
				arr[1] = 5;
				expect(arr[1]).to.equal(5);
				expect(arr.has(2)).to.equal(false);
				expect(arr.has(5)).to.equal(true);
			});

			it("should throw on out of bounds read", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				expect(() => {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const _ = arr[5];
				}).to.throw();
			});

			it("should throw on out of bounds write", () => {
				const arr = DistinctArray.fromArray([1, 2]);
				expect(() => {
					arr[5] = 3;
				}).to.throw();
			});
		});

		describe("integration tests", () => {
			it("should work with string values", () => {
				const arr = DistinctArray.fromArray(["a", "b", "c"]);
				expect(arr.has("b")).to.equal(true);
				expect(arr.indexOf("c")).to.equal(2);
			});

			it("should maintain distinctness after operations", () => {
				const arr = DistinctArray.fromArray([0, 1, 2, 3]);
				arr.remove(1);
				arr.push(4);
				expect(arr.has(1)).to.equal(false);
				expect(arr.has(4)).to.equal(true);
				expect(arr.size()).to.equal(4);
			});

			it("should handle complex values", () => {
				const arr = DistinctArray.create<{ id: number }>();
				const obj1 = { id: 1 };
				const obj2 = { id: 2 };
				arr.push(obj1);
				arr.push(obj2);
				expect(arr.has(obj1)).to.equal(true);
				expect(arr.has(obj2)).to.equal(true);
			});
		});
		describe("keyMapper", () => {
			it("should enforce uniqueness based on the mapper", () => {
				const arr = DistinctArray.create<string, string>((s) => s.lower());
				arr.push("Hello");
				expect(() => {
					arr.push("hello");
				}).to.throw();
				expect(arr.size()).to.equal(1);
			});

			it("should work with objects using a key mapper", () => {
				interface Item {
					id: string;
					data: string;
				}
				const arr = DistinctArray.create<Item, string>((item) => item.id);
				arr.push({ id: "1", data: "first" });
				arr.push({ id: "2", data: "second" });

				expect(arr.has({ id: "1", data: "other" } as Item)).to.equal(true);
				expect(arr.indexOf({ id: "2", data: "other" } as Item)).to.equal(1);

				expect(() => {
					arr.push({ id: "1", data: "duplicate" });
				}).to.throw();
			});

			it("should delete objects based on core identity of key", () => {
				interface Item {
					id: string;
				}
				const arr = DistinctArray.create<Item, string>((item) => item.id);
				const item1 = { id: "1" };
				arr.push(item1);
				expect(arr.size()).to.equal(1);

				arr.delete({ id: "1" });
				expect(arr.size()).to.equal(0);
				expect(arr.has(item1)).to.equal(false);
			});

			it("should work with fromArray and keyMapper", () => {
				const arr = DistinctArray.fromArray<string, string>(["a", "b", "c"], (s) => s.lower());
				expect(arr.size()).to.equal(3);
				expect(arr[0]).to.equal("a");
				expect(arr[1]).to.equal("b");
				expect(arr[2]).to.equal("c");
			});

			it("should throw error if fromArray has duplicates according to mapper", () => {
				expect(() => {
					DistinctArray.fromArray<string, string>(["a", "A"], (s) => s.lower());
				}).to.throw();
			});

			it("should correctly update indices after removal with keyMapper", () => {
				const arr = DistinctArray.fromArray<string, string>(["a", "b", "c"], (s) => s.lower());
				arr.remove(0); // remove 'a'
				expect(arr.indexOf("b")).to.equal(0);
				expect(arr.indexOf("c")).to.equal(1);
			});

			it("should correctly handle index assignment with keyMapper", () => {
				const arr = DistinctArray.create<string, string>((s) => s.lower());
				arr.push("a");
				arr[0] = "A"; // Should work as it's the same key
				expect(arr[0]).to.equal("A");
				expect(arr.size()).to.equal(1);

				expect(() => {
					arr.push("a");
				}).to.throw();
			});
		});
	});
};
