// The function that is created inside the other function retains the memory of the parent function

function outer() {
    let counter = 4;
    return function () {
        counter++;
        return counter;
    };
}

let increment = outer();
console.log(increment());
console.log(increment());
console.log(increment());
