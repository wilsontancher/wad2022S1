var square = {
    length: 5,
    color: "red",
    getArea: function() {
        return this.length * this.length;
    }
}
console.log(square.getArea());

var square2 = {
    length: 5,
    color: "red",
    getArea: function() {
        return this.length * this.length;
    },
    compare: function(sq) {
        return (this.length==sq.length && this.color==sq.color);
    } 
}

console.log(square2.compare(square));


//additional knowledge
var obj = {
    doSomething: ()=>{
        //some codes
    }
}


var obj = {
    doSomething() {
        //some codes
    }
}


//This example is used to highlight the limitation of using arrow function

var squareArrow = {
    length: 5,
    color: "red",
    getArea:()=> {
        return this.length * this.length;
    },
    compare:(sq)=> {
        return (this.length == sq.length && this.color == sq.color);
    }
}

console.log("\n--Result from squareArrow which uses arrow functions--");
console.log(squareArrow.getArea()); // will get 0 instead of 25
console.log(squareArrow.compare(square)); //will get false instead of true