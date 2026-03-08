document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const taskError = document.getElementById("task-error");

    // 1. FILTER SPECIAL CHARACTERS AS USER TYPES
    taskInput.addEventListener("keydown", function (e) {   
        taskError.textContent = "";
        // This regex allows letters (a-z, A-Z), numbers (0-9), and spaces
        const regex = /[^a-zA-Z0-9 ]/g; 
    
        if (regex.test(e.target.value)) {
            e.target.value = e.target.value.replace(regex, '');
            
            // Show error message immediately
            taskError.textContent = "Special characters are not allowed!";
        } 
    });

    // 2. ADD TASK ON BUTTON CLICK
    addTaskBtn.addEventListener("click", function () {

        // Get the FRESH value from the input right now
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                taskList.removeChild(listItem);
            });

            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);

            // Clear input and errors after success
            taskInput.value = "";
            taskError.textContent = "";
        }else {
            taskError.textContent = "Please enter a task to be done.";
        }
    });
});