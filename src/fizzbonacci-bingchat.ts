function* fizzbonacci(first: number, second: number) {
    let current = first;
    let next = second;
    while (true) {
      let value = current;
      if (value % 3 === 0 && value % 5 === 0) {
        yield 'FizzBuzz';
      } else if (value % 3 === 0) {
        yield 'Fizz';
      } else if (value % 5 === 0) {
        yield 'Buzz';
      } else {
        yield value;
      }
      [current, next] = [next, current + next];
    }
}

// const fizzbonacciSequence = [...Array(20)].map((_, i) => fizzbonacci(0, 1).next().value);
// console.log(fizzbonacciSequence);

const fizzbonacciGenerator = fizzbonacci(0, 1);
const fizzbonacciArray = Array.from({ length: 20 }, () => fizzbonacciGenerator.next().value);
console.log(fizzbonacciArray);
