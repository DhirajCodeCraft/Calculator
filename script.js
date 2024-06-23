let display = document.getElementById('display');
let currentNumber = '0';
let previousNumber = '';
let operation = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.innerText = currentNumber;
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
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentNumber = '0.';
        shouldResetDisplay = false;
    } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }
    updateDisplay();
}

function setOperation(op) {
    if (previousNumber !== '' && !shouldResetDisplay) {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function calculate() {
    let result;
    let prev = parseFloat(previousNumber);
    let curr = parseFloat(currentNumber);

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            result = 'Error';
    }
    currentNumber = result.toString();
    previousNumber = '';
    operation = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentNumber = '0';
    previousNumber = '';
    operation = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function calculatePercentage() {
    let curr = parseFloat(currentNumber);
    if (operation === '*' || operation === '/') {
        currentNumber = (curr / 100).toString();
    } else if (operation === '+' || operation === '-') {
        let prev = parseFloat(previousNumber);
        currentNumber = ((prev * curr) / 100).toString();
    }
    shouldResetDisplay = true;
    updateDisplay();
}

function handleEqual() {
    calculate();
}

document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('equals').addEventListener('click', handleEqual);
document.getElementById('percent').addEventListener('click', calculatePercentage);

document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', (e) => appendDigit(e.target.innerText));
});

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', (e) => setOperation(e.target.innerText));
});
