"use strict";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

const digits = {
  seven: 7,
  eight: 8,
  nine: 9,
  four: 4,
  five: 5,
  six: 6,
  one: 1,
  two: 2,
  three: 3,
  zero: 0
};

const operators = {
  multiply: "*",
  add: "+",
  subtract: "-",
  divide: "/"
};

const performOperation = (num1, num2, operator) => {
 
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      throw new Error("Invalid operator: " + operator);
  }
};

const evaluateExpression = expArray => {
  let stack = [];
  let currNumber = "";
  let prevNumber = "";
  let flag = false;

  for (let i = 0; i < expArray.length; i++) {
    const currDigit = expArray[i];

    if (typeof currDigit === "number" || currDigit == ".") {
      currNumber = currNumber.concat(currDigit);
    } else if (
      currDigit == "+" ||
      currDigit == "-" ||
      currDigit == "*" ||
      currDigit == "/"
    ) {
      if (currNumber) {
        stack.push(parseFloat(currNumber), currDigit);
        currNumber = "";
      } else {
        stack.push(currDigit);
        flag = true;
      }
    } else {
      console.log("nothing to do");
    }
  }
  stack.push(parseFloat(currNumber));
  if (flag) {
    let num1 = "";
    let num2 = "";
    let operator = "";
    let result = "";

    while (stack.length > 1) {
      num2 = stack.pop();
      console.log("outside num2", num2);
      operator = stack.pop();
      console.log("outside operator", operator);
      num1 = stack.pop();
      console.log("outside num1", num1);
      if (operator == "-" && typeof num1 == "string") {
        num2 = operator.concat(num2);
        operator = num1;
        num1 = stack.pop();
      } else if (operator != "-" && typeof num1 == "string") {
        while (typeof num1 != "number") {
          num1 = stack.pop();
        }
      }
      result = performOperation(num1, num2, operator);

      stack.push(result);
    }

    return stack[0];
  } else {
    return eval(stack.join(""));
  }
};

const Display = props => {
  return  (
    React.createElement("div", { className: "screen" }, 
      React.createElement("p", { className: "screentext" }, props.display)));

};

class CustomCalculator extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleDigitClick",

      e => {
        let id = e.target.id;
        if (
          id === "zero" &&
          this.state.display[0] === 0 &&
          this.state.display.length == 1
        ) {
          this.setState({
            display: [0]
          });

        } else if (
          id != "zero" &&
          this.state.display[0] === 0 &&
          this.state.display.length == 1
        ) {
          this.setState({
            display: [digits[id]]
          });

        } else {
          this.setState({
            display: [...this.state.display, digits[id]]
          });

        }
      });
    _defineProperty(this, "handleOperatorClick",

      e => {
        let id = e.target.id;
        let displayLength = this.state.display.length;
        if (this.state.display[0] === 0 && displayLength == 1) {
 
          return;
        } else {
          this.setState({
            display: [...this.state.display, operators[id]]
          });

        }
      });
    _defineProperty(this, "handleDecimalClick",

      () => {
        let displayLength = this.state.display.length;
        let hasDecimal = false;
        if (this.state.display[displayLength - 1] == ".") {
          return;
        } else {
          for (let i = displayLength - 1; i >= 0; i--) {
            if (
              this.state.display[i] == "+" ||
              this.state.display[i] == "-" ||
              this.state.display[i] == "*" ||
              this.state.display[i] == "/"
            ) {
              hasDecimal = false;
              break;
            } else if (this.state.display[i] == ".") {
              hasDecimal = true;
              break;
            }
          }
          if (!hasDecimal) {
            this.setState({
              display: [...this.state.display, "."]
            });

          }
        }
      });
    _defineProperty(this, "handleClearClick",

      () => {
        this.setState({
          display: [0]
        });

      });
    _defineProperty(this, "handlePercentageClick",

      () => {
        const displayValue = parseFloat(this.state.display.join(""));
        const percentageValue = displayValue / 100;
        this.setState({
          display: [percentageValue.toString()]
        });
      });

    _defineProperty(this, "handleResult",

      () => {

        let result = evaluateExpression(this.state.display);

        this.setState({
          display: [result]
        });

      });
    this.state = {
      display: [0]
    };
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePercentageClick = this.handlePercentageClick.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  render() {
    const keyPadDigits = Object.entries(digits).map(([key, value]) => 
      React.createElement("button", {
        onClick: this.handleDigitClick,
        id: key,
        key: value,
        className: "btn b1"
      },

      value));

    const keyPadOperators = Object.entries(operators).map(([key, value]) => 
      React.createElement("button", {
        onClick: this.handleOperatorClick,
        id: key,
        key: value,
        className: "btn btn-primary"
      },

      value));

    return  (
      React.createElement("div", { className: "" }, 
        React.createElement("div", { id: "display", className: "" }, 
          React.createElement(Display, { display: this.state.display })), 

        React.createElement("div", { className: "gr1" }, 
          React.createElement("button", {
            onClick: this.handleClearClick,
            id: "clear",
            className: "btn  acbtn"
          }, "AC"),
          keyPadOperators),

        React.createElement("div", { className: "gr1" },
          keyPadDigits, 
          React.createElement("button", {
            onClick: this.handleDecimalClick,
            id: "decimal",
            className: "btn b1 "
          }, "."),
          
          React.createElement("button", {
            onClick: this.handleResult,
            id: "equals",
            className: "btn equalbtn"
          }, "="))));

  }
}


let domContainer = document.querySelector("#custom-calculator");
ReactDOM.render( React.createElement(CustomCalculator, null), domContainer);
