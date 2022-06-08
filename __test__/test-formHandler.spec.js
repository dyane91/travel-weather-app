import { formHandler } from "../src/client/js/main";

describe("Testing the functionality", () => {
    test("Testing that function formHandler is defined", () => {
        expect(formHandler).toBeDefined();
    });
    test("Testing formHandler is a function", () => {
        expect(typeof formHandler).toBe('function');
    });
});