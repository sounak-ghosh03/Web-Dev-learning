let response: any = "42";

let numericLength: number = (response as string).length;
// Number("42") --> not like this

type Book = {
    name: string;
};

let bookString = '{"name":"harry potter"}';
let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject);

const inputElement = document.getElementById("username") as HTMLInputElement;


let value:any

value="tea"
value=[1,2,3,4]
value= 2.5
value.toUpperCase()


let newvalue:unknown

newvalue="tea"
newvalue=[1,2,3,4]
newvalue= 2.5
// newvalue.toUpperCase() not works

if(typeof newvalue==="string"){
    newvalue.toUpperCase()
}

try {
    
} catch (error) {
    if(error instanceof Error){
        console.log(error.message)
    }
    console.log(error)
}


const data:unknown = "tea"
const strData:string=data as string

type Role="admin"|"user"

function redirectBasedOnRole(role:Role):void{
    if(role ==="admin"){
        console.log("redirecting to admin dashboard")
        return
    }
    if(role ==="user"){
        console.log("redirecting to user dashboard")
        return
    }
    role;
}

function neverReturn():never{
    while(true){}
}