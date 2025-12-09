function getChai(kind: string | number) {
    if (typeof kind === "string") {
        return `Making ${kind} chai`;
    }
    return `Chai order: ${kind}`;
}

function serve(msg?: string) {
    if (msg) {
        return `Serving ${msg}`;
    }
    return "Serving default masala chai";
}

function order(size: "small" | "medium" | "large" | number) {
    if (size === "small") {
        return "Small chai";
    }
    if (size === "medium") {
        return "Medium chai";
    }
    if (size === "large") {
        return "Large chai";
    }
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
    if (chai instanceof KulhadChai) {
        return chai.serve();
    }
}

type ChaiOrder = {
    type: string;
    sugar: number;
};

function isChaiOrder(obj: any): obj is ChaiOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    );
}

function serveOrder(item: ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`;
    }
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
    if ("spicelevel" in order) {
        //order is masala chai
        return `Brewing masala chai with ${order.spicelevel} spices`;
    }
}

function isStringArray(arr: unknown[]): arr is string[] {
    return arr.every((item) => typeof item === "string");
}
