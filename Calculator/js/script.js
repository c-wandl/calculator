const display = document.getElementById("calculatorInput");

let numbers = [];
let operators = [];

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    numbers = [];
    operators = [];
}

function clearOne() {
    display.value = display.value.slice(0, -1);
}

function negativeNumber() {
    display.value = "-" + display.value;
}

function appendToDisplayOperator(operator) {
    numbers.push(parseFloat(display.value));
    operators.push(operator);
    display.value += operator;
}


function calculate() {
    let text = display.value;
    let number = "";

    numbers = [];
    operators = [];

    for (let i = 0; i < text.length; i++) {
        if ("+-*/^".includes(text[i]) && !(i == 0 && text[i] == "-")) {
            numbers.push(parseFloat(number));
            operators.push(text[i]);
            number = "";
        } else {
            number += text[i];
        }
    }

    numbers.push(parseFloat(number));

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == "*" || operators[i] == "/" || operators[i] == "^") {
            let result;

            if (operators[i] == "*") {
                result = numbers[i] * numbers[i + 1];
            }

            if (operators[i] == "/") {
                if (numbers[i + 1] == 0) {
                    display.value = "Syntax Error";
                    return;
                }
                result = numbers[i] / numbers[i + 1];
            }

            if (operators[i] == "^") {
                result = Math.pow(numbers[i], numbers[i + 1]);
            }

            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }

    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] == "+") {
            result += numbers[i + 1];
        }

        if (operators[i] == "-") {
            result -= numbers[i + 1];
        }
    }

    display.value = result;
}