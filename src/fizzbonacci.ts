// Create a generator function called "fizzbonacci" in TypeScript that accepts 2 parameters
// as the first 2 numbers in Fibonacci sequence.
// The output should follow the rules for FizzBuzz.
// If a value is divisible by 3, print "Fizz". IF a value is divisible by 5, print "Buzz".
// If a value is divisible by both 3 and 5, print "FizzBuzz".
// Create an array of length 20 populated with values from this generator.

function* fizzbonacci(first: number, second: number) {
  let firstNumber = first;
  let secondNumber = second;
  while (true) {
    yield firstNumber;
    firstNumber = secondNumber;
    secondNumber = firstNumber + secondNumber;
  }
}
const fizzbonacciGenerator = fizzbonacci(1, 1);
const fizzbonacciArray = Array.from({ length: 20 }, () => fizzbonacciGenerator.next().value);
console.log(fizzbonacciArray);
