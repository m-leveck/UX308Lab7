import { handleInput, clearInput } from '../Order.js';

describe("Tests all stages of a coffee order", function () {

    beforeEach(function () {
        clearInput();
    });

    it("asks if user wants coffee", function () {
        const aResults = handleInput("hello");
        expect(aResults[0]).toBe("Would you like a coffee?");
    });

    it("user says no to coffee", function () {
        handleInput("hello");
        const aResults = handleInput("no");
        expect(aResults[0]).toBe("Maybe next time!");
    });

    it("user says yes to coffee and is asked iced or hot", function () {
        handleInput("hello");
        const aResults = handleInput("yes");
        expect(aResults[0]).toBe("Iced or hot?");
    });

    it("after temperature, asks for milk choice", function () {
        handleInput("hello");
        handleInput("yes");
        const aResults = handleInput("iced");
        expect(aResults[0]).toBe("Regular milk or oat milk?");
    });

    it("after milk choice, asks about bagel", function () {
        handleInput("hello");
        handleInput("yes");
        handleInput("hot");
        const aResults = handleInput("oat milk");
        expect(aResults[0]).toBe("Would you like a bagel with that?");
    });

    it("completes the order", function () {
        handleInput("hello");
        handleInput("yes");
        handleInput("hot");
        handleInput("regular milk");
        const aResults = handleInput("yes");
        expect(aResults[0]).toBe("Great! Your order will be ready in 10 minutes.");
    });

});

