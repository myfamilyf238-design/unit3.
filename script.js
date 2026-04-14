//  Select Elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

// Filter buttons
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

// Initialize Data
let tasks = [];
let filteredTasks = [];
let currentFilter = "all";

// showTasks Function
function showTasks() {
  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<li>Your to-do list is empty!</li>";
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      applyFilter();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

//  Toggle Task
function toggleTask(taskId) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  applyFilter();
}

// Step 9: Task Counter
function updateTaskCount() {
  const activeTasks = tasks.filter(task => !task.completed).length;
 if (activeTasks === 1 ) {
    taskCounter.textContent = "1 item left";
 } else {
 taskCounter.textContent = `Active Tasks: ${activeTasks} items left`;
}
}
//  Apply Filter
function applyFilter() {
  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else {
    filteredTasks = [...tasks];
  }

  showTasks();
  updateTaskCount();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  applyFilter();
}

// Step 3 & 5: Add Task Button
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);

  taskInput.value = "";

  saveTasks();
  applyFilter();
}
taskList.innerHTML = "<li>Your to-do list is empty!</li>";
addTaskBtn.addEventListener("click", addTask);

// Step 8: Enter Key Support
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Filter Buttons
allBtn.addEventListener("click", () => {
  currentFilter = "all";
  applyFilter();
});

activeBtn.addEventListener("click", () => {
  currentFilter = "active";
  applyFilter();
});

completedBtn.addEventListener("click", () => {
  currentFilter = "completed";
  applyFilter();
});


// Clear Completed
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  applyFilter();
}

function markAllCompleted() {
  tasks = tasks.map(task => ({ ...task, completed: true }));
  saveTasks();
  applyFilter();
}

// Load tasks 
loadTasks();