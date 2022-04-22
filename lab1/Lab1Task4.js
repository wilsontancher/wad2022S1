function greeter(name, greeting) {
    console.log(greeting(name));
}

var japGreeting = function(name){
  return "Ohayo, "+name;
};
var koreanGreeting = function(name){
  return "Annyeong, "+name; 
};
greeter("Jason", japGreeting );
greeter("Tom", koreanGreeting );