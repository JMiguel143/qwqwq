const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = -1; 

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  if (editIndex === -1) {
    
    const task = { text: taskText };
    tasks.push(task);
  } else {
   
    tasks[editIndex].text = taskText;
    editIndex = -1; 
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";

  displayTasks();
}

function editTask(index) {
  editIndex = index;

  taskInput.value = tasks[index].text;
}

function deleteTask(index) {
  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
       <span>${task.text}</span>
       <hr>
       <button class="edit-button" onclick="editTask(${index})">Edit</button>
       <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
      `;

    taskList.appendChild(li);
  });
}

displayTasks();