// name
const qustionBox = document.querySelector('.q_box'), 
    qustionName = document.querySelector('#q_name'),
    greetings = document.querySelector('.greetings');

// email
const qustionBox2 = document.querySelector(".q_box2"),
    qustionEmail = document.querySelector("#q_email")

const ls_userName = 'currentUser',
    ls_userEmail = 'userEmail';

function validateEmail(email) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return emailReg.test(email);
}

function saveEmail(e) {
    e.preventDefault();

    const answerEmail = qustionEmail.value;

    if(validateEmail(answerEmail) === false) {
        alert("Enter your mail address.");
    } else {
        alert("Your mail address has been saved.");
        localStorage.setItem(ls_userEmail, answerEmail);
        qustionBox2.classList.remove('showing');
        printToDoForm(); // todo.js
    }
}

function askForEmail() {
    qustionBox2.classList.add('showing');
    qustionBox2.addEventListener('submit', saveEmail);
}

function saveName(text) {
    localStorage.setItem(ls_userName, text);
}

function paintGreeting(text) {
    qustionBox.classList.remove('showing');
    greetings.classList.add('showing');
    greetings.innerText = `Hello ${text}`;
}

function handleSubmit(e) {
    e.preventDefault();

    // submit 하는 순간의 value 값이 필요하므로 event 함수 안에 있어야 한다.
    const answerName = qustionName.value;

    if(answerName === null || answerName === "" || isNaN(answerName) === false) {
        alert("Enter your name");
    } else {
        paintGreeting(answerName);
        saveName(answerName);
        askForEmail();
    }
}

function askForName() {
    qustionBox.classList.add('showing');
    qustionBox.addEventListener('submit', handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(ls_userName);

    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();