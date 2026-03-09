let tasks = [];
let editIndex = -1;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");
const taskError = document.getElementById("task-error");
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("other-theme");
});

const displayTasks = () => {
    taskList.innerHTML="";

    if(tasks.length === 0){
        emptyMsg.classList.remove('d-none');
        return;
    }
    emptyMsg.classList.add('d-none');

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.id = `list-item-${index}`;
        li.className = "list-group-item d-flex justify-content-between align-items-center py-2";
        li.innerHTML=`
            <div class="px-2">
                <input type="checkbox" ${task.completed ? "checked":""} onclick="toggleComplete(${index})">
                <span class="${task.completed ? "completed":""}">${task.text}</span>
            </div>
            <div class="d-flex">
                <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

const addTask = () => {
    taskError.textContent = "";
    let taskText = taskInput.value.trim();

    if (taskText === '') {
        taskError.textContent = "Please enter a task to be done.";
        return;
    }

    if (editIndex === -1) {
        tasks.push({ text:taskText, completed:false });
    } else {
        tasks[editIndex].text = taskText;
        editIndex = -1;
        addTaskBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Task`;
    }

    taskInput.value="";
    displayTasks();
}

addTaskBtn.addEventListener("click", addTask);


const editTask = (index) => {
    taskInput.value = tasks[index].text;
    editIndex = index;
    addTaskBtn.innerHTML = `<i class="fa-solid fa-rotate"></i> Update`;
}

const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

const deleteTask = (index) => {
    let delLiChild = `#list-item-${index}`;
    document.querySelector(delLiChild).remove();
    taskInput.value = '';
    tasks.splice(index,1);
    if(tasks.length === 0){
        emptyMsg.classList.remove('d-none');
    }
}

