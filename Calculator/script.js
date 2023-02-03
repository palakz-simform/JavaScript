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
        expression = Math.PI * expression;
        forNaN(expression);
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
        expression = Math.exp(expression);
        forNaN(expression);
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

      case "=":
        removezero();
        try {
          if (expression.includes("√")) {
            squareroot();
          }
          else if(expression.includes("log")){
            logten();
          }
          else if(expression.includes("ln")){
            ln();
          }
         else{
            const answer = eval(expression);
          expression = answer;
          }
          
        } catch {
          expression = "Syntax Error";
        }
        forNaN(expression);
        break;

      case "10power":
        expression="10**"
        break;

      case "ln":
        expression = "ln"
       
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

    function logten(){
      let e = expression.substring(3, expression.length);
      expression = Math.log10(e);
    }

    function ln(){
      let e = expression.substring(2, expression.length);
      expression = Math.log(e);
    }

    function squareroot() {
      let e = expression.substring(1, expression.length);
      expression = Math.sqrt(e);
    }

    function degrad() {
      var t = document.getElementById("rd");

      if (t.value === "DEG") {
        expression = expression * (180 / Math.PI);
        t.value = "RAD";
      } else {
        expression = expression * (Math.PI / 180);
        t.value = "DEG";
      }
      forNaN(expression);
    }

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
