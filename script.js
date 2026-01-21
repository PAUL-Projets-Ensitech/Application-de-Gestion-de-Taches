let tasks = [];

document.addEventListener("DOMContentLoaded", function() {
    loadTasks();

    const form = document.getElementById("taskForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskInput = document.getElementById("taskInput");
        addTask(taskInput.value);
        taskInput.value = "";
    });
});

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
}

function saveTasks() {
    const texteJson = JSON.stringify(tasks);
    localStorage.setItem("tasks", texteJson);
    updateStats();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        if (task.completed === true) {
            li.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        li.appendChild(taskText);

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("btn-complete");

        if (task.completed === true) {
            completeBtn.textContent = "Tâche annulée";
        } else {
            completeBtn.textContent = "Tâche terminée";
        }

        completeBtn.onclick = function() {
            completeTask(index);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer la tâche";
        deleteBtn.classList.add("btn-delete");

        deleteBtn.onclick = function() {
            deleteTask(index);
        };

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
    updateStats();
}

function addTask(texteUtilisateur) {
    if (texteUtilisateur.trim() === "") {
        alert("Veuillez écrire une tâche dans cette boîte de texte !");
        return;
    }
    const newTask = {
        id: Date.now(),
        text: texteUtilisateur,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
}

function completeTask(index) {
    if (tasks[index].completed === true) {
        tasks[index].completed = false;
    } else {
        tasks[index].completed = true;
    }
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    const confirmation = confirm("Voulez-vous vraiment supprimer cette tâche ?");
    if (confirmation === true) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

function updateStats() { // Ma propre fonction pour les Stats
    const TachesTotales = document.getElementById("totalTasks");
    TachesTotales.textContent = tasks.length;
    let compteurTerminees = 0;
    tasks.forEach(function(task) {
        if (task.completed === true) {
            compteurTerminees = compteurTerminees + 1;
        }
    });
    const TachesTerminees = document.getElementById("completedTasks");
    TachesTerminees.textContent = compteurTerminees;
}