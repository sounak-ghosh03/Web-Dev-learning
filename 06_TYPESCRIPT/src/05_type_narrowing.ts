function getChai(kind: string | number) {
    // `typeof` narrows the union `string | number` to `string` inside this block.
    // TypeScript now knows `kind` is a `string` here so string methods/properties are available.
    if (typeof kind === "string") {
        return `Making ${kind} chai`;
    }
    // Outside the `if`, `kind` is narrowed to `number` (the remaining union member).
    return `Chai order: ${kind}`;
}

function serve(msg?: string) {
    // `if (msg)` narrows `msg?: string` (which can be undefined) to a definite `string` value.
    // This is a truthiness check — note that an empty string would also be falsy.
    if (msg) {
        return `Serving ${msg}`;
    }
    // Here `msg` is `undefined` (or falsy), so we return the default.
    return "Serving default masala chai";
}

function order(size: "small" | "medium" | "large" | number) {
    // Literal type narrowing: comparisons against string literals narrow the union to that specific literal.
    if (size === "small") {
        return "Small chai";
    }
    if (size === "medium") {
        return "Medium chai";
    }
    if (size === "large") {
        return "Large chai";
    }
    // If none of the literal checks passed, `size` is the `number` member of the union.
    return `Chai order: ${size}`;
}

class KulhadChai {
    serve() {
        return "Serving kulhad chai";
    }
}
class CuttingChai {
    serve() {
        return "Serving cutting chai";
    }
}

function serveChai(chai: KulhadChai | CuttingChai) {
    // `instanceof` is a runtime type guard that narrows `chai` to `KulhadChai` inside the block.
    // It checks the object's prototype chain at runtime, so it only works with classes (not plain types).
    if (chai instanceof KulhadChai) {
        return chai.serve();
    }
    // If needed, you could handle `CuttingChai` explicitly or return a fallback here.
}

type ChaiOrder = {
    type: string;
    sugar: number;
};

// User-defined type guard function: `obj is ChaiOrder` tells TypeScript the function narrows the type.
function isChaiOrder(obj: any): obj is ChaiOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    );
}

function serveOrder(item: ChaiOrder | string) {
    // Use the custom type guard to do safe property access when `item` might be a string.
    if (isChaiOrder(item)) {
        // Inside this branch TypeScript knows `item` is `ChaiOrder` so `.type` and `.sugar` are valid.
        return `Serving ${item.type} chai with ${item.sugar} sugar`;
    }
    // Here `item` is narrowed to `string`.
    return `Serving custom  chai: ${item}`;
}

type MasalaChai = {
    type: "masala";
    spicelevel: number;
};
type GingerChai = {
    type: "ginger";
    amount: number;
};
type ElaichiChai = {
    type: "elaichi";
    aroma: number;
};

type Chai = MasalaChai | GingerChai | ElaichiChai;

function MakeChai(order: Chai) {
    // Discriminated union: `type` is the discriminant property common to all union members.
    // Switching on `order.type` lets TypeScript narrow `order` to the specific member in each case.
    switch (order.type) {
        case "masala":
            return `Masala Chai with ${order.spicelevel}`;
            break;
        case "ginger":
            return `Ginger Chai with ${order.amount}`;
            break;
        case "elaichi":
            return `Elaichi Chai with ${order.aroma}`;
            break;
    }
}

function brew(order: MasalaChai | GingerChai | ElaichiChai) {
    // `in` operator is another type guard — it checks for a property at runtime and narrows the union.
    if ("spicelevel" in order) {
        // Inside this `if`, TypeScript infers `order` has `spicelevel` (so it's `MasalaChai`).
        // This is useful when you don't have a discriminant or prefer property checks.
        return `Brewing masala chai with ${order.spicelevel} spices`;
    }
}

// Generic runtime type guard for arrays: tells TypeScript that the unknown[] is actually a string[]
function isStringArray(arr: unknown[]): arr is string[] {
    // `Array.prototype.every` checks every element at runtime — if true, TypeScript can safely treat the array as `string[]`.
    return arr.every((item) => typeof item === "string");
}
