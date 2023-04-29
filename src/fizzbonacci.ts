// Create a generator function called "fizzbonacci" in TypeScript that accepts 2 parameters
// as the first 2 numbers in Fibonacci sequence.
// The output should follow the rules for FizzBuzz.
// IF a value is divisible by 3, print "Fizz". IF a value is divisible by 5, print "Buzz".
// IF a value is divisible by both 3 and 5, print "FizzBuzz".
// Create an array of length 20 populated with values from this generator.

function* fizzbonacci(first: number, second: number) {
    let [prev, curr] = [first, second];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const fb = fizzbonacci(1, 1);
const arr = Array.from({ length: 20 }, () => {
    const val = fb.next().value;
    if (val % 3 === 0 && val % 5 === 0) return "FizzBuzz";
    if (val % 3 === 0) return "Fizz";
    if (val % 5 === 0) return "Buzz";
    return val;
});
console.log(arr);
