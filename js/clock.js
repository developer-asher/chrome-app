const clockContainer = document.querySelector('.title_clock'),
    boxHour = document.querySelector('.box_hour'),
    clockTitle = document.querySelector('.box_hour>h1');
    
const btnSetHour = document.querySelector('.btn_setHour');
const boxOption = document.querySelector('.option_label');
const option = document.querySelector('.option');
const toggleSlider = document.querySelector('.toggle_slider');

let setTimeId;

function playAutoTime(type) {
    setTimeId = setInterval(() => toggleTimeFormat(type), 1000);
}

function toggleTimeFormat(type, callback) {
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    
    if(type === '12hours') {
        hours = hours % 12;
        hours = hours ? hours : 12;

        clockTitle.innerText = `${hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`;
    } else {
        clockTitle.innerText = `${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`;
    }
}

function stopAutoTime() {
    clearInterval(setTimeId);
}

function checkTimeFormat() {
    if(toggleSlider.classList.contains('on')) {
        stopAutoTime(setTimeId);
        toggleTimeFormat('12hours');
        playAutoTime('12hours');
    } else {
        stopAutoTime(setTimeId);
        toggleTimeFormat('24hours');
        playAutoTime('24hours');
    }
}

function showSlide() {
    toggleSlider.addEventListener('click', () => toggleSlider.classList.toggle('on'));
}

function showHourSettingbox() {
    btnSetHour.addEventListener('click', () => {
        option.classList.toggle('on');
        btnSetHour.classList.add('on');
    });
}

function showHourSettingButton() {
    boxHour.addEventListener('mouseover', () => btnSetHour.classList.add('on'));
    boxHour.addEventListener('mouseout', () => {
        if(option.classList.contains('on')) {
            return false;
        }
        btnSetHour.classList.remove('on');
    });
}

const btnSetName = document.querySelector('.greetings_option i'),
    eidtWrapper = document.querySelector('.edit_wrapper');

function changeName() {
    const greetingName = document.querySelector('.greeting_name');
    const currentUser = localStorage.getItem('currentUser');

    greetingName.innerHTML = '';
    greetingName.innerHTML = `<form><input class='name' type='text' value='${currentUser}' autofocus /></form>`;

    const form = document.querySelector('.greeting_name>form'),
        input_name = document.querySelector('.name'),
        pos = input_name.value.length;

    input_name.setSelectionRange(pos, pos);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let changedName = input_name.value;
        greetingName.innerText = changedName;

        saveName(changedName);

        btnSetName.classList.remove('on');
        eidtWrapper.classList.remove('on');
    });
}

function editName(ele, target) {
    ele.addEventListener('click', () => {
        target.classList.toggle('on');
        ele.classList.add('on');
    });

    const btnEditName = document.querySelector('.edit_wrapper>span');

    btnEditName.addEventListener('click', changeName);
}

function changeGreetingName() {
    const greetingsOption = document.querySelector('.greetings_option');

    greetingsOption.addEventListener('mouseover', () => btnSetName.classList.add('on'));
    greetingsOption.addEventListener('mouseout', () => {
        if(eidtWrapper.classList.contains('on')) {
            return false;
        }
        btnSetName.classList.remove('on');
    });

    editName(btnSetName, eidtWrapper);
}

function init(){
    toggleTimeFormat('24hours');
    playAutoTime('24hours');
    showHourSettingButton();
    showHourSettingbox();
    showSlide();
    checkTimeFormat();
    toggleSlider.addEventListener('click', checkTimeFormat);
    changeGreetingName();
}

init();