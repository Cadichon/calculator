function addToInput(character) {
    var input = document.getElementsByClassName('input')[0];
    input.children[0].value += character;
}
function clearInput() {
    var input = document.getElementsByClassName('input')[0];
    input.children[0].value = "";       
}
function calcInput() {
    var input = document.getElementsByClassName('input')[0];
    input.children[0].value = eval(input.children[0].value);
}
window.onload = function() {
    var numbers = document.getElementsByClassName("number");
    for (var i = numbers.length - 1; i >= 0; i--) {
        numbers[i].children[0].setAttribute("onclick", "addToInput('"+ numbers[i].children[0].innerHTML+"');")
    }
    var operators = document.getElementsByClassName("operator");
    for (var i = operators.length - 1; i >= 0; i--) {
        operators[i].children[0].setAttribute("onclick", "addToInput('"+ operators[i].children[0].innerHTML+"');")
    }
    var clear = document.getElementsByClassName("clear")[0];
    clear.children[0].setAttribute("onclick", "clearInput();")
    var equal = document.getElementsByClassName("equal")[0];
    equal.children[0].setAttribute("onclick", "calcInput();")
}