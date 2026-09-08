function greet(x: number, y: number) {
    return x * y;
}

function turn(x:number,y:number,greet: any):void{
    console.log(greet(x,y))
}

turn(5,7,greet)