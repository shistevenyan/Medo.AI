import inMemory from "../../src/backend/lib/datasources/inMemory";

let inMemData = inMemory()

test('COLLS is empty array', () => {
    expect(inMemData.COLLS).toBe({});
});