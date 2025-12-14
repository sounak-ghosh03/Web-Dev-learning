function makeChai(type: string, cups: number) {
    // Function parameters are explicitly typed.
    // TypeScript enforces correct argument types at call sites.
    console.log(`Making ${cups} cups of ${type}`);
}

makeChai("Masala chai", 3);
// Arguments must match the parameter types and order.

function getChaiPrice(): number {
    // Explicit return type annotation.
    // The function must return a number on all code paths.
    return 20; // number value, not a string like "20 rupees"
}

function makeOrder(order: string) {
    // TypeScript infers the return type here as `string | null`.
    // This happens because different branches return different types.
    if (!order) return null;
    return order;
}

function logChai(): void {
    // `void` indicates the function does not return a meaningful value.
    // Commonly used for logging or side-effect-only functions.
    console.log("Making chai");
}

function orderChai(type?: string) {
    // Optional parameter: `type` can be `string` or `undefined`.
    // Callers may omit this argument.
    console.log(`Ordering ${type} chai`);
}

function createChai(order: { type: string; sugar: number }): number {
    // Object parameter with an inline type definition.
    // Ensures the object passed has exactly the required structure.
    return 4;
    // or console.log(order);
}
