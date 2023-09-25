const searchInput = document.getElementById("search-input");
const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

// function to show and hide the custom alert

function showAlert(message) {
  const customAlert = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");
  alertMessage.textContent = message;
  customAlert.style.display = "flex";
}

function hideAlert() {
  const customAlert = document.getElementById("custom-alert");
  customAlert.style.display = "none";
}

document.getElementById("close-alert").addEventListener("click", hideAlert);

// ADD TASK FUNCTION
function addtask() {
  if (inputBox.value === "") {
    showAlert("Please enter a task");
  } else {
    let li = document.createElement("li");
    li.innerHTML = `
      <span class="task-text">${inputBox.value}</span>
      <span class="task-actions">
        <button class="edit-icon"><i class="fas fa-edit"></i></button>
        <button class="delete-icon"><i class="fas fa-trash"></i></button>
      </span>
    `;

    li.querySelector(".edit-icon").addEventListener("click", function () {
      editTask(li);
    });

    li.querySelector(".delete-icon").addEventListener("click", function () {
      li.remove();
      savedata();
    });

    listcontainer.appendChild(li);
  }
  inputBox.value = "";
  savedata();
}

// SEARCH TASK FUNCTION
function searchTask() {
  const searchText = searchInput.value.toLowerCase();

  const tasks = document.querySelectorAll("#list-container li");

  tasks.forEach((task) => {
    const taskText = task.querySelector(".task-text").textContent.toLowerCase();

    if (taskText.includes(searchText)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", searchTask);

// EDIT TASK FUNCTION
function editTask(taskItem) {
  const taskText = taskItem.querySelector(".task-text");

  const editedTaskInput = document.getElementById("editedTask");

  editedTaskInput.value = taskText.textContent;

  const editModal = document.getElementById("editModal");

  editModal.style.display = "block";

  // Handle Save button click
  const saveEditButton = document.getElementById("saveEdit");
  saveEditButton.addEventListener("click", function () {
    taskText.textContent = editedTaskInput.value;
    editModal.style.display = "none";
    savedata();
  });

  // Handle modal close button click
  const closeModalButton = document.querySelector(".close");
  closeModalButton.addEventListener("click", function () {
    editModal.style.display = "none";
  });
}

// DELETE HANDLER
listcontainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      savedata();
    } else if (e.target.classList.contains("edit-icon")) {
      // Handle edit button click
      const taskItem = e.target.parentElement.parentElement;
      editTask(taskItem);
    } else if (e.target.classList.contains("delete-icon")) {
      // Handle delete button click with remove function
      e.target.parentElement.parentElement.remove();
      savedata();
    }
  },
  false
);
function savedata() {
  localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask() {
  listcontainer.innerHTML = localStorage.getItem("data");
}
showTask();
