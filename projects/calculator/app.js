///Selectors
const buttonCon = document.querySelector('.buttons');
const screen = document.querySelector('.screen');
const equal = document.getElementById('equal');
const mainContainer = document.querySelector('.container');

//variables
let i;
let button = document.createElement('p');
const add = document.createElement('p');
const minus = document.createElement('p');
const multiply = document.createElement('p');
const divide = document.createElement('p');
const clear = document.createElement('p');
const dot = document.createElement('p');
const backspace = document.createElement('p');
const con = document.createElement('div');

//operations
add.innerHTML = '+';
minus.innerHTML = '-';
multiply.innerHTML = '*';
divide.innerHTML = '/';
dot.innerHTML = '.';



//eventListeners
document.addEventListener('DOMContentLoaded', buttons);
buttonCon.addEventListener('click', displayValue);
equal.addEventListener('click', calculate);


//functions
function buttons() {
    for (i = 0; i < 10; i++) {

        button.innerText = i;
        buttonCon.appendChild(button.cloneNode(true));
        buttonCon.appendChild(add);
        buttonCon.appendChild(minus);
        buttonCon.appendChild(multiply);
        buttonCon.appendChild(divide);
        buttonCon.appendChild(dot);
    }


    backspace.innerHTML ="<i class='material-icons'>backspace</i>";
    backspace.addEventListener('click', back);
    con.appendChild(backspace);

    clear.innerHTML = "C";
    clear.addEventListener('click', removeInput)
    con.insertBefore(clear, backspace);

    mainContainer.insertBefore(con, buttonCon);

    function removeInput() {
        screen.value = "";
    }

    function back(){
        var str = screen.value;
        screen.value = str.substring(0, str.length - 1);
    }
}




function displayValue(e) {
    screen.value += e.target.innerText;
}

function calculate() {
    screen.value = eval(screen.value);
}