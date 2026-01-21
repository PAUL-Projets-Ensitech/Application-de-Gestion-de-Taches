let tasks = [];

function loadTasks() {
    // À compléter
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // À compléter
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        // Créer les boutons et les ajouter
        taskList.appendChild(li);
    });
    // À compléter
}

function addTask(taskText) {
    if (taskText.trim() === "") {
        // Afficher un message d erreur
        return;
    }
    const task = {
        id: Date.now(),
        text: taskText.trim(),
        completed: false
    };
    tasks.push(task);
    saveTasks();
    displayTasks();
    // À compléter
}

function completeTask(index) {
    // À compléter
}

function deleteTask(index) {
    // À compléter
}