let obj = {
    num:2
}

let add = function(a,b,c){
    return a+b+this.num+c;
}

// call is used to call a function as a object method
console.log(add.call(obj,3,4,5));

// apply is used to send multiple function parameters as an array
let arr = [1,2,3];
console.log(add.apply(obj,arr));

// bind is used to bind an object with any method
let bound = add.bind(obj);
console.log(bound(1,-2,3));


// example problem
let Student = {
    age:20
}

let show = function()
{
console.log(this.age);
}
    
let binded = show.bind(Student);
binded();