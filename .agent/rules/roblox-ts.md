---
trigger: always_on
---

# roblox-ts: Coding Guidelines

- **Fundamentals:** Use **0-based indexing**, `===` equality, and avoid `get`/`set` accessors. Use `undefined` (never `null`).
  - *Note:* Certain "native" string methods (e.g., `str.byte()`, `str.sub()`) map directly to Luau's 1-indexed library. Use `str.byte(i + 1)` to access the character at 0-indexed position `i`. Always check compiled Luau for these calls.
- **Macros:** Use `typeIs(v, "string")` and `classIs(obj, "Part")`. Avoid `typeof` or `instanceof` for Roblox types.
- **Typing:** **`any` is strictly forbidden.** Use `unknown` with type guards.
- **Data Structures:** Use `.size()`, `for-of` loops. Use `unorderedRemove(index)` for performance unless order is critical, then use `remove(index)`. Use `Map` for dynamic keys, `Object` for fixed.
- **Roblox API:** Use `new Instance("Part")`, `import { Players } from "@rbxts/services"`, and `math.huge`.
- **Async & Time:** Use `Promise`, `Promise.delay(s)`, or `task.delay(s, cb)`. Use `DateTime` for game state (not `os.clock`).
- **Logging (@rbxts/log):** Use structured logging (`Log.Info("{P}", name)`) for permanent logs. Reference: `knowledge-database/dependencies/@rbxts/log/README.md`.
- **Performance:** Avoid spread operators `[...arr]` in loops. Use `const enum` where possible.
- **Testing (@rbxts/testez):**
  - Structure: `export = () => { describe("Name", () => { it("works", () => { ... }); }); };`
  - Debugging: Errors point to compiled Luau in `out/`. Use `FOCUS()` to isolate tests.
  - API Reference: `knowledge-database/dependencies/@rbxts/testez/api-reference.md`.