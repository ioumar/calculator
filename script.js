const btnNumeric = Array.from(document.querySelectorAll('.calculator__btn-numeric'));

const btnOperator = Array.from(document.querySelectorAll('.calculator__btn-operator'));

//const btnEqual = document.querySelector('.calculator__btn-equal');

let firstNumber = '';
let operator = '';
let secondNumber = '';


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
            console.log('Error');      
    }
}

// Functions for performing basic mathematical operations


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
        return "Error: division by zero is impossible";
    }
    return firstNumber / secondNumber;
}



// The two functions to update the number and operator


function handleButtonClick(btnList){
    for(let btn of btnList){
        btn.addEventListener('click',(event) => {
            if (btnNumeric.includes(btn)){
                updateNumber(event.target.innerText);            
            }
            else if(btnOperator.includes(btn)){
                updateOperator(event.target.innerText);
            }
            else{
                console.log("Error");
            }
        });
    }
}
     

function updateNumber(newNumber){
    if (operator === ''){
        firstNumber = firstNumber + newNumber;
    }
    else{
        secondNumber = secondNumber + newNumber;
    }
}


function updateOperator(newOperator){
    operator = newOperator;
}


handleButtonClick(btnNumeric);
handleButtonClick(btnOperator);


//operate(firstNumber, secondNumber, operator);