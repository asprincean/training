//the below block of code will calculate the dimensions of an wall in cm (1 inc = 2.54 cm)
//declaring the function
function calculate(value){
    return value * 2.54;
};
const width = calculate(100); //calling the function with width value of 100
const height  = calculate(120); //calling the function with height value of 120

const dimensions = [width, height]; 
console.log(dimensions); //return an array with new dimensions in cm 
//expected output: [254, 304.8]

//the same function written with arrow function expression
let calculate = value => value * 2.54;

//object method
let person = {
    firstName: 'John',
    lastName: 'Doe',

    //defining the method getFullName() that returns the full name of the person object by concatenating the first name and last name.
    getFullName: function () {
        return this.firstName + ' ' + this.lastName;
    }
};

console.log(person.getFullName());
//expected output: John Doe