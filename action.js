const Lengthdisplay = document.getElementById("passwordLength");
const inputSlider = document.getElementById("lengthSlider");
const upperCaseCheck = document.getElementById("upper");
const lowerCaseCheck = document.getElementById("lower");
const numCheck = document.getElementById("num");
const symCheck = document.getElementById("sym");
const indigator = document.getElementById("indicator");
const passDisplay = document.getElementById("passwordDisplay");
const copyMsg = document.getElementById("copymsg");
const copybtn = document.getElementById("copy");
const allcheckboxes = document.querySelectorAll("input[type=checkbox]");
const genBtn = document.getElementById("generatebutton");

const symbols = "`~!@#$%^&*()-_=+{[]}|';:<>,./?/";

let password = "";
let passwordLen = 10;
let checkCount = 1;
handleSlider();



function handleSlider(){
    inputSlider.value = passwordLen;
    Lengthdisplay.innerText = passwordLen;
}

function setIndicator(color){
    indigator.style.backgroundColor = color;
}

function getRandomInt(min,max){
    return ((Math.floor(Math.random()*(max-min))) + min);
}

function getRanNum(){
    return getRandomInt(0,9);
}

function getRanUpper(){
    return String.fromCharCode(getRandomInt(65,91));
}

function getRanLower(){
    return String.fromCharCode(getRandomInt(97,123));
}

function getRanSym() {
    let idx = getRandomInt(0,symbols.length);
    return symbols.charAt(idx);
}

function calculateStrenght(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numCheck.checked) hasNum = true;
    if (symCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLen >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLen >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passDisplay.value);
        copyMsg.innerText = "Copied";

    }catch(e) {
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add('active');
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 1000);

    copyMsg.classList.remove('active')
}


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    console.log("dfrg");
    allcheckboxes.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount += 1;
        console.log(checkCount);
    });

    //special condition
    if(passwordLen < checkCount ) {
        passwordLen = checkCount;
        handleSlider();
    }
}

allcheckboxes.forEach( (checkBox) => {
    checkBox.addEventListener('change' , handleCheckBoxChange);
});

inputSlider.addEventListener('input', (e)=>{
    passwordLen = e.target.value;
    handleSlider()
});

copybtn.addEventListener('click', ()=>{
    if(passDisplay.value){
        copyContent();
    }
});

genBtn.addEventListener('click', ()=>{
    if(checkCount == 0){
        return ;
    }

    // if(copyMsg.classList.contains(''))

    if(passwordLen < checkCount){
        passwordLen = checkCount;
        handleSlider();
    }

    password = "";

    let funcArr = [];

    if(upperCaseCheck.checked){
        console.log("HI");
        funcArr.push(getRanUpper);
    }
    if(lowerCaseCheck.checked){
        funcArr.push(getRanLower);
    }

    if(numCheck.checked){
        funcArr.push(getRanNum);
    }
    if(symCheck.checked){
        funcArr.push(getRanSym);
    }


    for(let i = 0 ; i<funcArr.length ; i++){
        password += funcArr[i]();
    }

    for(let i = 0 ; i<passwordLen-funcArr.length ; i++){
        let renidx = getRandomInt(0,funcArr.length);
        password += funcArr[renidx]();
    }

    password = shufflePassword(Array.from(password));

    passDisplay.value = password;

    calculateStrenght();
});


