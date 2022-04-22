//1.1

//Sub Item 1-3
var toy = { "color": "red", "size": 5, "soft": true };
console.log(toy);
console.log(toy["color"]);
console.log(toy.color);


//Sub Item 4
var toy = {};
toy.name = "Cardboard Box";
toy.tags = ["imagination", "recyclable", "cats"];
toy.size = {
    "units": "inches",
    "width": 10,
    "height": 5,
    "depth": 3
};
toy.quanity = 2;
console.log(toy.tags[1]);
console.log(toy.size.units);


//Sub Item 5
var toy1 = { "color": "red", "size": 5, "soft": true };
var toy2 = toy1;

console.log(toy1.color);
console.log(toy2.color);
toy2.color = "blue";
console.log(toy2.color);
console.log(toy1.color);

//1.2
var ward = {
    "beds": [
        {
            "number": 1,
            "status": "available"
        },
        {
            "number": 2,
            "status": "occupied"
        }
    ],
    "location": "B2",
    "number": "34",
    "status": "available"
};


