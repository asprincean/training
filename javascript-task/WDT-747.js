//setting up the array
const gas = [20, 40, 100, 30]
const food = [10, 40, 20, 30]

//declaring a function that will calculate how much i am spending using for...lop and if statement
function calculateTotal(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++){
      total += arr[i];
    }
  if (total > 100){
    console.log(`Hey! You are spending too much`);
    return total;
  }
    console.log(`You are good! Total is less than 100`);
    return total;
}

const gasTotal = calculateTotal(gas);
const foodTotal = calculateTotal(food);

//creating a group of console.log as an object to print variables
console.log({
  gas: gasTotal,
  food: foodTotal,
});

//push, pop, unshift and shift

//using push we can add an item to the end
let newPriceList = gas.push(25)
//using pop we can remove an item from the end 
let removeLast = gas.pop()

//using unshift we can add an item to the beginning
let addBeginning = food.unshift(65);

//using shit we can remove an item from the beginning
let removeBeginning = food.shift();
//splice and slice

//using splice we can remove an item by index position
let removedItem = gas.splice(1)
//using slice we can return selected elements in an array, as a new array
const newgas = gas.slice(1, 3)

//map and sort

//map - return a new array with the square root of all element values
const newArr = gas.map(Math.sqrt)

//sort -  sorts the elements of an array
console.log(gas.sort())

//indexOf, lastIndexOf and includes

//indexOf - method returns the first index at which a given element can be found in the array
console.log(food.indexOf(40));

//lastIndexOf - method returns the last index at which a given element can be found in the array
console.log(food.indexOf(50));

//includes - method determines whether an array includes a certain value among its entries, returning true or false as appropriate
console.log(gas.includes(20));

//find, findIndex and filter 

//find - method returns the value of the first element in the provided array that satisfies the provided testing function
const found = gas.find(element => element > 15);

//findIndex - method returns the index of the first element in the array that satisfies the provided testing function
const isLargeNumber = (element) => element > 15;
console.log(food.findIndex(isLargeNumber));

//filter - method creates a new array with all elements that pass the test implemented by the provided function
const result = gas.filter(checkPrices);
function checkPrices(gas) {
  return gas >= 18;
}