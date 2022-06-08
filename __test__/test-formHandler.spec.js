import { formHandler } from "../src/client/js/main";

describe("Testing the functionality", () => {
    test("Testing that function formHandler is defined", () => {
        expect(convertToLongDate).toBeDefined();
    });
    test("Testing formHandler is a function", () => {
        expect(typeof formHandler).toBe('function');
    });
});