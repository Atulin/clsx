// @ts-check
// noinspection PointlessBooleanExpressionJS

import { expect, test } from "bun:test";
import * as mod from "../src";

const fn = mod.default;

test("exports", () => {
	expect(typeof mod.default).toBe("function");
	expect(typeof mod.clsx).toBe("function");
	expect(mod.default).toBe(mod.clsx);

	expect(typeof mod.default()).toBe("string");
	expect(typeof mod.clsx()).toBe("string");
});

test("strings", () => {
	expect(fn("")).toBe("");
	expect(fn("foo")).toBe("foo");
	expect(fn(true && "foo")).toBe("foo");
	expect(fn(false && "foo")).toBe("");
});

test("strings (variadic)", () => {
	expect(fn("")).toBe("");
	expect(fn("foo", "bar")).toBe("foo bar");
	expect(fn(true && "foo", false && "bar", "baz")).toBe("foo baz");
	expect(fn(false && "foo", "bar", "baz", "")).toBe("bar baz");
});

test("numbers", () => {
	expect(fn(1)).toBe("1");
	expect(fn(12)).toBe("12");
	expect(fn(0.1)).toBe("0.1");
	expect(fn(0)).toBe("");

	expect(fn(Infinity)).toBe("Infinity");
	expect(fn(NaN)).toBe("");
});

test("numbers (variadic)", () => {
	expect(fn(0, 1)).toBe("1");
	expect(fn(1, 2)).toBe("1 2");
});

test("objects", () => {
	expect(fn({})).toBe("");
	expect(fn({ foo: true })).toBe("foo");
	expect(fn({ foo: true, bar: false })).toBe("foo");
	expect(fn({ foo: "hiya", bar: 1 })).toBe("foo bar");
	expect(fn({ foo: 1, bar: 0, baz: 1 })).toBe("foo baz");
	expect(fn({ "-foo": 1, "--bar": 1 })).toBe("-foo --bar");
});

test("objects (variadic)", () => {
	expect(fn({}, {})).toBe("");
	expect(fn({ foo: 1 }, { bar: 2 })).toBe("foo bar");
	expect(fn({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe("foo baz");
	expect(
		fn({ foo: 1 }, {}, {}, { bar: "a" }, { baz: null, bat: Infinity }),
	).toBe("foo bar bat");
});

test("arrays", () => {
	expect(fn([])).toBe("");
	expect(fn(["foo"])).toBe("foo");
	expect(fn(["foo", "bar"])).toBe("foo bar");
	expect(fn(["foo", 0 && "bar", 1 && "baz"])).toBe("foo baz");
});

test("arrays (nested)", () => {
	expect(fn([[[]]])).toBe("");
	expect(fn([[["foo"]]])).toBe("foo");
	expect(fn([true, [["foo"]]])).toBe("foo");
	expect(fn(["foo", ["bar", ["", [["baz"]]]]])).toBe("foo bar baz");
});

test("arrays (variadic)", () => {
	expect(fn([], [])).toBe("");
	expect(fn(["foo"], ["bar"])).toBe("foo bar");
	expect(fn(["foo"], null, ["baz", ""], true, "", [])).toBe("foo baz");
});

test("arrays (no `push` escape)", () => {
	expect(fn({ push: 1 })).toBe("push");
	expect(fn({ pop: true })).toBe("pop");
	expect(fn({ push: true })).toBe("push");
	expect(fn("hello", { world: 1, push: true })).toBe("hello world push");
});

test("functions", () => {
	const foo = () => {};
	// @ts-expect-error
	expect(fn(foo, "hello")).toBe("hello");
	// @ts-expect-error
	expect(fn(foo, "hello", fn)).toBe("hello");
	// @ts-expect-error
	expect(fn(foo, "hello", [[fn], "world"])).toBe("hello world");
});
