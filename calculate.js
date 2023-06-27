'use strict';
//this calculator does not evaluate more than a single pair of numbers at a time.
let num1 = NaN;
let num2 = NaN;
let inputCounter = true; //allows for proper placement of our first two inputs, subsequent operations and operands will be placed in num2
let operator = '';
let onDisplay = ''; //we keep track of our total and current number with this
let decimalPresence = false;

const btn = document.querySelectorAll(".numbers .digits");
btn.forEach(function(button){ //adds an eventlistener to each button belonging under the numbers and digits class
    button.addEventListener('click', function(){
        let btnValue = this.value; //refers to the value of the button ~ from html 
        onDisplay += btnValue; //we add the btnValue to onDisplay, in case we want a number with more than 1 digit

        if (inputCounter){ 
            num1 = parseFloat(onDisplay);
        } else {
            num2 = parseFloat(onDisplay);
        }
        
        displayValue(onDisplay);
    });
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener('click', () => {
    if (!decimalPresence){
        onDisplay += '.';
        displayValue(onDisplay);
        decimalPresence = true;
    }
});

const backspace = document.querySelector(".backspace");
backspace.addEventListener('click', () => {
    undo();
})

const operators = document.querySelectorAll(".operation");
operators.forEach(function(button) {
    button.addEventListener('click', function(){
        let btnValue = this.value;
        operator = btnValue;
        inputCounter = false;
        decimalPresence = false;
        displayValue(onDisplay);
        onDisplay = ''; //we empty the onDisplay to make room for our next number or final total via compute
    });
});

const compute = document.querySelector(".compute");
compute.addEventListener('click', function(){
    if (isNaN(num1) || isNaN(num2)){
        document.querySelector(".main_display").value = 'Enter at least TWO #s!';
    } else {
        displayValue(operate(operator, num1, num2));
        num1 = operate(operator, num1, num2);
        onDisplay = num1;
    }
});

const clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    clearValues();
});

function add(num1, num2){
    return num1 + num2; 
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 == 0){
        document.querySelector(".main_display").value = 'div by 0 is NOT allowed!';
    } else {
        return num1 / num2;
    }
}

function clearValues(){
    num1 = NaN;
    num2 = NaN;
    operator = '';
    onDisplay = '';
    inputCounter = true;
    decimalPresence = false;
    document.querySelector(".main_display").value = '';
}

function undo(){
    let newDisplay = '';
    if (onDisplay.length > 0){
        let lastDigit = onDisplay.charAt(onDisplay.length - 1);
        if (lastDigit == '.'){ //resets decimalPresence var if the last digit is a decimal
            decimalPresence = false;
        }
        newDisplay = onDisplay.substring(0, onDisplay.length - 1);
    }
    onDisplay = newDisplay;
    displayValue(onDisplay);
}

function operate(operator, num1, num2){
    switch(operator){
        case 'add':
            return add(num1, num2);
            break;
        case 'subtract':
            return subtract(num1, num2);
            break;
        case 'multiply':
            return multiply(num1, num2);
            break;
        case 'divide':
            return divide(num1, num2);
            break;
        default:
            break;
    }
}


function displayValue(value){
    let mainView = document.querySelector(".display .main_display");
    mainView.value = value;
}