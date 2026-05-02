// Select Elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCount"); 

// Filter buttons
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

// Clear button
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Initialize Data
let tasks = [];
let filteredTasks = [];
let currentFilter = "all";

// Show Tasks
function showTasks() {
  taskList.innerHTML = "";

  // Better empty handling
  if (tasks.length === 0) {
    taskList.innerHTML = "<li>Your to-do list is empty!</li>";
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    // Text
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

// Toggle Task
function toggleTask(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks();
  applyFilter();
}

// Task Counter
function updateTaskCount() {
  const activeTasks = tasks.filter(task => !task.completed).length;

  if (activeTasks === 1) {
    taskCounter.textContent = "1 item left";
  } else {
    taskCounter.textContent = `${activeTasks} items left`;
  }
}

// Update Active Filter Button UI
function updateActiveButton() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (currentFilter === "all") allBtn.classList.add("active");
  if (currentFilter === "active") activeBtn.classList.add("active");
  if (currentFilter === "completed") completedBtn.classList.add("active");
}

// Apply Filter
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
  updateActiveButton(); 
}

// Save Tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  applyFilter();
}

// Add Task
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

// Event Listeners
addTaskBtn.addEventListener("click", addTask);

// Enter key support (UPDATED)
taskInput.addEventListener("keydown", (event) => {
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

// Connect Clear Button 
clearCompletedBtn.addEventListener("click", clearCompleted);

// Load tasks on start
document.addEventListener("DOMContentLoaded", loadTasks);
