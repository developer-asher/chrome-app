const clockContainer = document.querySelector('.title_clock'),
    clockTitle = document.querySelector('.title_clock>h1');

function getTime (){
    let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    clockTitle.innerText = `${hours<10 ? `${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    setInterval(() => {
        getTime(); 
    }, 1000);
}

init();