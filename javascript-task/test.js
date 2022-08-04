function incrementor() {
  let number = 1;

  return function inner() {
    number += 1;
    console.log(`The number is ${number}`);
  };
}

const increment = incrementor();
incrementor();
incrementor();
incrementor();
