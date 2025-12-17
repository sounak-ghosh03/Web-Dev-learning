function wrapInArray<T>(item: T): T[] {
    // Generic function: `T` is a type parameter decided at call time.
    // Whatever type comes in as `item`, the same type is preserved in the returned array.
    return [item];
}

wrapInArray("hello");
// T is inferred as `string`
wrapInArray(42);
// T is inferred as `number`
wrapInArray({ name: "sounak" });
// T is inferred as `{ name: string }`

function pair<A, B>(a: A, b: B): [A, B] {
    // Multiple generics: `A` and `B` can be different types.
    // Return type preserves the exact order and types as a tuple.
    return [a, b];
}

pair("masala chai", 20);
// A = string, B = number
pair(42, 20);
// A = number, B = number
pair({ name: "sounak" }, 20);
// A = object, B = number

interface Box<T> {
    // Generic interface: `T` defines the type of `contents`.
    contents: T;
}
const numberBox: Box<number> = {
    // Here `T` is `number`
    contents: 42,
};
const numberBox1: Box<string> = {
    // Reusing the same interface with a different type
    contents: "hello",
};

interface ApiPromise<T> {
    // Generic interfaces are useful for API responses where `data` shape varies
    status: number;
    data: T;
}

const apiPromise: ApiPromise<{ name: string }> = {
    // `T` is explicitly provided as `{ name: string }`
    status: 200,
    data: { name: "sounak" },
};
