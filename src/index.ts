interface Options {
    name: string;
    description: string;
    Branches: string;
    subject: string;
    age?: number;
    Study: boolean;
}

const Student = {
    name:"Anshuman",
    description:"Panigrahy",
    Branches:"CSE",
    subject:"DBMS",
    age:3,
    Study:true,
}


function identity<T>(value: T) {
    return value;
}

const result1 =identity(100);
console.log(result1);

console.log(typeof result1);
function Students<Options>(value: Options) {
    return value;
}

const result2 =Students(Student);
console.log(result2);
console.log(typeof result2);

