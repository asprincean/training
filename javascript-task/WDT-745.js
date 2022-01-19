//Primitive data types: String, number, null, boolean
const people = [
    {name: 'Sam', age: 35, position: 'data analyst'},
  ];
  
//The value null represents the intentional absence of any object value.
const rect = null;
const square = {
    dimension: 10
};

console.log(rect === null); //true
console.log(square === null);//false

//boolean is often used in conditional testing.
let x = 5;
let y = 5;
let z = 6;

console.log((x == y) + ' ' + (x == z));

//undefined - is a variable without a value

let x;

//Undefined indicates a very specific use case. 
//It means that the value is not initialized, and you don't know what the value is. 
//The problem is you would not want to get "undefined" as an output while working with your code unless it indicates a problem that is tied up to the lack of assignment

//The typeof operator returns the type of a variable or an expression
console.log(typeof 42);
// expected output: "number"

console.log(typeof 'blubber');
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"

console.log(typeof undeclaredVariable);
// expected output: "undefined"