let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log("work");

function addTaskToDown(task) {
    const li = document.createElement('li');
  
    li.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
      <label for="${task.id}">${task.text}</label>
      <i class="fa fa-trash delete" data-id="${task.id}"></i>
    `;
  
    taskList.appendChild(li);
  }
  

function renderList() {
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    addTaskToDown(tasks[i]);
  }

  tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification('Task toggled successfully');
    return;
  }

  showNotification('Could not toggle the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id !== taskId;
    });
  
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
  }
  

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification('Task added successfully');
    return;
  }

  showNotification('Task cannot be added');
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;

    if (!text) {
      showNotification('Text cannot be empty');
      return;
    }

    const task = {
      text,
      id: Date.now().toString(),
      done: false
    };

    e.target.value = '';
    addTask(task);
  }
}

function handleClickListener(e) {
    const target = e.target;
  
    if (target.classList.contains('delete')) {
      const taskId = target.dataset.id;
      deleteTask(taskId);
      return;
    } else if (target.className === 'custom-checkbox') {
      const taskId = target.id;
      toggleTask(taskId);
      return;
    }
  }
  

addTaskInput.addEventListener('keyup', handleInputKeyPress);
document.addEventListener('click', handleClickListener);









