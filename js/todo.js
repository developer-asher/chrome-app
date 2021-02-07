// todo list
const qustionBox3 = document.querySelector(".q_box3"),
    qustionToDo = document.querySelector("#q_todo"),
    toDoList = document.querySelector(".list_todo");

let toDos = [],
    ls_userToDos = "userToDos";

const userEmail = localStorage.getItem(ls_userEmail);

function printToDoForm(){
    qustionBox3.classList.add('showing');
}

function deleteToDo(e) {
    const btn = e.target,
        li = btn.parentNode;
    
    li.remove(); // = toDoList.removeChild(li);
    
    const cleanToDo = toDos.filter((toDo) => toDo.id !== li.id);
    // toDo.id와 li.id의 탑이 다를 시 한쪽으로 맞춰야함.
    // 즉, 문자를 숫자로 바꾸는 함수인 parseInt(li.id)과 같은 함수를 통해

    console.log(cleanToDo);
    toDos = cleanToDo;
    saveToDoList();
}

function saveToDoList() {
    localStorage.setItem(ls_userToDos, JSON.stringify(toDos));
}

function paintToDoList(text) {
    const li = document.createElement("li"),
        delBtn = document.createElement("button"),
        span = document.createElement("span"),
        listId = `list${toDos.length+ 1}`;

    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = listId;
    toDoList.appendChild(li);
    
    const toDoObj = {
        text: text,
        id: listId
    };
    toDos.push(toDoObj);

    saveToDoList();
}

function handleToDoList(e) {
    e.preventDefault();

    const toDo = qustionToDo.value;

    paintToDoList(toDo);
    qustionToDo.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(ls_userToDos);

    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);

        parsedToDos.forEach((toDo) => {
            paintToDoList(toDo.text);
        });
    }
}

function init() {
    if(userEmail) { printToDoForm(); }
    loadToDos();
    qustionBox3.addEventListener("submit", handleToDoList);
}

init();