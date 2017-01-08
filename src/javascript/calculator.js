var operand1 = undefined;
var operation = undefined;
var shouldClear= false;
var lastEquals = undefined;

getDisplay = function() {
  return document.getElementById("display").value;
};

setDisplay = function(disp) {        
  document.getElementById("display").value = disp;      
};


clickNumber = function(num, f) {
  return function() { 
    lastEquals = undefined;
    if(f === undefined || f(getDisplay())){
      if (shouldClear){
        setDisplay("");
        shouldClear = false;
      }
      document.getElementById("display").value = `${getDisplay()}${num}`;
    }
  };
};

keyboardShortcut = function(e){
  //key = e.keyCode;
  //setDisplay(key);

  var keyboardObject = {
    42: clickMultiply
  , 47: clickDivide
  , 43: clickAdd
  , 45: clickMinus
  , 48: click0
  , 49: click1
  , 50: click2
  , 51: click3
  , 52: click4
  , 53: click5
  , 54: click6
  , 55: click7
  , 56: click8
  , 57: click9
  , 13: clickEquals
  , 46: clickPeriod
  }

  keyboardObject[e.keyCode]();
};



window.click1 = clickNumber(1);
window.click2 = clickNumber(2);
window.click3 = clickNumber(3);
window.click4 = clickNumber(4);
window.click5 = clickNumber(5);
window.click6 = clickNumber(6);
window.click7 = clickNumber(7);
window.click8 = clickNumber(8);
window.click9 = clickNumber(9);
window.click0 = clickNumber(0, function(str){
  return str !== "0";
});
window.clickPeriod = clickNumber(".", function(str){
  return !str.includes(".");
});

window.clickClear = function() {
  shouldClear = false;
  operand1 = undefined;
  setDisplay("");
  lastEquals = undefined;
};

window.clickSquare = function() {
  var displayValue = parseFloat(getDisplay());

  setDisplay(displayValue * displayValue); 
  lastEquals = undefined;
};

clickOperation = function(op) {
  return function() {
    shouldClear = false;
    
    if(operand1 !== undefined) {  
      clickEquals();
    }
    operation = op ;
    operand1 = parseFloat(getDisplay());
    lastEquals = undefined

    setDisplay("");
  };
};

window.clickAdd = clickOperation("add"); 
window.clickMultiply = clickOperation("multiply"); 
window.clickDivide = clickOperation("divide"); 
window.clickMinus = clickOperation("minus"); 

window.clickEquals = function() {
  shouldClear = true;
  var operationObject = {
    add: function(x, y) {return x+y; }
  , minus: function(x, y) {return x-y; }
  , divide: function(x, y) {return x/y; }
  , multiply: function(x, y) {return x*y; }
  }
  var displayValue = parseFloat(getDisplay());
  if (lastEquals === undefined){
    lastEquals = [operand1, displayValue];  
    } 
  setDisplay(operationObject[operation](lastEquals[0], lastEquals[1]));
  lastEquals[0] = operationObject[operation](lastEquals[0], lastEquals[1]);
  operand1 = undefined;
};
document.addEventListener('keypress', keyboardShortcut);