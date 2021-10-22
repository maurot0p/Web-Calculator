function add(x,y){
    return roundToTwo(x+y);
}
function substract(x,y){
    return roundToTwo(x-y);
}
function multiply(x,y){
   return roundToTwo(x*y);
}
function divide(x,y){
    if(y==0){
        return "Math Error";
    }
    return roundToTwo(x/y);
}
function modulo(x,y){
     return roundToTwo(x%y);
}
function power(x,y){
    return roundToTwo(Math.pow(x,y));
}
function operate(operator, x,y){
    if(operator=='+'){
        return add(x,y);
    }
    else if(operator=='-'){
        return substract(x,y);
    }
    else if(operator=='\u00d7'){
        return multiply(x,y);
    }
    else if(operator=='\u00f7'){
        return divide(x,y);
    }
    else if(operator=='%'){
        return modulo(x,y);
    }
    else if(operator=="^"){
        return power(x,y);
    }
}
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
var pointcounter=0;
var counter2=0;
var negativecounter=0;
function populate(x){
    const populate=document.querySelector("#populate");
    const result=document.querySelector("#result");
    const text=document.createTextNode(x);
    const errormessage=document.createTextNode("Error");
    var operationResult=0;
    var counter=0;
    var value="";
    var value2="";
    if((isNaN(x))==false){
        populate.appendChild(text);
    }
    else if( x=="." || x=="+" || x=="x" || x=="/" || x=="-" || x=="%" || x=="^"){
        if(x=="." && pointcounter==0) {
            populate.appendChild(text);
            pointcounter++;
        }
        if(x=="/"){
            populate.appendChild(document.createTextNode("\u00f7"));
            pointcounter=0;
            negativecounter++;
        }
        else if(x=="x"){
            populate.appendChild(document.createTextNode("\u00d7"));
            pointcounter=0;
            negativecounter++;
        }
        else if(x=="+"){
            populate.appendChild(document.createTextNode("+"));
            pointcounter=0;
            negativecounter++;
        }
        else if(x=="^"){
            populate.appendChild(document.createTextNode("^"));
            pointcounter=0;
            negativecounter++;
        }
        else{
            if(x=="." && pointcounter>0) {

            }
            if(x=="-" && negativecounter>0){

            }
            else{
                pointcounter=0;
                populate.appendChild(text);
        }
    }
}
    else if(x=="clear"){
        populate.textContent = '';
        result.textContent = '';
        counter2=0;
        pointcounter=0;

    }
    else if(x=="delete"){
        populate.removeChild(populate.lastChild);
    }
    else if(x=="="){
    negativecounter=0;
        for(var child=populate.firstChild; child!==null; child=child.nextSibling) {
            if (isNaN(child.nodeValue)==false || child.nodeValue=='.'){
                value+=child.nodeValue;
            }
            if((child.nodeValue=='+' || child.nodeValue=='\u00f7' || child.nodeValue=='\u00d7' || child.nodeValue=='-' || child.nodeValue=='%' || child.nodeValue=='^') && counter==0){
                counter++;
                for(var child2=child.nextSibling;child2!=null; child2=child2.nextSibling){
                    value2+=child2.nodeValue;
                }
                    operationResult=operate(child.nodeValue,parseFloat(value),parseFloat(value2));  
                         
            }
            else if((child.nodeValue=='+' || child.nodeValue=='\u00f7' || child.nodeValue=='\u00d7' || child.nodeValue=='-' || child.nodeValue=='%' || child.nodeValue=='^') && counter!=0){
                    operationResult=operate(child.nodeValue,operationResult,parseFloat(child.nextSibling.nodeValue,10));
               
            }
        }
        if(result.hasChildNodes()==true){
            result.removeChild(result.lastChild);
        }
        if(isNaN(operationResult)==true){
            result.appendChild(errormessage);
        }
        else{
            result.appendChild(document.createTextNode(operationResult));
        }
        
    }
} 
            
        

document.addEventListener('keydown', function(event) {
    const key = event.key; // const {key} = event; ES6+
    if (key === "Backspace" || key === "Delete") populate("delete");
    else if(key=="Enter") {
        populate("=");
        event.preventDefault();
    }
    else if(key=="0" || key=="numpad 0") populate("0");
    else if(key=="1" || key=="numpad 1") populate("1");
    else if(key=="2" || key=="numpad 2") populate("2");
    else if(key=="3" || key=="numpad 3") populate("3");
    else if(key=="4" || key=="numpad 4") populate("4");
    else if(key=="5" || key=="numpad 5") populate("5");
    else if(key=="6" || key=="numpad 6") populate("6");
    else if(key=="7" || key=="numpad 1") populate("7");
    else if(key=="8" || key=="numpad 8") populate("8");
    else if(key=="9" || key=="numpad 9") populate("9");
    else if(key=="+") populate("+");
    else if(key=="-") populate("-");
    else if(key=="*") populate("x");
    else if(key=="/") populate("/");
    else if(key==".") populate(".");
    else if(key=="^") populate("^");
});

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {

  button.addEventListener('click', () => {
    populate(button.id);
  });
});