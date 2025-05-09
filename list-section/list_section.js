function createButton(string) {
  const button = document.createElement("button");
  button.textContent = string;
  button.classList.add("align-content");
  if (string === "Done") {
    button.classList.add("done");
    button.addEventListener("click", completedTask);
  } else button.classList.add("delete");
  return button;
}
function createTaskText(string) {
  if (string.trim() !== "") {
    const taskText = document.createElement("p");
    taskText.textContent = string;
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

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

function removeTask(event) {
  const button = event.target;
  const parent = button.parentElement;
  const taskText = parent.firstChild.textContent;
  parent.remove();

  savedTasks = savedTasks.filter((task) => task.myTask !== taskText);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function completedTask(event) {
  removeTask(event);
}
