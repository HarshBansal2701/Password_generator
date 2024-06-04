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
const symbols = "`~!@#$%^&*()-_=+{[]}|';:<>,./?/";

let password = "fdghj";
let passwordLen = 10;
let checkCount = 0;



const handleSlider =()=>{
    inputSlider.value = passwordLen;
    Lengthdisplay.innerText = passwordLen;
}
handleSlider();
inputSlider.addEventListener('input', (e)=>{
    passwordLen = e.target.value;
    handleSlider()
})

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

    } catch (e) {
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

copybtn.addEventListener('click', (e)=>{
    if(passDisplay.value){
        copyContent();
    }
})


