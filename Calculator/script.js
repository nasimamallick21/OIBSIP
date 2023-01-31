let screen=document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';
for(item of buttons){
    item.addEventListener('click',(e)=>{
        buttonText = e.target.innerText;

        if(buttonText == 'x'){
            buttonText = '*'; 
            screenValue += buttonText; 
            screen.value = screenValue;
        }
        if(buttonText == '÷'){
            buttonText = '/'; 
            screenValue += buttonText; 
            screen.value = screenValue;
        }
    
        else if(buttonText == 'AC'){
            screenValue = "";
            screen.value = screenValue;
        }
        else if(buttonText == 'DEL'){
            screenValue = screen.value.slice(0, - 1);
            screen.value = screenValue;
        }
     
        else if(buttonText == '='){
            try {
                screen.value = eval(screenValue);
            } catch (error) {
                alert('Invalid');
            }
        }
        else{
            screenValue += buttonText;
            screen.value = screenValue;

        }
    });
}

function pow() {
    screen.value = Math.pow(screen.value, 2);
}