//using if else statement
//declaring a variable that we'll use it in our if statement
const hour = new Date().getHours(); 
let greeting;

if (hour < 18) {
  greeting = "Good day"; // to be executed if the condition is true
} else {
  greeting = "Good evening"; // to be executed if the condition is false
}
console.log(greeting);

//using else if
const hour = new Date().getHours(); 
let greeting;


if (hour < 10) {
    greeting = "Good morning"; //to be executed if condition1 is true
  } else if (hour < 20) {

if (time < 10) {
    greeting = "Good morning"; //to be executed if condition1 is true
  } else if (time < 20) {

    greeting = "Good day"; //to be executed if the condition1 is false and condition2 is true
  } else {
    greeting = "Good evening"; //to be executed if the condition1 is false and condition2 is false
  }
  console.log(greeting);

  //The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy. This operator is frequently used as an alternative to an if...else statement.

const hour = new Date().getHours(); 
let greeting;

    //Ternary operator can be used to replace multiple lines of code with a single line. It is often used to replace simple if else statements

hour < 18 ? (greeting = 'Good day.') : (greeting = 'Good evening.');

console.log(greeting);



