
const todoItem = document.querySelector(".todo-item");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const filterBtns = document.querySelectorAll('[name="filter"]');
const footerId = document.querySelector("#footer-id");
const clearCompltedBtn  = document.querySelector(".clear-completed");


todoForm.addEventListener("submit", addTodo);

function addTodo(e) {
 e.preventDefault();

 if(todoInput.value === "") {return; }

 todoList.innerHTML += 
 `<li class="todo-item">
 <label class="todo-label">
      <input type="checkbox" class="todo-checkbox">
      <span class="todo-name">${todoInput.value}</span>
      <button class="destroy">X</button>
 </label>
 </li>
 `

 footerItemAll()
 todoInput.value = "",
 todoInput.focus();
 saveItem();
}

// filters
function filterTodos () {
   todoList.classList.value = "todo-list " + this.value
}

filterBtns.forEach(filterBtn => {
filterBtn.addEventListener("click", filterTodos)
});

//-delete btn
function removeTarget(el) {
    el.parentElement.parentElement.remove();
}

todoList.addEventListener("click",deleteBtn);
function deleteBtn(e){
    const targetEl = e.target
    if(targetEl.classList.contains("destroy")) {
        removeTarget(targetEl);
        footerItemAll()
        saveItem()
    };
}

//----Edit
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


// completed control delete
clearCompltedBtn.addEventListener("click",clearComBtn);
function clearComBtn() {
    for (const el of document.querySelectorAll('li.completed')) {

        el.remove();
    }
    showClearbtn()
} 


function showClearbtn() {
    if(document.querySelector(("li.completed")) === null ){
        clearCompltedBtn.classList.add("unvisible")
    }else{
        clearCompltedBtn.classList.remove("unvisible");
    }

    
}

// completed ekleme
todoList.addEventListener("click", checkdurum)
function checkdurum(e) {
   if(e.target.classList.contains("todo-checkbox")) {
     e.target.parentElement.parentElement.classList.toggle("completed")
   }
   showClearbtn()
  footerItemAll();
}



// item sayma
let itemleft = 0 
 function footerItemAll() {
        itemleft = document.querySelectorAll(".todo-item:not(.completed)").length
        footerId.textContent =`${itemleft} İtem` 
        //  eger htmldeki html divindeki  back kitle  hem degeri hemde  ismini yazabildim
}


//save data
function saveItem() {
    localStorage.setItem("data",todoList.innerHTML);
}

function dataLoad() {
    todoList.innerHTML = localStorage.getItem("data");
}



showClearbtn();
dataLoad();