// Suggested answer for movies object
var movies = {favourites:[
    {
        photos: "image1.jpg",
        name: "",
        synopsis: "",
        details: {
            cast: "",
            director: "",
            genre: "",
            release: "",
            runningTime: "",
            distributor: "",
            language: ""
        }
    },
    {
        photos: "image2.jpg",
        name: "",
        synopsis: "",
        details: {
            cast: "",
            director: "",
            genre: "",
            release: "",
            runningTime: "",
            distributor: "",
            language: ""
        }
    },

    {
        photos: "image3.jpg",
        name: "",
        synopsis: "",
        details: {
            cast: "",
            director: "",
            genre: "",
            release: "",
            runningTime: "",
            distributor: "",
            language: ""
        }
    }
]};

/* Ways to Print out the information of movies.favourites, 
which is an array */

var favourites = movies.favourites;


//using for loop
console.log("-- Using for Loop --")
for(let i=0;i<favourites.length;i++){
    console.log(JSON.stringify(favourites[i]));
}

//Using for of loop
console.log("\n\n-- Using for of Loop --")
for(let favourite of favourites){
    console.log(JSON.stringify(favourite));
}

//forEach() method calls a function for each element in an array
console.log("\n\n-- Using ForEach Loop --")
favourites.forEach(function(currentValue, index){

    console.log("Movie "+index+":"+JSON.stringify(currentValue));
    
})