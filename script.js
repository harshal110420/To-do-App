const searchInput = document.getElementById("search-input");
const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

const customAlert = document.getElementById("custom-alert");
const alertMessage = document.getElementById("alert-message");
const editModal = document.getElementById("editModal");
const editedTaskInput = document.getElementById("editedTask");
const saveEditButton = document.getElementById("saveEdit");

// Function to show the custom alert
function showAlert(message) {
  alertMessage.textContent = message;
  customAlert.style.display = "flex";
  // console.log(`Alert: ${message}`);
}

// Function to hide the custom alert
function hideAlert() {
  customAlert.style.display = "none";
  // console.log("Alert hidden");
}

// Event listener to close the custom alert
document.getElementById("close-alert").addEventListener("click", () => {
  hideAlert();
  // console.log("Alert closed");
});

// Function to add a task
function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    showAlert("Please enter a task");
    // console.log("Task not added: Empty input");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <span class="task-actions">
      <button class="edit-icon"><i class="fas fa-edit"></i></button>
      <button class="delete-icon"><i class="fas fa-trash"></i></button>
    </span>
  `;

  li.querySelector(".edit-icon").addEventListener("click", () => editTask(li));

  li.querySelector(".delete-icon").addEventListener("click", () => {
    li.remove();
    saveData();
    // console.log("Task deleted");
  });

  listcontainer.appendChild(li);
  inputBox.value = "";
  saveData();
  // console.log(`Task added: ${taskText}`);
}

// Function to search for tasks
function searchTasks() {
  const searchText = searchInput.value.toLowerCase();

  document.querySelectorAll("#list-container li").forEach((task) => {
    const taskText = task.querySelector(".task-text").textContent.toLowerCase();
    if (taskText.includes(searchText)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  // console.log(`Search: ${searchText}`);
}

// Event listener for input changes in the search bar
searchInput.addEventListener("input", () => {
  searchTasks();
  // console.log("Search input changed");
});

// Function to edit a task
function editTask(taskItem) {
  const taskText = taskItem.querySelector(".task-text");

  // Check if the task is completed (has the "checked" class)
  const isCompleted = taskItem.classList.contains("checked");
  if (isCompleted) {
    // console.log("Cannot edit a completed task.");
    return; // Disable editing for completed tasks
  }

  editedTaskInput.value = taskText.textContent;
  editModal.style.display = "block";

  // Handle Save button click
  saveEditButton.addEventListener("click", () => {
    taskText.textContent = editedTaskInput.value;
    editModal.style.display = "none";
    saveData();
    // console.log(`Task edited: ${editedTaskInput.value}`);
  });

  // Handle modal close button click
  document.querySelector(".close").addEventListener("click", () => {
    editModal.style.display = "none";
    // console.log("Edit modal closed");
  });
}

// Function to save task data to localStorage
function saveData() {
  localStorage.setItem("data", listcontainer.innerHTML);
  // console.log("Data saved to localStorage");
}

// Function to display tasks from localStorage
function showTasks() {
  listcontainer.innerHTML = localStorage.getItem("data");
  // console.log("Tasks loaded from localStorage");
}

// Initialize the application
showTasks();

// Event delegation for list item actions (check, edit, delete)
listcontainer.addEventListener("click", (e) => {
  const target = e.target;
  const taskItem = target.closest("li");

  if (!taskItem) return;

  if (target.tagName === "LI") {
    taskItem.classList.toggle("checked");
    saveData();
    // console.log("Task checked");
  } else if (target.classList.contains("edit-icon")) {
    editTask(taskItem);
    // console.log("Edit button clicked");
  } else if (target.classList.contains("delete-icon")) {
    taskItem.remove();
    saveData();
    // console.log("Task deleted");
  }
});
