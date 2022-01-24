//while
//A while statement executes its statements as long as a specified condition evaluates to true.
let count = 1;
while (count < 10) {
    console.log(count);
    count +=2;
}
//expected output: 1 3 5 7 9

//The for loop statement creates a loop with three optional expressions. for(initializer; condition; iterator)
//The following example uses the for loop statement to show numbers from 1 to 4 to console
for (let i = 1; i < 5; i++) {
    console.log(i);
  }

//expected output: 1 2 3 4

//The for...of statement creates a loop iterating over iterable objects, including: built-in String, Array, array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables. It invokes a custom iteration hook with statements to be executed for the value of each distinct property of the object.
let colors = ['Red', 'Green', 'Blue'];

for (const [index, color] of colors.entries()) {
    console.log(`${color} is at index ${index}`);
}

//expected output - Red is at index 0
//Green is at index 1
//Blue is at index 2

//break - terminates the current loop, switch, or label statement and transfers program control to the statement following the terminated statement.

for (let i = 0; i < 5; i++) {
    console.log(i);
    if (i == 2) {
      break;
    }
  }

  //expected output 0 1 2



