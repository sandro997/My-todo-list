function createButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("align-content");
  return button;
}

function createTaskText(text) {
  if (text.trim() !== "") {
    const taskText = document.createElement("p");
    taskText.textContent = text;
    return taskText;
  } else {
    alert("Casella di testo vuota");
    return null;
  }
}

function createListElement() {
  const listElement = document.createElement("li");
  listElement.classList.add("align-content", "list-element");
  return listElement;
}

function elementTemplate(taskParent, taskCheck) {
  const task = createListElement();
  task.appendChild(taskCheck);
  task.appendChild(createButton("Done"));
  task.appendChild(createButton("Delete"));
  taskParent.appendChild(task);
}

function createTask() {
  const taskParent = document.querySelector("ul");
  const input = document.querySelector("input");
  const inputValue = input.value;
  const taskCheck = createTaskText(inputValue);
  const taskData = { myTask: inputValue, completed: false };

  if (taskCheck) {
    saveTask(taskData);
    elementTemplate(taskParent, taskCheck);
    input.value = "";
  }
}

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", createTask);

let savedTasks = [];

function saveTask(task) {
  savedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    savedTasks = JSON.parse(storedTasks);
  }
  const taskParent = document.querySelector("ul");
  savedTasks.forEach((taskData) => {
    const taskCheck = createTaskText(taskData.myTask);
    elementTemplate(taskParent, taskCheck);
  });
}

window.onload = loadTasks;
