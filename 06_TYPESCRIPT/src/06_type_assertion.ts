let response: any = "42";

// `any` disables type checking — you can do anything with it (unsafe).
let numericLength: number = (response as string).length;
// `as` is a type assertion. It tells TypeScript "treat this value as a string" but it
// does NOT perform any runtime conversion or checks. If `response` weren't actually a string,
// this could still fail at runtime.
// Note: don't confuse assertion with runtime conversion (e.g., Number("42")).

type Book = {
    name: string;
};

let bookString = '{"name":"harry potter"}';
let bookObject = JSON.parse(bookString) as Book;
// Casting the result of JSON.parse is common, but risky: JSON.parse returns `any`/`unknown` at runtime.
// Using `as Book` asserts the shape to TypeScript, but you should validate the parsed object in
// production code if the input could be untrusted.

console.log(bookObject);

const inputElement = document.getElementById("username") as HTMLInputElement;
// Asserting DOM elements is common when you know the element exists and its type.
// If the element isn't present at runtime, `inputElement` could be `null` and cause runtime errors.

let value: any;

value = "tea";
value = [1, 2, 3, 4];
value = 2.5;
value.toUpperCase();
// Because `value` is `any`, TypeScript allows calling `toUpperCase()` even though `value` might not be a string.
// This removes safety — avoid `any` when possible.

let newvalue: unknown;

newvalue = "tea";
newvalue = [1, 2, 3, 4];
newvalue = 2.5;
// newvalue.toUpperCase() // Error: `unknown` cannot be used directly. You must narrow it first.

if (typeof newvalue === "string") {
    // Type guard narrows `unknown` to `string` inside this block, allowing string methods safely.
    newvalue.toUpperCase();
}

try {
} catch (error) {
    // `catch` parameter is `unknown` by default in TypeScript, so narrow it before using.
    if (error instanceof Error) {
        // `instanceof Error` narrows `error` to Error, so `.message` is safe to access.
        console.log(error.message);
    }
    console.log(error);
}

const data: unknown = "tea";
const strData: string = data as string;
// Here we assert `data` is a string — again, this is a compile-time hint only. Prefer runtime checks when needed.

type Role = "admin" | "user";

function redirectBasedOnRole(role: Role): void {
    if (role === "admin") {
        console.log("redirecting to admin dashboard");
        return;
    }
    if (role === "user") {
        console.log("redirecting to user dashboard");
        return;
    }
    role; // This line is unreachable because `role` is a union of the two handled literals.
    // If you had an unhandled case, you could use `never` to ensure exhaustiveness checks.
}

function neverReturn(): never {
    // `never` denotes a function that never returns (e.g., infinite loop or always throws).
    while (true) {}
}
