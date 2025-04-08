// __tests__/math.test.ts

function add(a: number, b: number): number {
    return a + b;
}

describe("Addition", () => {
    test("adds 2 + 3 to equal 5", () => {
        expect(add(2, 3)).toBe(5);
    });
});
