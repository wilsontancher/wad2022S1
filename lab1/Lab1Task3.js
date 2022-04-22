function getBmi(height, weight) {
    var bmi = (weight) / (height * height);
    return bmi;
}

function getCategory(bmi) {
    if (bmi < 18.5) {
        return "Thin";
    } else if (bmi < 25) {
        return "Normal";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

var bmi = getBmi(1.65,55);
console.log(bmi);
console.log(getCategory(bmi));



var celsiusToFahrenheit = function (temp) {
    return temp * 9 / 5 + 32;
};
var celsius = 30;

console.log(celsius+" degree celsius = " + celsiusToFahrenheit(celsius) + " fahrenheits");
