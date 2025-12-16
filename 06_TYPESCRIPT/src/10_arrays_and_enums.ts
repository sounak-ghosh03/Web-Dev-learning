const chaiFlavours: string[] = ["Masala", "ginger", "Elaichi"];
const chaiPrice: number[] = [20, 30, 40];

const rating: Array<number> = [4, 5, 4.5];

type Chai = {
    name: string;
    price: number;
};
const menu: Chai[] = [
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
t.push("lol");

const cities: readonly string[] = ["Delhi", "Mumbai", "Bangalore"];
// cities.push("Hyderabad");

const table: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

let chaiTuple: [string, number];
chaiTuple = ["Masala", 20];
// chaiTuple=[30, "ginger"]

let userInfo: [string, number, boolean];
userInfo = ["sg", 30, true];

const location: readonly [number, number] = [28.66, 77.23];

const chaiItems: [name: string, price: number] = ["Masala", 20];

enum CupSize {
    Small,
    Medium,
    Large,
}
const size = CupSize.Medium;

enum Status {
    Pending = 100,
    Served, //101
    Cancelled, //102
}

enum ChaiType {
    MASALA = "Masala",
    GINGER = "Ginger",
    ELAICHI = "Elaichi",
}

function makeChai(type: ChaiType, cups: number) {
    console.log(`Making ${cups} cups of ${type}`);
}
makeChai(ChaiType.MASALA, 3);

enum RandomEnum {
    ID = 1,
    NAME = "chai",
}

const enum Sugars {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

const sugarLevel = Sugars.MEDIUM;
