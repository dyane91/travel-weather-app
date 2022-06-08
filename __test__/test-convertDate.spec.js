import { convertDate } from "../src/client/js/functionalities";

describe("Testing the functionality", () => {
    test("Testing the convertDate() function", () => {
        expect(convertDate).toBeDefined();
    })
    test("The date returned is correctly formatted", () => {
        const date = 'Mon Jun 06 2022 19:08:24 GMT-0700 (Pacific Daylight Time)';
        expect(convertDate(date).toBe('2022-06-07'));
    });
});