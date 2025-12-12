const chai = {
    name: "masala chai",
    price: 20,
    isAvailable: true,
};
// Basic object literal — TypeScript infers the object type based on the values.
// Equivalent to: { name: string; price: number; isAvailable: boolean }

let tea: {
    name: string;
    price: number;
    isHot: boolean;
};
// Inline object type annotation — ensures `tea` must match this exact shape.
tea = {
    name: " ginger tea",
    price: 20,
    isHot: true,
};

// Reusable object type via alias
// Using a `type` helps avoid repeating object structures.
type Tea = {
    name: string;
    price: number;
    ingredients: string[];
};

const adrakChai: Tea = {
    name: "adrak chai",
    price: 20,
    ingredients: ["ginger", "tea leaves"],
};

// Structural typing example
// TypeScript uses "duck typing" — if the structure matches, it's assignable.
type Cup = { size: string };
let smallCup: Cup = { size: "200ml" };
let bigCup = { size: "300ml", material: "steel" };
smallCup = bigCup;
// Allowed: bigCup has *at least* the properties required by Cup.

// Another structural typing example
// Extra properties are allowed when assigning to a narrower type.
type Brew = { brewTime: number };
const coffee = { brewTime: 5, beans: "Arabica" };
const chaiBrew: Brew = coffee;

// Normal object type for a user
// Objects must include all required properties.
type User = {
    username: string;
    password: string;
};

const u: User = {
    username: "sounak",
    password: "1234",
};

// Nested object types
// Objects can contain arrays and other objects.
type Item = {
    name: string;
    quantity: number;
};
type Address = {
    street: string;
    zip: number;
};

type Order = {
    id: number;
    items: Item[];
    address: Address;
};

// Utility Types: Partial<T>
// Makes all properties optional.
type Chai = {
    name: string;
    price: number;
    isHot: boolean;
};
const updateChai = (updates: Partial<Chai>) => {
    console.log(updates);
};

updateChai({ price: 20 });
updateChai({ isHot: true });
updateChai({}); // allowed because all fields are optional in Partial

// Utility Types: Required<T>
// Opposite of Partial — forces all properties to be present.
type ChaiOrder = {
    name?: string;
    quantity?: number;
};
const placeOrder = (order: Required<ChaiOrder>) => {
    console.log(order);
};

placeOrder({
    name: "masala chai",
    quantity: 2,
});

// Utility Types: Pick<T, K>
// Creates a new type with only selected properties.
type tea = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[];
};

type BasicChaiInfo = Pick<Chai, "name" | "price">;

const chaiInfo: BasicChaiInfo = {
    name: "lemon chai",
    price: 20,
};

// Utility Types: Omit<T, K>
// Opposite of Pick — removes properties.
type ChaiNew = {
    name: string;
    price: number;
    isHot: boolean;
    secretIngredients: string;
};

type PublicChai = Omit<ChaiNew, "secretIngredients">;
// Useful for hiding sensitive fields in APIs or responses.
