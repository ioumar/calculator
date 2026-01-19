const btnNumeric = Array.from(document.querySelectorAll('.calculator__btn-numeric'));
const btnOperator = Array.from(document.querySelectorAll('.calculator__btn-operator'));

const btnEqual = document.querySelector('.calculator__btn-equal');
const btnClear = document.querySelector('.calculator__btn-clear');
const btnSign = document.querySelector('.calculator__btn-sign');
const btnComma = document.querySelector('.calculator__btn-comma')
const btnBack = document.querySelector('.calculator__btn-back')
const input = document.querySelector('.calculator__input');
const message = 'impossible';
const zero = '0';

let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';
let sign = '-';


// Functions for performing basic mathematical operations

function add(firstNumber, secondNumber){
    if(secondNumber === ''){
        return '';
    }
    return parseFloat(firstNumber) + parseFloat(secondNumber);
}


function subtract(firstNumber, secondNumber){
     if(secondNumber === ''){
        return '';
    }
    return parseFloat(firstNumber) - parseFloat(secondNumber);
}


function multiply(firstNumber, secondNumber){
     if(secondNumber === ''){
        return '';
    }
    return parseFloat(firstNumber) * parseFloat(secondNumber);
}


function divide(firstNumber, secondNumber){
    if(secondNumber === zero){
        return message;
    }
    return (parseFloat(firstNumber) / parseFloat(secondNumber)).toFixed(2);
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

            if(btnNumeric.includes(btn) && firstNumber === String(result) && operator === ''){
                firstNumber ='';
                updateNumber(event.target.innerText);
            }
            
            else if(btnNumeric.includes(btn)){
                updateNumber(event.target.innerText);
            }

            else if(btnOperator.includes(btn) && firstNumber === message){
                clear();
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
    else if(operator !== '' && firstNumber === ''){
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

// Events to add the negative sign

btnSign.addEventListener('click',()=>{
    if(parseFloat(firstNumber) > 0 || firstNumber === ''){
        firstNumber = sign + firstNumber;
    }
    displayInput();
})

// Add a . button and let users input decimals

btnComma.addEventListener('click',(event) =>{

   if(firstNumber === message){
     clear();
   }

   else if(firstNumber === ''){
     firstNumber = zero + '.';
   }

   else if(!firstNumber.includes('.')){
    firstNumber = firstNumber + '.'
   }

   else if(!secondNumber.includes('.') && operator !== ''){
    secondNumber = secondNumber + '.';
   }
   
   displayInput();
})

btnBack.addEventListener('click',() =>{
    let inputText = input.value;
    // Deletes the last character entered
    if(secondNumber.includes(inputText[inputText.length-1])){
        secondNumber = secondNumber.replace(inputText[inputText.length-1],'');
    }
    else if(operator.includes(inputText[inputText.length-1])){
        operator = '';
    }
    else if(firstNumber.includes(inputText[inputText.length-1])){
      firstNumber = firstNumber.replace(inputText[inputText.length-1],'');
    }
    else{
        clear();
    }
    
    displayInput();
    
});



handleButtonClick(btnNumeric);
handleButtonClick(btnOperator);