function displayMessage() {
  alert("5 seconds have passed!");
}

setTimeout(displayMessage, 5000);

var time = 10;
setInterval(countdown, 1000);

function countdown() {
  console.log(time--);
}

var time = 10;
var interval = setInterval(countdown, 1000);

function countdown() {
  console.log(time--);
  if (time == 0) {
      clearInterval(interval);
  }
}