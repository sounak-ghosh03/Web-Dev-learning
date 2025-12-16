class Chai {
    flavour: string;
    price: number;
    // Class properties — define the structure of an object created from this class

    constructor(flavour: string, price: number) {
        // Constructor initializes object state when `new` is used
        this.flavour = flavour;
        this.price = price;
    }
    constructor(flavour: string) {
        // ❌ In TypeScript, constructor overloading is done via signatures,
        // but only ONE implementation is allowed.
        // This shows the *idea* of overloading, but is not valid TS.
        this.flavour = flavour;
        console.log(this);
    }
}
const masalaChai = new Chai("masala", 20);
// `new` creates an instance of the class
masalaChai.flavour = "ginger";
masalaChai.price = 20;
// Public properties can be modified from outside

class Chai {
    public flavour: string = "Masala";
    // `public` is default — accessible everywhere

    private secretIngredients = "Cardamom";
    // `private` — accessible only inside the class

    reveal() {
        return this.secretIngredients; // ok: accessed within the class
    }
}
const c = new Chai();
console.log(c.reveal());
// c.secretIngredients ❌ not accessible outside

class Shop {
    protected shopName = "Chai corner";
    // `protected` — accessible in the class and its subclasses
}

class Branch extends Shop {
    getName() {
        return this.shopName; // allowed because of `protected`
    }
}
new Branch().getName;

class Wallet {
    #balance = 400;
    // ECMAScript private field — enforced at runtime, not just by TypeScript

    getBalance() {
        return this.#balance;
    }
}
const w = new Wallet();

class Cup {
    readonly capacity: number = 250;
    // `readonly` — value can be set once and cannot be reassigned later

    constructor(capacity: number) {
        this.capacity = capacity; // allowed only inside constructor
    }
}

class ModernChai {
    private _sugar = 2;
    // Convention: `_property` indicates internal/private state

    get sugar() {
        // Getter — accessed like a property: chai.sugar
        return this._sugar;
    }

    set sugar(value: number) {
        // Setter — allows validation before updating internal state
        if (value > 5) {
            throw new Error("Too much sugar ");
        }
        this._sugar = value;
    }
}

const c = new ModernChai();
c.sugar = 3; // setter is invoked here

class EkChai {
    static shopName = "Chai Corner";
    // `static` — belongs to the class itself, not instances

    constructor(public flavour: string) {}
    // Parameter property — shorthand for declaring + assigning a class field
}
console.log(EkChai.shopName);
// Access static members using the class name

abstract class Drink {
    abstract serve(): void;
    // Abstract method — must be implemented by subclasses
}

class MyChai extends Drink {
    serve() {
        // Concrete implementation of abstract method
        console.log("Serving chai");
    }
}

class Heater {
    heat() {}
}
class ChaiMaker {
    constructor(private heater: Heater) {}
    // Dependency Injection — class depends on an abstraction passed via constructor

    make() {
        this.heater.heat();
    }
}
