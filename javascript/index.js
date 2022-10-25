class Calculator {
    constructor(displayPrevious, displayCurrent) {
        this.displayPrevious = displayPrevious;
        this.displayCurrent = displayCurrent;
        this.clear();
    }
    clear() {
        this.currentOperand = '' ;
        this.previousOperand = '' ;
        this.operator = undefined ;
        this.displayCurrent.innerText = this.currentOperand;
        this.displayPrevious.innerText = this.previousOperand;
    }
    delete() {
        if (this.currentOperand == '') {
            this.clear();
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand += number;

    }
    operation(operator) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand != '') {
            this.calculate();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) {
            return;
        }
        switch (this.operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operator = undefined;
        this.previousOperand = 'hello';
    }
    updateDisplay() {
        this.displayCurrent.innerText = this.currentOperand;
        if (this.operator != null) {
            this.displayPrevious.innerText = `${this.previousOperand} ${this.operator}`;
        }
    }
}

const numberBtn = document.querySelectorAll('.number');
const clearAllBtn = document.querySelector('.clear-all');
const deleteBtn = document.querySelector('.delete');
const operationBtn = document.querySelectorAll('.operation');
const equalBtn = document.querySelector('.equal');
const displayPrevious = document.querySelector('.previous');
const displayCurrent = document.querySelector('.current');

const calculator = new Calculator(displayPrevious, displayCurrent);
numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operation(button.innerText);
        calculator.updateDisplay();
    })
});
equalBtn.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
});
clearAllBtn.addEventListener('click', button => {
    calculator.clear();
    // calculator.updateDisplay();
});
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
