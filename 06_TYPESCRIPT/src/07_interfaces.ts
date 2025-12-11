type ChaiOrder = {
    type: string;
    sugar: number;
    strong: boolean;
};
// `type` here creates a type alias — a reusable name for an object structure.
// Type aliases can represent objects, unions, intersections, primitives, etc.

function makeChai(order: ChaiOrder) {
    // Functions can reuse the alias for cleaner and consistent typing.
    console.log(order);
}

function serveChai(order: ChaiOrder) {
    console.log(order);
}

type TeaRecipe = {
    water: number;
    milk: number;
};
// Another type alias for an object shape.

class MasalaChai implements TeaRecipe {
    // `implements` checks at compile time that the class satisfies the TeaRecipe structure.
    water = 100;
    milk = 50;
}

interface CupSize {
    size: "small" | "medium" | "large";
}
// `interface` is similar to a type alias for objects but more extensible (can be reopened/merged).

class Chai implements CupSize {
    size: "small" | "medium" | "large" = "small";
}

// type Response = { ok: true } | { ok: false }
// Interfaces CANNOT represent union types, which is why the class couldn't implement Response.
// `type` is better suited for unions.

type TeaType = "masala" | "green" | "herbal";
// Type alias for string literal union — restricts the allowed values.

function orderChai(t: TeaType) {
    console.log(t);
}

type Base = { teaLeaves: number };
type Extra = { masala: number };
type Masala = Base & Extra;
// Intersection types (`&`) combine multiple type shapes into one. More like Unions but more strict.

const cup: Masala = {
    teaLeaves: 3,
    masala: 1,
};

type User = {
    username: string;
    bio?: string;
    // `?` marks properties as optional.
};

const user1: User = {
    username: "sounak",
};
const user2: User = {
    username: "sounak",
    bio: "coder",
};

type Config = {
    readonly appname: string;
    // `readonly` means the property cannot be reassigned after initialization.
    version: string;
};

const cfg: Config = {
    appname: "chai",
    version: "1.0",
};

// cfg.appname = "chai";
// ❌ Error: Cannot assign to `appname` because it is readonly.
// Readonly is enforced at compile time.