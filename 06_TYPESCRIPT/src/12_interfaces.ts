// interface gives shape to the object/data
interface Chai {
    flavour: string;
    price: number;
    milk?: boolean;
    // `?` makes the property optional — object may or may not include it
}

const masalaChai: Chai = {
    // Object must satisfy the interface structure
    flavour: "masala",
    price: 20,
};

interface Shop {
    readonly id: number;
    // `readonly` prevents reassignment after initialization
    name: string;
}

const s: Shop = {
    id: 1,
    name: "caffe",
};
// s.id = 2 ❌ not allowed because `id` is readonly

interface DiscountCalculator {
    // Call signature — interface describing a function shape
    (price: number): number;
}
const apply50: DiscountCalculator = (p) => p * 0.5;
// Function must match the interface signature

interface TeaMachine {
    start(price: number): void;
    stop(): void;
    // Interfaces can describe methods for classes or objects
}

const machine: TeaMachine = {
    // Object literal implementing an interface
    start(price) {
        console.log(`Starting tea machine for ${price}`);
    },
    stop() {
        console.log("stopping tea machine");
    },
};

interface ChaiRating {
    // Index signature — allows dynamic property names
    [flavour: string]: number;
}

const rating: ChaiRating = {
    masala: 4,
    ginger: 5,
};

interface User {
    name: string;
}

interface User {
    age: number;
}
// Interface declaration merging — both interfaces are combined
const u: User = {
    name: "sounak",
    age: 20,
};

interface A {
    a: string;
}
interface B {
    b: string;
}

interface C extends A, B {}
// Interface inheritance — `C` must contain properties of both A and B
