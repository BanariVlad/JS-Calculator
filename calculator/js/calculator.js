class Calculator {
  constructor(prevOperand, currentOperand) {
    this.prevOperandText = prevOperand;
    this.currentOperandText = currentOperand;
    this.prevOperand = '';
    this.currentOperand = '';
  }

  clear() {
    this.currentOperandText.innerText = '';
    this.prevOperandText.innerText = '';
    this.prevOperand = '';
    this.currentOperand = '';
  }

  clearOne() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  addNumber(number) {
    if (number === "." && this.currentOperand.includes('.')) {
      return 0;
    } else if (this.currentOperand.length > 10) {
      return 0;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      return 0;
    }
    if (this.prevOperand !== '') {
      this.calculate();
    }
    this.prevOperand = this.currentOperand;
    this.currentOperand = '';
    this.operation = operation;
  }

  calculate() {
    let calculation;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return 0;
    }
    switch (this.operation) {
      case '+':
        calculation = prev + current;
        break;
      case '-':
        calculation = prev - current;
        break;
      case '*':
        calculation = prev * current;
        break;
      case '/':
        if (current !== 0) {
          calculation = prev / current;
        } else {
          calculation = 'Error'
        }
        break;
    }
    if (calculation.toString().includes('.')) {
      this.currentOperand = calculation.toFixed(5);
    } else {
      this.currentOperand = calculation;
    }
    this.operation = undefined;
    this.prevOperand = '';
  }

  showNumbers() {
    this.currentOperandText.innerText = this.currentOperand;
    this.prevOperandText.innerText = this.prevOperand;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const prevOperand = document.querySelector('.prevOperand');
  const currentOperand = document.querySelector('.currentOperand');
  const equal = document.querySelector('.equal');
  const clear = document.getElementById('clear');
  const clearOne = document.getElementById('clearOne');
  const calculator = new Calculator(prevOperand, currentOperand);

  const numbers = document.querySelectorAll('[data-number]');
  numbers.forEach(number => {
    number.addEventListener('click', () => {
      calculator.addNumber(number.innerText);
      calculator.showNumbers();
    })
  });

  const operations = document.querySelectorAll('[data-operation]');
  operations.forEach(operation => {
    operation.addEventListener('click', () => {
      calculator.chooseOperation(operation.innerText);
      calculator.showNumbers();
    })
  });

  equal.addEventListener('click', () => {
    calculator.calculate();
    calculator.showNumbers();
  })

  clear.addEventListener('click', () => {
    calculator.clear();
  })

  clearOne.addEventListener('click', () => {
    calculator.clearOne();
    calculator.showNumbers();
  })
})
