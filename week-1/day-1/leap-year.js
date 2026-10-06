function isLeapYear(year){
    if(year % 400 === 0){
        return `${year} is a Leap Year`;
    }else if(year % 100 === 0){
        return `${year} is Not a Leap Year`;
    }else if (year % 4 === 0){
        return`${year} is a Leap Year`;
    }else{
        return`${year} is Not a Leap Year`;
    }
}
console.log(isLeapYear(2000));
console.log(isLeapYear(1900));
console.log(isLeapYear(2024));
console.log(isLeapYear(2023));


