let firstNumber = parseInt(prompt("Enter your first number : "));
let operator = prompt('Enter your operator : ')
let secondNumber = parseInt(prompt("Enter your second number"));


function operate(firstNumber,secondNumber,operator){
    switch(operator){
        case '+':
            console.log(add(firstNumber, secondNumber));
            break
        case '-':
            console.log(subtract(firstNumber, secondNumber));
            break;
        case '*':
            console.log(multiply(firstNumber, secondNumber));
            break;
        case '/':
            console.log(divide(firstNumber, secondNumber));
            break;
        default:
            console.log('Erreur');      
    }
}


function add(firstNumber, secondNumber){
    return firstNumber + secondNumber
}


function subtract(firstNumber, secondNumber){
    return firstNumber - secondNumber;
}


function multiply(firstNumber, secondNumber){
    return firstNumber * secondNumber;
}


function divide(firstNumber, secondNumber){
    if(secondNumber === 0){
        return "Erreur : la division par zéro est impossible";
    }
    return firstNumber / secondNumber;
}



//operate(firstNumber, secondNumber, operator);