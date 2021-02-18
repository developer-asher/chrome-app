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

function init(){
    toggleTimeFormat('24hours');
    playAutoTime('24hours');
    showHourSettingButton();
    showHourSettingbox();
    showSlide();
    checkTimeFormat();
    toggleSlider.addEventListener('click', checkTimeFormat);
}

init();