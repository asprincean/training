// types of operators to compare two values and obtain a boolean result >, <, >=, <=
 
//Greater than (>)	Returns true if the left operand is greater than the right operand.
let a = 10, 
    b = 20; 

console.log(a > b); //false
console.log(b > a); //true

//Less than (<)	Returns true if the left operand is less than the right operand.
let a = 15,
    b = 25;
    
console.log(a < b); //true
console.log(b < a); //false

//Greater than or equal (>=)	Returns true if the left operand is greater than or equal to the right operand.
let a = 10, 
    b = 20; 

console.log(a >= b); //false

//Less than or equal (<=)	Returns true if the left operand is less than or equal to the right operand.
let a = 10, 
    b = 20; 

console.log(a <= b); //true

// == and !=; 
// == Returns true if the operands are equal.
let a = 5;
console.log(a == 10); //false

// != Returns true if the operands are not equal.
let a = 5;
console.log(a != 10); //true

// === and !== 

// === Returns true if the operands are equal and of the same type.
let a = '5';
console.log(a === 5); //false

let b = 5;
console.log(b === 5); //true

//!== Returns true if the operands are not equal and of the same type.
let a  = 6;
console.log(a !== 6); //false

let b = '6';
console.log(a !== 6); //true

//It is considered a good practice to use the type-safe equality operator === and !== instead of == and !=. 
//Use === if you want to compare couple of things in JavaScript, it's called strict equality, it means this will return true if only both type and value are the same, so there wouldn't be any unwanted type correction for you, if you using ==, you basically don't care about the type and in many cases you could face issues with loose equality comparison.

//&&, || - Logical operators are used to determine the logic between variables or values.
//&& - and
let x = 6;
let y = 3;

console.log((x < 10 && y > 1) +  ' ' + (x < 10 && y < 1)); // true false

// || - or

let x = 6;
let y = 3;

console.log((x < 10 || y > 1) +  ' ' + (x < 10 || y < 1)); //true true

//AND and OR work when chained eg. val1 || val2 || val3 or val1 && val2 && val3

// OR "||" finds the first truthy value

const a = 0,
      b = 1,
      c = 3;
      
const check = (a || b || c);
console.log(check); //1

//AND “&&” finds the first falsy value
const a = 0,
      b = 1,
      c = 3;
      
const check = (a & b & c);
console.log(check); //0



//checking different variables types, what will be the result
const x = !!'something';
console.log(x); //true

const a = !!0;
console.log(a); //false

const b = !!1;
console.log(b);//true

const c = !!-0;
console.log(c);//false

const d = !!'';
console.log(d);//false

const e = !![];
console.log(e);//true

const f = !!{};
console.log(f);//true

const g = !!undefined;
console.log(g);//false

const h = !!NaN;
console.log(h);//false

const i = !!null;
console.log(i);//false

//The value passed as the first parameter is converted to a boolean value, if necessary. If the value is omitted or is 0, -0, null, false, NaN, undefined, or the empty string (""), the object has an initial value of false. All other values, including any object, an empty array ([]), or the string "false", create an object with an initial value of true.
