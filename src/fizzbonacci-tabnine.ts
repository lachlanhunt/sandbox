// Create a generator function called "fizzbonacci" in TypeScript that accepts 2 parameters
// as the first 2 numbers in Fibonacci sequence.
// The output should follow the rules for FizzBuzz.

function* fizzbonacci(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            yield "FizzBuzz";
        } else if (i % 3 === 0) {
            yield "Fizz";
        } else if (i % 5 === 0) {
            yield "Buzz";
        } else {
            yield i;
        }
    }
}

const result = [];
const generator = fizzbonacci(20);
for (let i = 0; i < 20; i++) {
  result.push(generator.next().value);
}

console.log(result);
