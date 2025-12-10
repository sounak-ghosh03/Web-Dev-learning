type ChaiOrder = {
    type: string;
    sugar: number;
    strong: boolean;
};

function makeChai(order: ChaiOrder) {
    console.log(order);
}

function serveChai(order: ChaiOrder) {
    console.log(order);
}

type TeaRecipe = {
    water: number;
    milk: number;
};

class MasalaChai implements TeaRecipe {
    water = 100;
    milk = 50;
}

interface CupSize {
    size: "small" | "medium" | "large";
}
class Chai implements CupSize {
    size: "small" | "medium" | "large" = "small";
}

// type Response= {ok:true}|{ok:false}
// class myRes implements Response {
//     ok :boolean =true;
// }

type TeaType = "masala" | "green" | "herbal";

function orderChai(t: TeaType) {
    console.log(t);
}

type Base = { teaLeaves: number };
type Extra = { masala: number };
type Masala = Base & Extra;

const cup: Masala = {
    teaLeaves: 3,
    masala: 1,
};

type User = {
    username: string;
    bio?: string;
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
    version: string;
};

const cfg: Config = {
    appname: "sounak",
    version: "1.0",
};

cfg.appname = "chai";
