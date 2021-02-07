const body = document.querySelector("body");

function paintBackground(num) {
    const image = new Image();
    image.src = `images/bg_${num}.jpg`;
    image.classList.add("bg");
    body.prepend(image);
}

function randomNumber() {
    const ranNum = Math.ceil(Math.random()*3);
    return ranNum;
}

function init() {
    const bgNum = randomNumber();
    paintBackground(bgNum);
}

init();

// 2번째 방법
// body의 background를 변경하는 방법으로 작동가능.