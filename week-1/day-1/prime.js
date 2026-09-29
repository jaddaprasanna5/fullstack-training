function isPrime(num){
    if(num <= 1) return `${num} is Not a Prime`;
    for(let i = 2; i<num; i++){
        if(num % i === 0) return `${num} is Not a Prime`;
    }
    return `${num} is a Prime`;
}
console.log(isPrime(7));
console.log(isPrime(10));
