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

function createTask() {
  const taskParent = document.querySelector("ul");
  const input = document.querySelector("input");
  const inputValue = input.value;
  const taskCheck = createTaskText(inputValue);
  if (taskCheck) {
    const task = createListElement();
    task.appendChild(taskCheck);
    task.appendChild(createButton("Done"));
    task.appendChild(createButton("Delete"));
    taskParent.appendChild(task);
    input.value = "";
  }
}

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", createTask);
