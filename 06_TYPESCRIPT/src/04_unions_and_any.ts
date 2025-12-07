let subs: number | string = "1M";

let apiRequestStatus: "pending" | "sucess" | "error";

// apiRequestStatus='sounak' --> throws error ...only allows the provided data

let airlineSeat: "aisle" | "middle" | "window" = "aisle";

airlineSeat = "aisle";

const orders = ["12", "13", "14", "28"];
let currentOrder: string | undefined; //always avoid any in datatype unless absolutely necessary

for (let order of orders) {
    if (order === "28") {
        currentOrder = order;
        break;
    }
}
// currentOrder='42' problematic code
console.log(currentOrder);
