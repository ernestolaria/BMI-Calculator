
const tab = document.querySelectorAll('.tab');
const US_bmi = document.getElementById('US-bmi');
const M_bmi = document.getElementById('metric-bmi');
let calculate = document.getElementById('calculate');
let clear = document.getElementById('clear');
let active;

//event listeners
window.addEventListener('DOMContentLoaded', () => {
    US_bmi.classList.add('show-active');
    active = "US-bmi";
});

calculate.addEventListener('click', perform);
    
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
    document.getElementById('p_error').innerHTML = '';
    document.getElementById('cm_error').innerHTML = '';
    document.getElementById('kg_error').innerHTML = '';
}

// bmi calculation form toggle
tab.forEach(bmiTab => {
    bmiTab.addEventListener('click', () => {
        if(bmiTab.id === "US-tab"){
            removeActiveClass();
            clearInfo();
            bmiTab.classList.add('active-tab');
            M_bmi.classList.remove('show-active');
            US_bmi.classList.add('show-active');
            active = "US-bmi";
        }
        if(bmiTab.id === "metric-tab"){
            removeActiveClass();
            clearInfo();
            bmiTab.classList.add('active-tab');
            US_bmi.classList.remove('show-active');
            M_bmi.classList.add('show-active');
            active = "metric-bmi";
        }
    });
});

// remove active class from heads
function removeActiveClass(){
    tab.forEach(bmiTab => {
        bmiTab.classList.remove('active-tab');
    });
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
    let weight;
    let height;

    //getting inputs from US-units
    if(active === "US-bmi"){

        let feets = parseFloat(document.getElementById('feets').value);
        let inches = parseFloat(document.getElementById('inches').value);
        let pounds = parseFloat(document.getElementById('pounds').value);
        let ft_status=false, in_status=false, w_status=false;
    
        //check for feets
        if(feets === '' || (feets <=0) || isNaN(feets)){
            document.getElementById('ft_error').innerText = 'check feets';
        }else{
            document.getElementById('ft_error').innerText = '';
            ft_status = true;
        }

        //check for inches (note that inches can be 0)
        if(inches === '' || (inches <0) || isNaN(inches)){
            document.getElementById('in_error').innerText = 'check inches';
        }else{
            document.getElementById('in_error').innerText = '';
            in_status = true
        }

        //check for weight in pounds
        if(pounds === '' || (pounds <=0) || isNaN(pounds)){
            document.getElementById('p_error').innerText = 'check pounds';
        }else{
            document.getElementById('p_error').innerText = '';
            w_status = true
        }
    
        if(ft_status==true && in_status==true && w_status==true ){
        
            height = (feets * 12) + inches;
            weight = pounds;

            calculateBMI(weight, height);
    
        }else{
            
            return status = false;
        } 
        
    }else{  

        //getting inputs from Metric-units
        let cm = parseFloat(document.getElementById('cm').value);
        let kg = parseFloat(document.getElementById('kg').value);
        let cm_status=false, kg_status=false;
    
        //check for cm
        if(cm === '' || (cm <=0) || isNaN(cm)){
            document.getElementById('cm_error').innerText = 'check cm';
        }else{
            document.getElementById('cm_error').innerText = '';
            cm_status = true;
        }

        //check for weight in kg
        if(kg === '' || (kg <=0) || isNaN(kg)){
            document.getElementById('kg_error').innerText = 'check kg';
        }else{
            document.getElementById('kg_error').innerText = '';
            kg_status = true
        }
    
        if(cm_status==true && kg_status==true ){
        
            height = cm / 100;
            weight = kg;

            calculateBMI(weight, height);
    
        }else{
            
            return status = false;
        } 

    }
}


//calculate the bmi
function calculateBMI(weight, height){

    if(active === "US-bmi"){

        let bmi = ((weight / Math.pow(height, 2)) * 703).toFixed(1);
        printResult(bmi);
    
    }else{

        let bmi = (weight / Math.pow(height, 2)).toFixed(1);
        printResult(bmi);
        
    }

}


//print the result
function printResult(bmi){
    
    let output = document.getElementById('output');
    
    if (bmi < 18.5) {
        output.innerHTML = 'Your BMI is: ' + '<br>' + bmi + '<br>' + '**Under weight**';
    }else if (bmi >= 18.6 && bmi < 24.9) {
        output.innerHTML = 'Your BMI is: ' + '<br>' + bmi + '<br>' + '**Normal**';
    }else if(bmi >= 24.9 && bmi < 29.9){
        output.innerHTML = 'Your BMI is: ' + '<br>' + bmi + '<br>' + '**Over weight**';
    }else if(bmi > 29.9){
        output.innerHTML = 'Your BMI is: ' + '<br>' + bmi + '<br>' + '**Obese**';
    }else{
        output.innerText = 'check your entry';
    }
    
}

