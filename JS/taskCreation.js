function createButton(string) {
  const button = document.createElement("button");
  button.textContent = string;
  button.classList.add("align-center");
  if (string === "Done") {
    button.classList.add("done");
    button.addEventListener("click", completedTask);
  } else {
    button.classList.add("delete");
    button.addEventListener("click", removeTask);
  }
  return button;
}

function createTaskText(string) {
  if (string.trim() !== "") {
    const taskText = document.createElement("p");
    taskText.textContent = string;
    taskText.addEventListener("click", taskEdit);
    return taskText;
  } else {
    return null;
  }
}

function createListElement() {
  const listElement = document.createElement("li");
  listElement.classList.add("align-center", "list-element");
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

  if (taskCheck) {
    const temporaryData = [...savedTasks];
    const uuid = generateUUID();
    assignUUID(taskCheck, uuid);
    const taskData = { uuid: uuid, myTask: inputValue, completed: false };
    saveTask(taskData);
    if (savedTasks.some((task) => task.uuid === uuid)) {
      elementTemplate(taskParent, taskCheck);
      myToast("Task salvata", "success");
    } else if (savedTasks.length < temporaryData.length) {
      myToast("Errore nel salvataggio della task", "error");
    }
    input.value = "";
  }
}

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", createTask);

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function assignUUID(element, uuid) {
  element.setAttribute("data-uuid", uuid);
  return element;
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (placeholderChar) {
      const randomValue = Math.floor(Math.random() * 16);
      const hexValue =
        placeholderChar === "x" ? randomValue : (randomValue & 0x3) | 0x8;
      return hexValue.toString(16);
    }
  );
}

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
    assignUUID(taskCheck, taskData.uuid);
    elementTemplate(taskParent, taskCheck);
  });
}

function removeTask(event) {
  const button = event.target;
  const parent = button.parentElement;
  const uuid = parent.firstChild.getAttribute("data-uuid");
  parent.remove();

  savedTasks = savedTasks.filter((task) => task.uuid !== uuid);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function completedTask(event) {
  removeTask(event);
  howManyComplete();
}

let indexCompletedTask =
  JSON.parse(localStorage.getItem("Completed Task")) || 0;
const taskCounter = document.getElementById("counter");

function howManyComplete() {
  indexCompletedTask++;
  localStorage.setItem("Completed Task", JSON.stringify(indexCompletedTask));
  taskCounter.textContent = indexCompletedTask;
}

window.onload = function () {
  loadTasks();
  taskCounter.textContent = indexCompletedTask;
};
