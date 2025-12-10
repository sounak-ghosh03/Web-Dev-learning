let subs: number | string = "1M";
// `subs` is a union type: it can hold either a number or a string.
// Union types allow flexibility while still keeping type safety.

let apiRequestStatus: "pending" | "sucess" | "error";
// This is a union of string literals — the variable can ONLY store one of these exact values.
// Helps prevent invalid states (e.g., apiRequestStatus = "random").

// apiRequestStatus = 'sounak' --> throws error ...only allows the provided data

let airlineSeat: "aisle" | "middle" | "window" = "aisle";
// Another string-literal union. Forces valid predefined values.

airlineSeat = "aisle"; // OK — matches union type

const orders = ["12", "13", "14", "28"];
// Array of strings

let currentOrder: string | undefined;
// Union with `undefined` — common when a variable may or may not be assigned.
// Always prefer unions over `any` because `any` turns off type checking.

for (let order of orders) {
    if (order === "28") {
        currentOrder = order; // Here, type is safely narrowed to string.
        break;
    }
}

// currentOrder = '42' --> problematic if '42' isn't in allowed data but TS won't catch it since type is still string | undefined.
// Avoiding `any` ensures TS continues to enforce valid operations.

console.log(currentOrder);
