function taskEdit(event) {
  const clickedTask = event.target;
  let taskContent = clickedTask.innerText;

  const newInput = createInput(taskContent);

  clickedTask.replaceWith(newInput);
  newInput.focus();
}

function createInput(innerText) {
  const taskInput = document.createElement("input");
  taskInput.addEventListener("keydown", editedParagraph);
  taskInput.classList.add("new-input");
  taskInput.type = "text";
  taskInput.value = innerText;
  return taskInput;
}

function editedParagraph(event) {
  if (event.key === "Enter") {
    const taskInput = event.target;
    const taskContent = taskInput.value;
    if (taskContent !== "") {
      const newTask = createTaskText(taskContent);

      if (newTask) {
        taskInput.replaceWith(newTask);
      }
    } else {
    }
  }
}
