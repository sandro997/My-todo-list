/*
 * Creates a new <button> element with the text passed as a parameter.
 *
 * - Adds the 'align-center' CSS class to the button.
 * - If the button text is "Done":
 *    - Adds the 'done' class.
 *    - Attaches the click event to the `completedTask` function to mark the task as completed.
 * - If the button text is not "Done":
 *    - Adds the 'delete' class.
 *    - Attaches the click event to the `removeTask` function to remove the task from the list.
 */
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

/*
 * Creates a new <p> element with the text provided as a parameter.
 *
 * - If the provided string is not empty (after trimming whitespace):
 *    - Creates a <p> element and sets its text content to the string.
 *    - Returns the created <p> element.
 * - If the provided string is empty (after trimming whitespace):
 *    - Displays an alert message ("Casella di testo vuota").
 *    - Returns null to indicate no task was created.
 */
function createTaskText(string) {
  if (string.trim() !== "") {
    const taskText = document.createElement("p");
    taskText.textContent = string;
    taskText.addEventListener("click", taskEdit);
    return taskText;
  } else {
    alert("Casella di testo vuota");
    return null;
  }
}

/*
 * Creates a new <li> (list item) element with predefined classes.
 *
 * - Creates an <li> element and adds the CSS classes 'align-center' and 'list-element' to it.
 * - Returns the created <li> element.
 */
function createListElement() {
  const listElement = document.createElement("li");
  listElement.classList.add("align-center", "list-element");
  return listElement;
}
/*
 * Creates and appends a list item (task element) to a parent element.
 *
 * - Creates a new <li> element using `createListElement`.
 * - Appends the provided `taskCheck` element (checkbox or other element) to the <li>.
 * - Appends two buttons ("Done" and "Delete") to the <li> element using `createButton`.
 * - Appends the created <li> element to the specified parent element (`taskParent`).
 */
function elementTemplate(taskParent, taskCheck) {
  const task = createListElement();
  task.appendChild(taskCheck);
  task.appendChild(createButton("Done"));
  task.appendChild(createButton("Delete"));
  taskParent.appendChild(task);
}
/*
 * Creates a new task and appends it to the task list.
 * - Creates a task data object containing the task text and its completion status (defaulted to false).
 * - If the task description is valid (i.e., not empty):
 *    - Saves the task data using the `saveTask` function.
 *    - Appends the task element (with checkboxes and buttons) to the list using the `elementTemplate` function.
 *    - Clears the input field after adding the task.
 */
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
/*
 * Saves a new task to the localStorage.
 *
 * - Adds the new task to the `savedTasks` array.
 * - Updates the "tasks" entry in localStorage to store the updated task list.
 */

function saveTask(task) {
  savedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}
/*
 * Loads and displays tasks from localStorage.
 *
 * - Retrieves the stored tasks from localStorage (if available).
 * - If tasks are found, it parses the stored JSON data into the `savedTasks` array.
 * - Loops through each task in the `savedTasks` array:
 *    - Creates a task description element using `createTaskText`.
 *    - Appends the task element to the task list using `elementTemplate`.
 */
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

window.onload = function () {
  loadTasks();
  taskCounter.textContent = indexCompletedTask;
};
/*
 * Removes a task from the task list and updates localStorage.
 *
 * - Retrieves the task element to be removed by accessing the parent of the clicked button.
 * - Gets the text content of the task to identify it in the `savedTasks` array.
 * - Removes the task element from the DOM.
 * - Filters the `savedTasks` array to remove the task that matches the text content.
 * - Updates the "tasks" entry in localStorage with the modified task list.
 */
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
  howManyComplete();
}

let indexCompletedTask =
  JSON.parse(localStorage.getItem("Completed Task")) || 0;
const taskCounter = document.getElementById("counter");

/*
 * Increments the completed task counter and updates the displayed count.
 *
 * - Increases the value of `indexCompletedTask` by 1 to reflect a completed task.
 * - Updates the "Completed Task" entry in localStorage with the new count.
 * - Updates the displayed task count on the page by modifying the `textContent` of the `taskCounter` element.
 */
function howManyComplete() {
  indexCompletedTask++;
  localStorage.setItem("Completed Task", JSON.stringify(indexCompletedTask));
  taskCounter.textContent = indexCompletedTask;
}
