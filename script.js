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
    return parseInt(firstNumber) + parseInt(secondNumber);
}


function subtract(firstNumber, secondNumber){
    return parseInt(firstNumber) - parseInt(secondNumber);
}


function multiply(firstNumber, secondNumber){
    return parseInt(firstNumber) * parseInt(secondNumber);
}


function divide(firstNumber, secondNumber){
    if(secondNumber === '0'){
        return "impossible";
    }
    return (parseInt(firstNumber) / parseInt(secondNumber)).toFixed(2);
}

// function that must return the result of a mathematical operation

function operate(firstNumber,secondNumber,operator){
    switch(operator){
        case '+':
            result = add(firstNumber, secondNumber);
            reset();
            updateNumber(String(result));
            break
        case '-':
            result = subtract(firstNumber, secondNumber);
            reset();
            updateNumber(String(result));
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            reset();
            updateNumber(String(result));
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            reset();
            updateNumber(result);
            break;
        default:
            break;
    }
}

// The three functions to update the number and operator

function handleButtonClick(btnList){
    for(let btn of btnList){
        btn.addEventListener('click',(event) => {
            
            if (btnNumeric.includes(btn) && firstNumber === String(result)){
                reset();
                updateNumber(event.target.innerText);
            } 
            
            else if(btnNumeric.includes(btn)){
                updateNumber(event.target.innerText);
            }
            
            else if(btnOperator.includes(btn) && firstNumber !== '' && secondNumber !== ''){
                operate(firstNumber,secondNumber, operator);
                updateOperator(event.target.innerText);
            }
        
            else{
                updateOperator(event.target.innerText)
            }

            displayInput()
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
    reset();
}

// Function to display operations 

function displayInput(){
    input.value = `${firstNumber}${operator}${secondNumber}`;
}

// Events to trigger the display of the result and the reset of variables

btnEqual.addEventListener('click',() => {
    operate(firstNumber, secondNumber, operator);
    displayInput();
    
});

btnClear.addEventListener('click',()=>{
    clear();
})

handleButtonClick(btnNumeric);
handleButtonClick(btnOperator);