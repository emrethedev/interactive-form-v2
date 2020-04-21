// Script Connection Status
console.log('js/script.js is connected to index.html');

// Sets the default border color of valid and invalid fields.
const defaultBorderColor = '#5e97b0';
const errorBorderColor = '#EB1919';

// Selects and resets the whole form when page loads/refreshes.
let entireForm = document.querySelector('form');
entireForm.reset();

let jobRoleSel = document.querySelector('#title');
let optionShow = document.querySelectorAll('#title option');

// Defaulting to first option, in case if the page refreshes and remembers the selection, and won't reset.
optionShow[0].selected = true; // value = full-stack js developer

// Hides the supplemental text field, as it is supposed to show only when "Other" is chosen under Job Role.
let otherJob = document.querySelector('#other-title');
otherJob.hidden = true;

// Sets the focus on 'name' (ID) text field.
document.getElementById('name').focus();

// Event listener looking to ('change') see if user picks 'Other' to determine whether to show/hide additional information text input. 
jobRoleSel.addEventListener('change', (event) => {

    for ( let i = 0; i < optionShow.length; i++ ) {
        let currentTarget = event.target.value;

        if ( currentTarget === 'other') {
            otherJob.hidden = false;
        } else {
            otherJob.hidden = true;
        }
    }
});

let selTheme = document.querySelectorAll('#design option');
let selColor = document.getElementById('color');

// Resetting the select options for if/when user refreshes the page with certain items selected.
selTheme[0].selected = true; // 'Select Theme'
selTheme[0].hidden = true;

/* 
When: Page loads/refreshes and user has not picked anything yet. 
What: Script tries to determine whether the default/selTheme[0] is current. If so, it creates and appends 'Please select a T-shirt theme' to the Color field, and hides its options until user selects a theme from Design.
*/

let designThemeCheck = () => {
    if (  selTheme[0].selected  ) {

        let createSelThemeOpt = document.createElement('option');
        createSelThemeOpt.value = 'selectThemeFirst';
        createSelThemeOpt.textContent = 'Please select a T-shirt theme'
        selColor.appendChild(createSelThemeOpt);
        createSelThemeOpt.selected = true;
        
        for ( let i = 0; i < selColor.length; i++ ) {
            selColor[i].hidden = true;
            selColor.hidden = true;
        }
    } if ( selTheme[0].selected == false ) {
        for ( let i = 0; i < selColor.length; i++ ) {
            selColor[i].hidden = false;
            selColor.hidden = false;
    } 
}
};

// Calling the newly created above function.
designThemeCheck();

let designThemeSelElement = document.querySelector('#design');

// The event listener for T-Shirt Info Section
designThemeSelElement.addEventListener('change', (event) => {

    for ( let i = 0; i < selTheme.length; i++ ) {

        console.log(`Current counter: ${i}`);
        // If “js puns” is selected, hide the three “heart js” option elements in the “Color” drop down menu, show the three “js puns” option elements, and update the “Color” field to the first available color.
        if ( event.target.value === 'js puns' ) { 

            console.log(`Current target: ${event.target.value}`);
            selColor[0].hidden = false;
            selColor[1].hidden = false;
            selColor[2].hidden = false;

            selColor[3].hidden = true;
            selColor[4].hidden = true;
            selColor[5].hidden = true;
            selColor.selectedIndex = 0;
        
        // If “heart js” is selected, hide the three “js puns” option elements in the “Color” drop down menu, show the three “heart js” option elements, and update the “Color” field to the first available color.
        } else if ( event.target.value === 'heart js'  ) {

            selColor[0].hidden = true;
            selColor[1].hidden = true;
            selColor[2].hidden = true;

            selColor[3].hidden = false;
            selColor[4].hidden = false;
            selColor[5].hidden = false;
            selColor.selectedIndex = 3;
        }
    }

    // Exceeds Expectations Feature:
    if (  selTheme[0].selected  ) {
        selColor.hidden = true;
    } else {
        selColor.hidden = false;
    }
});

/*

FOR: Exceeds Expectations
"Form provides at least one error message in real time, before the form is submitted."
"Register for Activities" section should have real-time feedback when user interacts with it.

*/

const activityOps = document.querySelector('.activities');
const actInput = document.querySelectorAll('.activities input');

// Resetting the checkboxes for if/when user refreshes the page with certain items selected.
for ( let i = 0; i < actInput.length; i++ ) {
    if ( actInput[i].checked ) {
        actInput[i].checked = false;
    }
};

let runningTotal = 0;
let displayTotal = document.createElement('p');
displayTotal.textContent = (`Current Total: $${runningTotal}`);
activityOps.appendChild(displayTotal);

if ( runningTotal <= 0 ) {
    displayTotal.hidden = true;
} else {
    displayTotal.hidden = false;
}

// Event listener for tracking the running cost and conflicting activities.
activityOps.addEventListener('change', (e) => {

    let clicked = e.target;
    let targetPrice = clicked.getAttribute('data-cost');
    targetPrice = parseInt(targetPrice);

    let confDayTime = clicked.getAttribute('data-day-and-time');
    console.log(confDayTime);
    for ( let i = 0; i < actInput.length; i++ ) {
        let currentDayTime = actInput[i].getAttribute('data-day-and-time');
        if ( currentDayTime === confDayTime && actInput[i] !== clicked ) {
            if ( clicked.checked ) {
                actInput[i].disabled = true;
            } if ( !clicked.checked ) {
                actInput[i].disabled = false;
            }
        } 
        }
        
    for ( let i = 0; i < actInput.length; i++ ) {

        let currentPrice = actInput[i].getAttribute('data-cost');
        
        if ( actInput[i].checked && clicked === actInput[i] ) {
            runningTotal += targetPrice;
            console.log(`Current running total is: ${runningTotal}`);
        } else if ( !actInput[i].checked && clicked === actInput[i] ) {
            runningTotal -= targetPrice;
            console.log(`Current running total is: ${runningTotal}`);
        }

        
    }
    if ( runningTotal <= 0 ) {
        displayTotal.hidden = false;
        displayTotal.textContent = (`ℹ️ Pick Option(s) to See Total`);
    } else {
        displayTotal.hidden = false;
        displayTotal.textContent = (`💰 Current Total: $${runningTotal}`);
    }
    validateActivity();

});

let paymentSel = document.querySelector('#payment');
let paymentOpt = document.querySelectorAll('#payment option');
paymentSel.selectedIndex = 1;
paymentSel[0].hidden = true;

let ccDiv = document.querySelector('#credit-card');
ccDiv.hidden = false;
let paypalDiv = document.querySelector('#paypal');
paypalDiv.hidden = true;
let bitcoinDiv = document.querySelector('#bitcoin');
bitcoinDiv.hidden = true;
let ccNumber = document.querySelector('#cc-num');

// Event listener for payment methods
paymentSel.addEventListener('change', (e) => {
    let selected = e.target.value;
    
    console.log(selected);

    for ( let i = 0; i < paymentOpt.length; i++ ) {
        let currentLoop = paymentOpt[i].value;
        if ( selected === currentLoop ) {
            if ( selected === 'credit card'   ) {
                ccDiv.hidden = false;
                paypalDiv.hidden = true;
                bitcoinDiv.hidden = true;
            } if ( selected === 'paypal' ) {
                paypalDiv.hidden = false;
                ccDiv.hidden = true;
                bitcoinDiv.hidden = true;
            } if ( selected === 'bitcoin') {
                bitcoinDiv.hidden = false;
                ccDiv.hidden = true;
                paypalDiv.hidden = true;
            }
        }
    }
   
});


const onlyNumbers = document.createElement('div');
onlyNumbers.innerHTML = `* [CARD NUMBER] MUST CONTAIN ONLY NUMBERS 0-9<br>`;
ccDiv.appendChild(onlyNumbers);
onlyNumbers.hidden = true;

const charLimit = document.createElement('div');
charLimit.innerHTML = `* [CARD NUMBER] MUST BE 13-16 CHARACTERS LONG<br>`;
ccDiv.appendChild(charLimit);
charLimit.hidden = true;
let ccNumberValue;
const ccNumInit = () => {
    ccNumberValue = ccNumber.value;
    let allNumbers = /^[0-9]+$/.test(ccNumberValue);

    if ( paymentOpt[1].selected )  {
        let charCal = ccNumberValue.length >= 13 && ccNumberValue.length <= 16;
       if ( charCal ) {
        charLimit.hidden = true;
        ccNumber.style.borderColor = defaultBorderColor;
    } else {
        charLimit.hidden = false;
        ccNumber.style.borderColor = errorBorderColor;
    } if ( allNumbers ) {

            onlyNumbers.hidden = true;
            ccNumber.style.borderColor = defaultBorderColor;

        } else {

            onlyNumbers.hidden = false;
            ccNumber.style.borderColor = errorBorderColor;
        }
        if ( charCal && allNumbers ) {
            ccNumber.style.borderColor = defaultBorderColor;
        } else {
        ccNumber.style.borderColor = errorBorderColor;

        }
    } 
 }

 /*

FOR: Exceeds Expectations
"Form provides at least one error message in real time, before the form is submitted."
"Register for Activities" section should have real-time feedback when user interacts with it.

Form provides at least one error message that changes depending on the error.
*/

/* Listening for triggers in the credit card number input. Tests values' length and validity to determine whether to show error messages and indications or not.
*/
ccNumber.addEventListener('input', (e) => {
    ccNumInit();
});

const zipSelect = document.querySelector('#zip');

const onlyNumbersZIP = document.createElement('div');
onlyNumbersZIP.innerHTML = `* [ZIP CODE] MUST CONTAIN ONLY NUMBERS 0-9<br>`;
ccDiv.appendChild(onlyNumbersZIP);
onlyNumbersZIP.hidden = true;

const charLimitZIP = document.createElement('div');
charLimitZIP.innerHTML = `* [ZIP CODE] MUST BE 5 CHARACTERS LONG<br>`;
ccDiv.appendChild(charLimitZIP);
charLimitZIP.hidden = true;

const zipInit = () => {
    charLimitZIP.hidden = true;

    let zipValue = (zipSelect.value);
    let allNumbers = /^[0-9]+$/.test(zipValue);

    if ( paymentOpt[1].selected )  {
        let charCal = zipValue.length === 5;
        if ( charCal ) {
            charLimitZIP.hidden = true;
            zipSelect.style.borderColor = defaultBorderColor;
        } else {
            charLimitZIP.hidden = false;
            zipSelect.style.borderColor = errorBorderColor;
        } if ( allNumbers ) {

            onlyNumbersZIP.hidden = true;
            zipSelect.style.borderColor = defaultBorderColor;

        } else {

            onlyNumbersZIP.hidden = false;
            zipSelect.style.borderColor = errorBorderColor;
        }
        if ( charCal && allNumbers ) {
            zipSelect.style.borderColor = defaultBorderColor;
        } else {
            zipSelect.style.borderColor = errorBorderColor;

        }
    }
}
zipSelect.addEventListener('input', () => {
    zipInit();
  });

const cvvSelect = document.querySelector('#cvv');

const onlyNumbersCVV = document.createElement('div');
onlyNumbersCVV.innerHTML = `* [CVV] MUST CONTAIN ONLY NUMBERS 0-9<br>`;
ccDiv.appendChild(onlyNumbersCVV);
onlyNumbersCVV.hidden = true;

const charLimitCVV = document.createElement('div');
charLimitCVV.innerHTML = `* [CVV] MUST BE 3 CHARACTERS LONG<br>`;
ccDiv.appendChild(charLimitCVV);
charLimitCVV.hidden = true;

const cvvInit = () => {
    charLimitCVV.hidden = true;

    let cvvValue = (cvvSelect.value);
    let allNumbers = /^[0-9]+$/.test(cvvValue);

    if ( paymentOpt[1].selected )  {
        let charCal = cvvValue.length === 3;
        if ( charCal ) {
            charLimitCVV.hidden = true;
            cvvSelect.style.borderColor = defaultBorderColor;
        } else {
            charLimitCVV.hidden = false;
            cvvSelect.style.borderColor = errorBorderColor;
        } if ( allNumbers ) {

            onlyNumbersCVV.hidden = true;
            cvvSelect.style.borderColor = defaultBorderColor;

        } else {

            onlyNumbersCVV.hidden = false;
            cvvSelect.style.borderColor = errorBorderColor;
        }
        if ( charCal && allNumbers ) {
            cvvSelect.style.borderColor = defaultBorderColor;
        } else {
            cvvSelect.style.borderColor = errorBorderColor;

        }
    }
}
cvvSelect.addEventListener('input', () => {
    cvvInit();
});

let nameField = document.querySelector('#name');
nameField.setAttribute('required', '');
let mailField = document.querySelector('#mail');

let validateName = () => {
    let nameValue = nameField.value;
    if ( nameValue.length > 0 ) { 
        nameField.style.borderColor = defaultBorderColor;
        return true;
    } else {
        nameField.style.borderColor = errorBorderColor;
        let nameP = document.createElement('span');
        nameP.textContent = 'Name field cannot be empty';
        nameField.appendChild(nameP);
        return false;
    }
};

let validateMail = () => {

    let mailValue = mailField.value;
    let emailCalculate = /^[^@]+@[^@.]+\.[a-z]+$/i.test(mailValue);

    if (emailCalculate) {
        mailField.style.borderColor = defaultBorderColor;
            return true;
    } else {
        mailField.style.borderColor = errorBorderColor;
                return false;
    }


}
let actCounter = 0;
let actvityErrorMsg = `ℹ️ You must select at least one event/activity (above) to proceed`;
let activityErrorDiv = document.createElement('p');
activityErrorDiv.textContent = actvityErrorMsg;
activityErrorDiv.style.color = 'navy';
activityOps.appendChild(activityErrorDiv);
activityErrorDiv.hidden = true;

let validateActivity = () => {
    
    if ( runningTotal <= 0 ) {
        activityErrorDiv.hidden = false;
        return false;
    } else {
        activityErrorDiv.hidden = true;
        return true;
    }
};

const validateCreditCard = () => {
    if ( paymentOpt[1].selected ) {
        if ( charLimit.hidden && onlyNumbers.hidden && charLimitZIP.hidden && onlyNumbersZIP.hidden && onlyNumbersCVV.hidden && charLimitCVV.hidden && ccNumber.value !== '' && zipSelect.value !== '' && cvvSelect.value !== '' ) {
            return true;
        } else {
            return false;
        }
    }
    
};

const validateAll = () => {
    
    if ( paymentOpt[1].selected   ) {
        if ( validateName() && validateMail() && validateActivity() && validateCreditCard() ) {
            return true;
        } else {
               return false;
           }
    } else {
        if ( validateName() && validateMail() && validateActivity() ) {
            return true;
        } else {
               return false;
           }
    }
   
};

let formSel = document.querySelector('form');
let belowButtonErr = document.createElement('span');
belowButtonErr.textContent = `Please check the form for error(s).`;
formSel.appendChild(belowButtonErr);
belowButtonErr.hidden = true;

formSel.addEventListener('submit', (e) => {
    if ( paymentOpt[1].selected ) {
        ccNumInit();
        zipInit();
        cvvInit();
    }
    validateAll();
    console.log(`ALL validation results: ${validateAll()}`);

    if ( validateAll() != true) {
        console.log(validateAll());
        e.preventDefault();
        belowButtonErr.hidden = false;
    } else {
        belowButtonErr.hidden = true;
    }
});