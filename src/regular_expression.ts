const Pattern : RegExp=/cat/g

const text:string ="Lion Belongs to cat Family but it is Big cat";

const Result=Pattern.exec(text);
const Result2 = Pattern.exec(text);
console.log(Result)
console.log(Result2)