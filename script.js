const formula = document.querySelector("#formula");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");

const nine = document.querySelector("#nine");
const eight = document.querySelector("#eight");
const seven = document.querySelector("#seven");
const six = document.querySelector("#six");
const five = document.querySelector("#five");
const four = document.querySelector("#four");
const three = document.querySelector("#threey");
const two = document.querySelector("#two");
const one = document.querySelector("#one");
const zero = document.querySelector("#zero");

const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");

const decimal = document.querySelector("#decimal");
const equals = document.querySelector("#equals");

const digitsArr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const operatorsArr = ["+", "-", "*", "/"];

endsWithOperator = new RegExp(/[.\+\-*\/]$/);
hasTwoDecimal = new RegExp(/(\d+\.\d+)$/);
endsWithMinus = new RegExp(/[-]$/);
hasEqualSign = new RegExp(/[=]/);

// endsWithTwoMinus = new RegExp(/([-]{2})$/);

document.addEventListener("click", function (e) {

  if (e.target.id == "clear") {
    formula.innerText = "";
    display.innerText = "0";
  }

  if (digitsArr.includes(e.target.id)) {

    if (display.innerText == "0"
          || display.innerText == "NUMBER TOO LARGE") {
      display.innerText = "";
    }
    // if (display.innerText.length > 16) {
    //   display.innerText = "NUMBER TOO LARGE";
    // }
    if (hasEqualSign.test(formula.innerText)) {
      formula.innerText = e.target.innerText;
      display.innerText = e.target.innerText;
    } else {
      formula.innerText += e.target.innerText;
      display.innerText += e.target.innerText;
    }
  }

  if (operatorsArr.includes(e.target.innerText) &&
    hasEqualSign.test(formula.innerText)) {
    formula.innerText = display.innerText +
      e.target.innerText;
    display.innerText = e.target.innerText;
  }

  if (operatorsArr.includes(e.target.innerText) &&
    endsWithOperator.test(formula.innerText) &&
    e.target.innerText != "-") {
    display.innerText = e.target.innerText;
    formula.innerText =
      formula.innerText.replace(/[.\+\-*\/]+$/,
        e.target.innerText);
  } else if (operatorsArr.includes(e.target.innerText) &&
    !endsWithMinus.test(formula.innerText) &&
    formula.innerText != "") {
    display.innerText = e.target.innerText;
    formula.innerText += e.target.innerText;
  } else if (formula.innerText == "" &&
    e.target.innerText == "-") {
    display.innerText = e.target.innerText;
    formula.innerText += e.target.innerText;
  }

  if (e.target.innerText == "." &&
    hasEqualSign.test(formula.innerText)) {
    formula.innerText = "0.";
    display.innerText = "0.";
  } else
  if (e.target.innerText == "." &&
    !endsWithOperator.test(formula.innerText) &&
    !hasTwoDecimal.test(formula.innerText)) {
    formula.innerText += e.target.innerText;
    display.innerText += e.target.innerText;
  }

  if (e.target.innerText == "=" &&
    !hasEqualSign.test(formula.innerText)) {
    display.innerText =
      eval(formula.innerText.replace(/[.\+\-*\/]+$/, ''));
    formula.innerText = formula.innerText + " = " + display.innerText;
  }

});