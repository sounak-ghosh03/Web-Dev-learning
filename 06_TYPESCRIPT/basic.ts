function greet (name: string): string {
    return `Hello ${name}`;
}

console.log(greet("Sounak"));
console.log(greet(42));

// output: 
// Hello Sounak
// Hello 42
// the output will be but there will be showing error due to datatype mismatch