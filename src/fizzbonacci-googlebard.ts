function* fizzbonacci(a: number, b: number) {
    let i = 0;
    while (i < 20) {
        let c = a + b;
        a = b;
        b = c;
        if (c % 3 === 0 && c % 5 === 0) {
            yield "FizzBuzz";
        } else if (c % 3 === 0) {
            yield "Fizz";
        } else if (c % 5 === 0) {
            yield "Buzz";
        } else {
            yield c;
        }
        i++;
    }
}

const array = [...fizzbonacci(0, 1)];
console.log(array)
