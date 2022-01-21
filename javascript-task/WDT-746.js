//initializing an object called person with two properties
const person = {
    firstname: 'John', //firstname - is a key(name) associated with value 'John'
    lastname: 'Doe'
  };
  
  //accessing an object's properties by using two types of syntax
  //using dot property accessor - when we know the variable ahead of time
  console.log(person.firstname);
  // expected output: "John"
  //using square bracket property accessor - when the property name is dynamic
  console.log(person['firstname']);
  // expected output: "John"
  
  //Add, update or delete a property from an existing object
  
  //Add
  person.age = 25;
  //update
  person.lastname = 'Siri';
  console.log(person.lastname);
  // expected output: "Siri"
  
  //delete
  delete person.age; 
