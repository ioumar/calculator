const btnNumeric = Array.from(document.querySelectorAll('.calculator__btn-numeric'));
const btnOperator = Array.from(document.querySelectorAll('.calculator__btn-operator'));

const calculator = document.querySelector('.calculator');
const btnEqual = document.querySelector('.calculator__btn-equal');
const btnClear = document.querySelector('.calculator__btn-clear');
const btnSign = document.querySelector('.calculator__btn-sign');
const btnComma = document.querySelector('.calculator__btn-comma')
const btnBack = document.querySelector('.calculator__btn-back')
const input = document.querySelector('.calculator__input');
const message = 'impossible';
const zero = '0';
const numeric = '0123456789';
const operators = '-+/*';

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
            if(numeric.includes(event.target.innerText)){
                handleCalculatorLogic(numeric,event.target.innerText);
            }

            else if(operators.includes(event.target.innerText)){
                 handleCalculatorLogic(operators,event.target.innerText);
            }

            else{
                handleKeyAndClickPress(event.target.innerText);
            }

            //remove focus from the button
            event.target.blur();

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


// functions important

function equal(){
    operate(firstNumber, secondNumber, operator);
    displayInput();
}


function addSign(){
    if(parseFloat(firstNumber) > 0 || firstNumber === ''){
        firstNumber = sign + firstNumber;
    }
    displayInput();
}


function addComma(){
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
}

function deleteCharacter(){
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
}
// Events to trigger the display of the result and the reset of variables

btnEqual.addEventListener('click',(event) => {
    equal(); 
    //remove focus from the button
    event.target.blur();
    
});

btnClear.addEventListener('click',(event)=>{
    clear();
    event.target.blur();
})

// Events to add the negative sign

btnSign.addEventListener('click',(event)=>{
    addSign();
    event.target.blur();
})

// Add a comma button and let users input decimals

btnComma.addEventListener('click',(event) =>{
    addComma();
    event.target.blur();
})

btnBack.addEventListener('click',(event) =>{
    deleteCharacter();
    event.target.blur();
});

// A Keyboard support

function handleKeyAndClickPress(event){
    switch(event){
        
        case 'Enter':
            equal();
            break;
        
        case '.':
            addComma();
            break;
        
        case 'Backspace':
            deleteCharacter();
            break;
        
        case 'Delete':
            clear();
            break;

        default:
           break;
            
    }
};


function handleCalculatorLogic(characterList, character){
    if(characterList.includes(character) && firstNumber === String(result) && operator === '' && isNumber(character)){
        firstNumber ='';
        updateNumber(character);
    }

    else if(characterList.includes(character) && isNumber(character)){
        updateNumber(character);
    }

     else if(characterList.includes(character) && firstNumber === message){
        clear();
    }

    else if(characterList.includes(character) && firstNumber !== '' && secondNumber !== ''){
        operate(firstNumber,secondNumber, operator);
        updateOperator(character);
    }

    else if(characterList.includes(character)){
        updateOperator(character);
    }

    displayInput()
}


function isNumber(value){
    if(Number.isNaN(Number(value))){
        return false;
    }
    return true;
    
}


window.addEventListener('keydown',(event)=>{
    if(numeric.includes(event.key)){
        handleCalculatorLogic(numeric, event.key);
    }
    else if(operators.includes(event.key)){
        handleCalculatorLogic(operators, event.key);
    }
    else{
        handleKeyAndClickPress(event.key); 
    }
});

handleButtonClick(btnNumeric);
handleButtonClick(btnOperator);
