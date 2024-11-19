let tasks = [];

// Load tasks from Local Storage when the app starts
const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks = storedTasks;
        updateTasksList();
        updateProgress();
    }
};

// Add a new task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to Local Storage
        updateTasksList();
        updateProgress(); // Update progress after adding a new task
    }
};

// Toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to Local Storage
    updateTasksList();
    updateProgress(); // Update progress after toggling completion
};

// Edit a task
const editTask = (index) => {
    const taskList = document.getElementById("task-list");
    const listItem = taskList.children[index];

    const task = tasks[index];
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.text;
    editInput.classList.add("edit-input");
    
    const taskDiv = listItem.querySelector(".task");
    taskDiv.innerHTML = "";
    taskDiv.appendChild(editInput);

    editInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const newText = editInput.value.trim();
            if (newText) {
                tasks[index].text = newText;
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to Local Storage
                updateTasksList();
                updateProgress();
            }
        }
    });
};

// Delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to Local Storage
    updateTasksList();
    updateProgress();
};

// Update the task list
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add("taskItem");

        listItem.innerHTML = `
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onclick="editTask(${index})"/>
                <img src="./img/bin.png" onclick="deleteTask(${index})"/>
            </div>
        `;
        listItem.querySelector(".checkbox").addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

// Update progress and display message if all tasks are completed
const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("numbers").textContent = `${completedTasks}/${totalTasks}`;

    if (completedTasks === totalTasks && totalTasks > 0) {
        triggerBoom();
    }
};

// Trigger the "Boom" effect
const triggerBoom = () => {
    const boomMessage = document.createElement("div");
    boomMessage.classList.add("boom-message");
    boomMessage.textContent = "🎉 Congratulations! You finished all tasks! 🎉";
    document.body.appendChild(boomMessage);

    setTimeout(() => {
        boomMessage.remove();
    }, 2000);
};

// Event listener for adding a new task
document.getElementById("newtask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});// Load tasks on page load
loadTasks();
 
