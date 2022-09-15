// currying means creating a new function by presetting parameters of a function to perform a desired task



// currying using bind

let multiply = function(a,b){
    console.log(a*b);
}

let multiplyByTwo = multiply.bind(this, 2);         // value of "a" in multiply function is now fixed to 2
multiplyByTwo(3);

// let multiplyByTwo = multiply.bind(this, 2, 1) 
// multiplyByTwo(3)                                  both a and b are fixed hence 3 will not be considered

// let multiplyByTwo = multiply.bind(this, ) 
// multiplyByTwo(1,2)                                 this will work and give output = 2

let multiplyByFive = multiply.bind(this, 5);  // value of "a" in multiply function is now fixed to 5
multiplyByFive(4);



// currying using closure

function multi(x){
    return function(y){
        console.log(x*y);
    }
}

let multiByThree = multi(3);
multiByThree(4);

let multiByNine = multi(9);
multiByNine(12);