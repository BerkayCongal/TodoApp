
const todoItem = document.querySelector(".todo-item");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const filterBtns = document.querySelectorAll('[name="filter"]');
const footerId = document.querySelector("#footer-id");

let count = 0;
footerId.innerText = count

todoForm.addEventListener("submit", addTodo);

function addTodo(e) {
 e.preventDefault();


 if(todoInput.value === "") {return; }


 todoList.innerHTML += 
 `<li class="todo-item">
 <label>
     <input type="checkbox">
     <span class="todo-name">${todoInput.value}</span>
     <button class="destroy">X</button>
 </label>
 </li>
 `

 count += 1;
 footerId.innerText = count

 todoInput.value = "",
 todoInput.focus();

 saveItem();
}

function filterTodos () {
   todoList.classList.value = "todo-list " + this.value
}

filterBtns.forEach(filterBtn => {
filterBtn.addEventListener("click", filterTodos)
});


function removeTarget(el) {
    el.parentElement.parentElement.remove();
}
todoList.addEventListener("click",deleteBtn);

function deleteBtn(e){
    const targetEl = e.target
    if(targetEl.classList.contains("destroy")) {
        removeTarget(targetEl);
        saveItem()
        
     count -= 1;
     footerId.innerText = count

    };
}

todoList.addEventListener("dblclick",(e) => {
    if( e.target.tagName === "SPAN" )
     editTodo(e.target)
})

function editTodo(e){
    const firstText = e.firstChild;
    const orginalText = firstText.textContent;
    const input = document.createElement("input");
    input.classList.add("editinput")
    input.value = orginalText;
    e.replaceChild(input,firstText);

    input.addEventListener("keydown",(text) => {
        if(text.key === "Enter") {
             const newText = input.value;
             if(newText.trim() != "" ) {
                firstText.textContent = newText;
             };
             e.replaceChild(firstText,input);
        };
    });

    input.focus();
}


function saveItem() {
    localStorage.setItem("data",todoList.innerHTML);
}

function dataLoad() {
    todoList.innerHTML = localStorage.getItem("data");
}

dataLoad();