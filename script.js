let display = document.getElementById('display');
let currentNumber = '0';
let previousNumber = '';
let operation = '';
let shouldResetDisplay = false;

function updateDisplay(value) {
    display.innerText = value;
}

function appendDigit(digit) {
    if (shouldResetDisplay) {
        currentNumber = digit;
        shouldResetDisplay = false;
    } else {
        if (currentNumber === '0') {
            currentNumber = digit;
        } else {
            currentNumber += digit;
        }
    }
    updateDisplay(currentNumber);
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentNumber = '0.';
        shouldResetDisplay = false;
    } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }
    updateDisplay(currentNumber);
}

function setOperation(op) {
    if (operation && !shouldResetDisplay) {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    shouldResetDisplay = true;
    updateDisplay(previousNumber + " " + operation);
}

function calculate() {
    let result;
    switch (operation) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        default:
            result = 'Error';
    }
    currentNumber = result.toString();
    operation = '';
    previousNumber = '';
    shouldResetDisplay = true;
    updateDisplay(currentNumber);
}

function clearDisplay() {
    currentNumber = '0';
    previousNumber = '';
    operation = '';
    shouldResetDisplay = false;
    updateDisplay(currentNumber);
}