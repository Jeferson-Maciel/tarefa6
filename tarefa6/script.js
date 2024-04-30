const taskList = {
    tasks: [],

    
    addTask(taskName) {
        const newTask = { name: taskName, createdDate: new Date().toLocaleDateString(), completed: false };
        this.tasks.push(newTask);
        this.displayTasks();
    },

    
    toggleTaskCompletion(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
            this.displayTasks();
        } else {
            console.log("Índice de tarefa inválido!");
        }
    },

    
    clearCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.displayTasks();
    },

   
    displayTasks(tasksToShow = this.tasks) {
        const taskListElement = document.getElementById("taskList");
        taskListElement.innerHTML = tasksToShow.map(task => `
            <li class="${task.completed ? 'completed' : ''}">
                ${task.name}
                <button class="${task.completed ? 'undo' : 'complete'}" onclick="taskList.toggleTaskCompletion(${tasksToShow.indexOf(task)})">
                    ${task.completed ? "Desfazer" : "Concluir"}
                </button>
            </li>
        `).join("");
    },

    
    listPendingTasks() {
        const pendingTasks = this.tasks.filter(task => !task.completed);
        this.displayTasks(pendingTasks);
    },

    
    listCompletedTasks() {
        const completedTasks = this.tasks.filter(task => task.completed);
        this.displayTasks(completedTasks);
    },

    
    listAllTasks() {
        this.displayTasks();
    }
};


document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
        taskList.addTask(taskName);
        taskInput.value = "";
    }
});


document.getElementById("pendingTasksBtn").addEventListener("click", () => taskList.listPendingTasks());
document.getElementById("completedTasksBtn").addEventListener("click", () => taskList.listCompletedTasks());
document.getElementById("allTasksBtn").addEventListener("click", () => taskList.listAllTasks());
document.getElementById("clearCompletedTasksBtn").addEventListener("click", () => taskList.clearCompletedTasks());


taskList.displayTasks();
