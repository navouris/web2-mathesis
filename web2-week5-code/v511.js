// δημιουργία αντικειμένων με συνάρτηση-δημιουργό
function Person1 (name) {
  this.name = name;
  this.greeting = function () {
    console.log('Γεια! με λένε ' + this.name + '.');
  };
}
let p1 = new Person('Κώστας');
p1.greeting();
p1.valueOf();

// δημιουργία αντικειμένων με κλάση
class Person2 {
  constructor(name) {
    this.name = name;
  }
  greeting() {
    console.log('Γεια με λένε' + this.name);
  }
}

let p2 = new Person2('Μαρία');
p2.greeting();
p2.valueOf();
