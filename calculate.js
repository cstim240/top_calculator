'use strict';
//this calculator does not evaluate more than a single pair of numbers at a time.
//notes: lots of repeat code from handling click and keyboard events separately.
let num1 = NaN;
let num2 = NaN;
let inputCounter = true; //allows for proper placement of our first two inputs, subsequent operations and operands will be placed in num2
let operator = '';
let onDisplay = ''; //we keep track of our total and current number with this
let decimalPresence = false;
let operatorPresence = false;

//handles click events on number buttons
const btn = document.querySelectorAll(".digits");
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

//handles click event on decimal button
const decimal = document.querySelector(".decimal");
decimal.addEventListener('click', () => {
    if (!decimalPresence){
        onDisplay += '.';
        displayValue(onDisplay);
        decimalPresence = true;
    }
});


//handles click event on DEL button
const backspace = document.querySelector(".backspace");
backspace.addEventListener('click', () => {
    undo();
})

//handles click events on operator buttons
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

//handles click event for '=' button
const compute = document.querySelector(".compute");
compute.addEventListener('click', function(){
    operatorPresence = true;
    if (operatorPresence){
        if (isNaN(num1) || isNaN(num2)){
            document.querySelector(".main_display").value = 'ERROR';
            setTimeout(() => {clearValues();}, 1000);  //shows the error message and delays implementing the clearValues() functions by 1 second, 
        } else {
            displayValue(operate(operator, num1, num2));
            num1 = operate(operator, num1, num2);
            onDisplay = num1;
        }
    }
    
});

//handles click event for 'AC' button
const clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    clearValues();
});

//operation funcs
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
        document.querySelector(".main_display").value = 'ERROR';
        setTimeout(() => {clearValues();}, 1000);
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
    operatorPresence = false;
    document.querySelector(".main_display").value = '';
}

//DEL func to be called, accounts for decimal at the end 
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

    if (inputCounter){
        num1 = onDisplay;
        displayValue(num1);
    } else {
        num2 = onDisplay;
        displayValue(num2);
    }
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
            if (num2 == 0){
                document.querySelector(".main_display").value = 'ERROR';
                setTimeout(() => {clearValues();}, 1000);
            }
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

//Keyboard support - START ------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const activeElement = document.activeElement; //property which returns the currently focused element within the document. It represents the element that would receive keyboard input or be the target of any keyboard events
    // in this context, we focus on the keydown event

    if (activeElement.tagName === 'INPUT' && key === 'Backspace'){ // INPUT checks if the active element is an input field. If it is and the backspace key is pressed
        //the code will skip executing the rest of the event handler
        return; //skip executing the rest of the code if backspace is being handled by an input field
    } //this chekc helps avoid interfering with the default behaviour of the backspace key within input fields, ensuring the keydown event is NOT handled twice

    if (key >= '0' && key <= '9'){
        const btnValue = key;
        handleButtonPresses(btnValue); //need to implement
    } else if (isOperatorKey(key) && !isNaN(num1) && !operatorPresence){
        operatorPresence = true;
        const btnValue = getOperatorValue(key);
        handleOperatorPresses(btnValue);
        onDisplay = '';
    } else if (key === 'Backspace' && !isNaN(num1)) {
        undo();
    } else if (key === 'Enter'){
        if ((isNaN(num1) || isNaN(num2)) || num2 == 0){
            document.querySelector(".main_display").value = 'ERROR';
            setTimeout(() => {clearValues();}, 1000);  //shows the error message and delays implementing the clearValues() functions by 1 second, 
        } else {
            num1 = operate(operator, num1, num2);
            onDisplay = num1;
            displayValue(onDisplay);
            operatorPresence = false;
        }
    } else if (key === '.' && !isNaN(num1)){
        if (!decimalPresence){
            onDisplay += '.';
            decimalPresence = true;
        }
    } else {
        onDisplay = '';
        //displayValue(onDisplay);
    }
});

function isOperatorKey(key){
    return key === '+' || key === '-' || key === '*' || key === '/';
}

function handleButtonPresses(btnValue){
    onDisplay += btnValue; //we add the btnValue to onDisplay, in case we want a number with more than 1 digit
    if (inputCounter){ 
        num1 = parseFloat(onDisplay);
    } else {
        num2 = parseFloat(onDisplay);
    }
}

function getOperatorValue(key){
    switch (key) {
        case '+':
            return 'add';
            break;
        case '-':
            return 'subtract';
            break;
        case '*':
            return 'multiply';
            break;
        case '/':
            return 'divide';
            break;
        default:
            break;
    }
}

function handleOperatorPresses(btnValue) {
    onDisplay = '';
    operator = btnValue;
    inputCounter = false;
    decimalPresence = false;
}

//keyboard support - END ------------------------------------------------------------------------------------------------------------------------------------------------------