function createButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("align-content");
  return button;
}

function createTaskText() {
  const inputValue = document.querySelector("input").value;
  if (inputValue.trim() !== "") {
    const taskText = document.createElement("p");
    taskText.textContent = inputValue;
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
  const taskCheck = createTaskText();
  if (taskCheck) {
    const task = createListElement();
    task.appendChild(taskCheck);
    task.appendChild(createButton("Done"));
    task.appendChild(createButton("Delete"));
    taskParent.appendChild(task);
  }
}

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", createTask);
