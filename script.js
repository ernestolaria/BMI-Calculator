
let button = document.getElementById('button');
let clear = document.getElementById('clear');

//event listeners
button.addEventListener('click', perform);
    
clear.addEventListener('click', () => {
    let forms = [...document.forms];
    forms.forEach(form => form.reset());
    clearInfo()
})

//clear result info and error alerts
function clearInfo(){
    document.getElementById('output').innerHTML = '';
    document.getElementById('ft_error').innerHTML = '';
    document.getElementById('in_error').innerHTML = '';
    document.getElementById('w_error').innerHTML = '';
}

//perform the action (calculate, or print the wrong entry if needed)
function perform(){
    
    let status;
    
    if(getInputs(status)==false){
        printResult();
    }else{
        getInputs();
    }
}    


//get the inputs from the user
function getInputs(status){

    let feets = parseFloat(document.getElementById('feets').value);
    let inches = parseFloat(document.getElementById('inches').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let ft_status=false, in_status=false, w_status=false;
    
    if(feets === '' || (feets <=0) || isNaN(feets)){
        document.getElementById('ft_error').innerHTML = 'wrong entry';
    }else{
        document.getElementById('ft_error').innerHTML = '';
        ft_status = true;
    }

    if(inches <0){
        document.getElementById('in_error').innerHTML = 'wrong entry';
    }else if(inches === '' || isNaN(inches)){
        inches = 0;
        document.getElementById('in_error').innerHTML = '';
        in_status = true
    }else{
        document.getElementById('in_error').innerHTML = '';
        in_status = true
    }

    if(weight === '' || (weight <=0) || isNaN(weight)){
        document.getElementById('w_error').innerHTML = 'wrong entry';
    }else{
        document.getElementById('w_error').innerHTML = '';
        w_status = true
    }
    
    if(ft_status==true && in_status==true && w_status==true ){
        
        let heigth = (feets * 12) + inches;

        calculateBMI(heigth, weight);
    
    }else{
        status = false;
    } 

    return status;
    
}


//calculate the bmi
function calculateBMI(heigth, weight){

    let bmi = ((weight / Math.pow(heigth, 2)) * 703).toFixed(1);
    
    printResult(bmi);
    
}


//print the result
function printResult(bmi){
    
    let output = document.getElementById('output');
    
    if (bmi < 18.5) {
        output.innerHTML = bmi + ' Under weight.';
    }else if (bmi >= 18.6 && bmi < 24.9) {
        output.innerHTML = bmi + ' Normal.';
    }else if(bmi >= 24.9 && bmi < 29.9){
        output.innerHTML = bmi + ' Over weight.';
    }else if(bmi > 29.9){
        output.innerHTML = bmi + ' Obese.';
    }else{
        output.innerHTML = 'check your entry';
    }
    
}

