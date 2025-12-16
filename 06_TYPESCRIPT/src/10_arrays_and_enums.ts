const chaiFlavours: string[] = ["Masala", "ginger", "Elaichi"];
// Array of strings using shorthand syntax `type[]`.

const chaiPrice: number[] = [20, 30, 40];
// Array where every element must be a number.

const rating: Array<number> = [4, 5, 4.5];
// Generic array syntax `Array<T>` — equivalent to `number[]`.

// Object type used inside an array
type Chai = {
    name: string;
    price: number;
};

const menu: Chai[] = [
    // Array of objects — each element must match the `Chai` structure
    {
        name: "Masala",
        price: 20,
    },
    {
        name: "ginger",
        price: 25,
    },
    {
        name: "Elaichi",
        price: 35,
    },
];

let t: [string, number] = ["sounak", 2];
// Tuple type — fixed length and fixed order of types

t.push("lol");
// Allowed at runtime, but tuples are best treated as fixed-length logically

const cities: readonly string[] = ["Delhi", "Mumbai", "Bangalore"];
// `readonly` array — prevents mutation methods like push/pop
// cities.push("Hyderabad"); // ❌ not allowed

const table: number[][] = [
    // 2D array (array of arrays)
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

let chaiTuple: [string, number];
chaiTuple = ["Masala", 20];
// Order and types must match the tuple definition
// chaiTuple = [30, "ginger"] // ❌ invalid order and types

let userInfo: [string, number, boolean];
// Tuple with three fixed positions
userInfo = ["sg", 30, true];

const location: readonly [number, number] = [28.66, 77.23];
// Readonly tuple — commonly used for coordinates

const chaiItems: [name: string, price: number] = ["Masala", 20];
// Named tuple elements — improves readability but does not change runtime behavior

enum CupSize {
    Small,
    Medium,
    Large,
}
// Numeric enum — values auto-increment starting from 0
const size = CupSize.Medium;

enum Status {
    Pending = 100,
    Served, // 101
    Cancelled, // 102
}
// Numeric enum with custom starting value

enum ChaiType {
    MASALA = "Masala",
    GINGER = "Ginger",
    ELAICHI = "Elaichi",
}
// String enum — safer and more readable for function arguments

function makeChai(type: ChaiType, cups: number) {
    // Function parameters are strongly typed using enums and primitives
    console.log(`Making ${cups} cups of ${type}`);
}
makeChai(ChaiType.MASALA, 3);
// Enum ensures only valid chai types can be passed

enum RandomEnum {
    ID = 1,
    NAME = "chai",
}
// Heterogeneous enum — allowed but generally discouraged for clarity

const enum Sugars {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}
// `const enum` is inlined at compile time — no enum object at runtime

const sugarLevel = Sugars.MEDIUM;
// Compiles to a number directly (performance-friendly)
