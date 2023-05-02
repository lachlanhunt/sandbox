// Create a generator function called "fizzbonacci" in TypeScript that accepts 2 parameters
// as the first 2 numbers in Fibonacci sequence.
// The output should follow the rules for FizzBuzz.
// Create an array of length 20 populated with values from this generator.

export function* fizzbonacci(first: number, second: number): Generator<string> {
    let current = second;
    let previous = first;
    while (true) {
        const isFizz = current % 3 === 0;
        const isBuzz = current % 5 === 0;
        if (isFizz && isBuzz) {
            yield "FizzBuzz";
        } else if (isFizz) {
            yield "Fizz";
        } else if (isBuzz) {
            yield "Buzz";
        } else {
            yield current.toString();
        }
        const next = current + previous;
        previous = current;
        current = next;
    }
}

const result = [];
const generator = fizzbonacci(0, 1);
for (let i = 0; i < 20; i++) {
  result.push(generator.next().value);
}

console.log(result);
