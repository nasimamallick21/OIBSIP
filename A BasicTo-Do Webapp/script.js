const taskInputs = document.querySelector(".task-inputs input");
filters = document.querySelectorAll(".purify span");
taskBox = document.querySelector(".task-list-container");
delAll = document.querySelector(".cancel");
let todos = JSON.parse(localStorage.getItem("todo-list"));

let editId;
let isEditedTask = false;

filters.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector("span.differ").classList.remove("differ");
        btn.classList.add("differ");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let isDone = todo.status == "done" ? "checked": "";
            if(filter == todo.status || filter == "all_task"){
                li += `<li class="task">
                <label for="${id}">
                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isDone}>
                <p class="${isDone}">${todo.name}</p>
                </label>
                <div class="set">
                <ul class="task-bar">
                <button onclick="editTask(${id}, '${todo.name}')" class="edit">Edit</button>
                <button onclick="deleteTask(${id})" class="delete">Delete</button>
                </ul>
                </div> 
                </li>`;

            }
        });
    }

    taskBox.innerHTML = li || `<span>You don't have any task here</span> `;

}
showTodo("all_task");

function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask = true;
    taskInputs.value = taskName;
}

function deleteTask(deleteId){
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all_task");
}

delAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all_task");
});

function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "done";
    }

    else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "remaining";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}
taskInputs.addEventListener("keyup",e => {
    let userTask = taskInputs.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){
            if(!todos){
                todos = [];
            }
            let taskInfo = {name: userTask, status:"remaining"};
            todos.push(taskInfo);
        }else{
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInputs.value  = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all_task");

    }
});
