const actions = document.querySelector(".actions");
const ans = document.getElementById("input");
ans.value = 0;
let expression = "";
memory = 0;
actions.addEventListener("click", (e) => {
  const value = e.target.value || e.target.parentElement.value;

  if (value !== undefined) {
    ans.value = "";
    switch (value) {
      case "DEG":
      case "RAD":
        degrad();
        break;

      case "fe":
        expression = parseFloat(expression).toExponential();
        forNaN(expression);
        break;

      case "mc":
        memory = 0;
        expression = memory;
        document.getElementById("mc").disabled = true;
        document.getElementById("mr").disabled = true;
        break;

      case "mr":
        let finalans = expression + memory;
        expression = eval(finalans);
        break;

      case "ms":
        memory = expression;
        expression = 0;
        document.getElementById("mc").disabled = false;
        document.getElementById("mr").disabled = false;
        break;

      case "m+":
        memory = memory + expression;
        expression = 0;
        break;

      case "m-":
        memory = memory - expression;
        expression = 0;
        break;

      case "log2":
        expression = Math.log2(expression);
        forNaN(expression);
        break;

      case "rnd":
        expression = Math.random();
        break;

      case "log1p":
        expression = Math.log1p(expression);
        forNaN(expression);
        break;

      case "2^n":
        expression = Math.pow(2, expression);
        forNaN(expression);
        break;

      case "3^n":
        expression = Math.pow(3, expression);
        forNaN(expression);
        break;

      case "n^3":
        expression = Math.pow(expression, 3);
        forNaN(expression);
        break;

      case "3root":
        expression = Math.cbrt(expression);
        forNaN(expression);
        break;

      case "pi":
        let expval = expression.toString().slice(-1);
        if (
          expval === "+" ||
          expval === "*" ||
          expval === "-" ||
          expval === "/" ||
          expval === ""
        ) {
          expression += "3.14159";
        } else {
          expression += "*3.14159";
        }
        break;

      case "ce":
        expression = "";
        ans.value = 0;

        break;

      case "clear":
        expression = expression
          .toString()
          .substring(0, expression.toString().length - 1);
        break;

      case "square":
        expression = Math.pow(expression, 2);
        forNaN(expression);
        break;

      case "1/x":
        expression = "1/";
        break;

      case "|x|":
        expression = Math.abs(expression);
        forNaN(expression);
        break;

      case "exp":
        let exp_val = expression.toString().slice(-1);
        if (
          exp_val === "+" ||
          exp_val === "*" ||
          exp_val === "-" ||
          exp_val === "/" ||
          exp_val === ""
        ) {
          expression += "2.71828";
        } else {
          expression += "*2.71828";
        }

        break;

      case "sqrt":
        expression = "√";
        break;

      case "*(":
        let expp = expression.toString().slice(-1);
        if (
          expp === "+" ||
          expp === "*" ||
          expp === "-" ||
          expp === "/" ||
          expp === ""
        ) {
          expression += "(";
        } else {
          expression += "*(";
        }
        break;

      case "factorial":
        let fact = 1;
        if (isNaN(expression)) {
          expression = "Error";
        } else {
          for (i = 1; i <= expression; i++) {
            fact *= i;
          }
          expression = fact;
        }
        break;

      case "numpow":
        expression += "^";
        break;

      case "=":
        removezero();
        try {
          if (expression.includes("√")) {
            squareroot();
          } else if (expression.includes("log")) {
            logten();
          } else if (expression.includes("ln")) {
            ln();
          } else if (expression.includes("^")) {
            numpower();
          } else {
            const answer = eval(expression);
            expression = answer;
          }
        } catch {
          expression = "Syntax Error";
        }
        forNaN(expression);
        break;

      case "10power":
        expression = "10^";
        break;

      case "ln":
        expression = "ln";
        break;

      case "log10":
        expression = "log";
        break;

      case "sin":
        expression = Math.sin(expression);
        forNaN(expression);
        break;

      case "cos":
        expression = Math.cos(expression);
        forNaN(expression);
        break;

      case "tan":
        expression = Math.tan(expression);
        forNaN(expression);
        break;

      case "+/-":
        if (expression > 0) {
          expression = expression * -1;
        } else {
          expression = Math.abs(expression);
        }
        break;

      case "0":
        if (expression === "0") {
          expression = value;
        } else {
          expression += 0;
        }
        break;

      default:
        expression += value;
    }

    function removezero() {
      if (expression.charAt(0) === "0") {
        expression = expression
          .toString()
          .substring(1, expression.toString().length);
      }
    }

    // Function to calculate log10
    function logten() {
      let e = expression.substring(3, expression.length);
      expression = Math.log10(e);
    }

    // function to calculate ln
    function ln() {
      let e = expression.substring(2, expression.length);
      expression = Math.log(e);
    }

    //function to calculate squareroot
    function squareroot() {
      let e = expression.substring(1, expression.length);
      expression = Math.sqrt(e);
    }

    //function to calculate power
    function numpower() {
      let symbol = expression.indexOf("^");
      let exp1 = expression.slice(0, symbol);
      var exp2 = expression.slice(symbol + 1, expression.length);

      expression = exp1 ** exp2;
    }

    //function to convert radian to degree and degree to radian
    function degrad() {
      var val = document.getElementById("rd");

      if (val.value === "DEG") {
        expression = expression * (180 / Math.PI);
        val.value = "RAD";
      } else {
        expression = expression * (Math.PI / 180);
        val.value = "DEG";
      }
      forNaN(expression);
    }

    //function to check if the value of expression is NaN
    function forNaN(exp) {
      if (isNaN(exp)) {
        expression = "Error";
      } else {
        expression = exp;
      }
    }

    if (expression == undefined) {
      expression = "";
      ans.value = 0;
    } else {
      ans.value = expression;
    }
  }
});
