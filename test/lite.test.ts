// @ts-check
// noinspection PointlessBooleanExpressionJS

import { expect, test } from 'bun:test';
import * as mod from '../src/lite';

const fn = mod.default;

test('exports', () => {
	expect(typeof mod.default).toBe('function');
	expect(typeof mod.clsx).toBe('function');
	expect(mod.default).toBe(mod.clsx);

	expect(typeof mod.default()).toBe('string');
	expect(typeof mod.clsx()).toBe('string');
});

test('strings', () => {
	expect(fn('')).toBe('');
	expect(fn('foo')).toBe('foo');
	expect(fn(true && 'foo')).toBe('foo');
	expect(fn(false && 'foo')).toBe('');
});

test('strings (variadic)', () => {
	expect(fn('')).toBe('');
	expect(fn('foo', 'bar')).toBe('foo bar');
	expect(fn(true && 'foo', false && 'bar', 'baz')).toBe('foo baz');
	expect(fn(false && 'foo', 'bar', 'baz', '')).toBe('bar baz');
});

test('emptys', () => {
	expect(fn('')).toBe('');
	expect(fn(undefined)).toBe('');
	expect(fn(null)).toBe('');
	expect(fn(0)).toBe('');
});

// lite ignores all non-strings
test('non-strings', () => {
	// number
	expect(fn(1)).toBe('');
	expect(fn(1, 2)).toBe('');
	expect(fn(Infinity)).toBe('');
	expect(fn(NaN)).toBe('');
	expect(fn(0)).toBe('');

	// objects
	expect(fn({})).toBe('');
	expect(fn(null)).toBe('');
	expect(fn({ a:1 })).toBe('');
	expect(fn({ a:1 }, { b:2 })).toBe('');

	// arrays
	expect(fn([])).toBe('');
	expect(fn(['foo'])).toBe('');
	expect(fn(['foo', 'bar'])).toBe('');

	// functions
	expect(fn(fn)).toBe('');
	expect(fn(fn, fn)).toBe('');
});
