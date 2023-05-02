function* fizzbonacci(a: number, b: number): Generator<number | string, never, never> {
    while (true) {
      let c = a + b;
      a = b;
      b = c;
      let value: string | number = c;
  
      if (c % 3 === 0 && c % 5 === 0) {
        value = "FizzBuzz";
      } else if (c % 3 === 0) {
        value = "Fizz";
      } else if (c % 5 === 0) {
        value = "Buzz";
      }
  
      yield value;
    }
  }
  
  const firstNumber: number = 1;
  const secondNumber: number = 1;
  const fizzbonacciGenerator = fizzbonacci(firstNumber, secondNumber);
  const fizzbonacciArray: Array<string | number> = [];
  
  for (let i = 0; i < 20; i++) {
    fizzbonacciArray.push(fizzbonacciGenerator.next().value);
  }
  
  console.log(fizzbonacciArray);
  