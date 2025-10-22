import { sum } from '../src/main';

test('sum function', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
});
