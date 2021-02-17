const clockContainer = document.querySelector('.title_clock'),
    boxHour = document.querySelector('.box_hour'),
    clockTitle = document.querySelector('.box_hour>h1');
    
const btnSetHour = document.querySelector('.btn_setHour');
const boxOption = document.querySelector('.option_label');
const option = document.querySelector('.option');
const toggleSlider = document.querySelector('.toggle_slider');

function changeHourType() {
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    
    hours = hours % 12;
    hours = hours ? hours : 12;

    clockTitle.innerText = `${hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`;
}

function setIntervalChangHour() {
    formatTime12Id = setInterval(() => changeHourType(), 1000);
}

function changeHourFormat() {
    if(toggleSlider.classList.contains('on')) {
        changeHourType();
        clearInterval(formatTime24Id);
        setIntervalChangHour();
    } else {
        clearInterval(formatTime12Id);
        moveAutoTime();
    }
}

function slideToggleBtn() {
    toggleSlider.classList.toggle('on');
    
    changeHourFormat();
}

function toggleSlide() {
    toggleSlider.addEventListener('click', slideToggleBtn);
}

function showOption() {
    option.classList.toggle('on');
    btnSetHour.classList.add('on');
}

function showHourSettingbox() {
    btnSetHour.addEventListener('click', showOption);
}

function showSetting() {
    if(!btnSetHour.classList.contains('on')) {
        btnSetHour.classList.add('on');
    } else {
        if(option.classList.contains('on')) {
            return false;
        }
        btnSetHour.classList.remove('on');
    }
}

function showHourSettingButton() {
    boxHour.addEventListener('mouseover', showSetting);
    boxHour.addEventListener('mouseout', showSetting);
}

function getTime (){
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    clockTitle.innerText = `${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`;
}

function moveAutoTime() {
    formatTime24Id =  setInterval(() => getTime(), 1000);
}

function init(){
    getTime();
    moveAutoTime();
    showHourSettingButton();
    showHourSettingbox();
    toggleSlide();
}

init();