const btnNumeric = Array.from(document.querySelectorAll('.calculator__btn-numeric'));
const btnOperator = Array.from(document.querySelectorAll('.calculator__btn-operator'));

const btnEqual = document.querySelector('.calculator__btn-equal');
const btnClear = document.querySelector('.calculator__btn-clear');
const input = document.querySelector('.calculator__input');


let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';

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
        return "impossible";
    }
    return firstNumber / secondNumber;
}

// function that must return the result of a mathematical operation

function operate(firstNumber,secondNumber,operator){
    switch(operator){
        case '+':
            result = add(firstNumber, secondNumber);
            displayInput(result)
            break
        case '-':
            result = subtract(firstNumber, secondNumber);
            displayInput(result)
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            displayInput(result)
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            displayInput(result)
            break;
        default:
            console.log('Error');
    }
}

// The three functions to update the number and operator

function handleButtonClick(btnList){
    for(let btn of btnList){
        btn.addEventListener('click',(event) => {
            if (btnNumeric.includes(btn)){
                updateNumber(event.target.innerText);
            }
            else if(btnOperator.includes(btn) && firstNumber === ''){
                updateOperator(event.target.innerText);
                updateNumber(result);
            }
            else{
                updateOperator(event.target.innerText);
            }
            displayInput(event.target.innerText)
        });
    }
}
     
function updateNumber(newNumber){
    if (operator === ''){
        firstNumber = firstNumber + newNumber;
    }
    else if(operator !== '' && firstNumber == ''){
        firstNumber = String(newNumber);
    }
    else{
        secondNumber = secondNumber + newNumber;
    }
}

function updateOperator(newOperator){
    operator = newOperator;
}

// the two functions to reset the variables

function reset(){
    firstNumber = '';
    secondNumber = '';
    operator = '';
}

function clear(){
    result = '';
    input.value = '';
}


function displayInput(character){
    input.value = input.value + character;
}

// Events to trigger the display of the result and the reset of variables

btnEqual.addEventListener('click',() => {
    input.value = '';
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    operate(firstNumber, secondNumber, operator);
    reset();
});

btnClear.addEventListener('click',()=>{
    clear();
})




handleButtonClick(btnNumeric);
handleButtonClick(btnOperator);