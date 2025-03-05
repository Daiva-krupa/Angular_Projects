import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  currentInput: string = '';
  result: string = '';

  appendNumber(num: string) {
    this.currentInput += num;
  }

  appendOperator(op: string) {
    if (this.currentInput !== '' && !this.currentInput.endsWith(op)) {
      this.currentInput += op;
    }
  }

  clear() {
    this.currentInput = '';
    this.result = '';
  }

  deleteLast() {
    this.currentInput = this.currentInput.slice(0, -1);
  }

  calculate() {
    try {
      this.result = eval(this.currentInput);
    } catch (error) {
      this.result = 'Error';
    }
  }
}
