/* global test */
import stringifyArguments from '../../src/utils/stringify_arguments';

test('should return empty string', () => {
  expect(stringifyArguments({})).toBe('');
  expect(stringifyArguments()).toBe('');
  expect(stringifyArguments({filter: 1})).not.toBe('');
});

test('should return query string', () => {
  expect(stringifyArguments({query: 'args'})).toBe('?query=args');
});

test('should support nested filters', () => {
  expect(stringifyArguments({date: {gte: '1', lte: '2'}})).toBe('?date[gte]=1&date[lte]=2');
});

test('should support array of values', () => {
  expect(stringifyArguments({query: [1, 2, 3]})).toBe('?query=1,2,3');
});
