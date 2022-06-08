import { convertToLongDate } from "../src/client/js/functionalities";

describe("Testing the functionality", () => {
    test("Testing the convertToLongDate() function", () => {
        expect(convertToLongDate).toBeDefined();
    })
    test("The date returned is in format Month Day, Year", () => {
        const date = '2022-02-22';
        expect(convertToLongDate(date)).toBe('February 22, 2022');
    });
});