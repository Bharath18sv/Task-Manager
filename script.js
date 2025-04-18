document.addEventListener("DOMContentLoaded", () => {
  const addbtn = document.getElementById("AddTaskButton");
  const taskList = document.getElementById("taskList");
  const text = document.getElementById("inputForm");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    render(task);
  });

  addbtn.addEventListener("click", () => {
    let taskText = text.value.trim();
    console.log(taskText);

    if (taskText === "") return;

    let newTask = {
      task_id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    render(newTask);
    console.log(tasks);
    text.value=''
  });

  function render(task) {
    const li = document.createElement("li");
    li.setAttribute("task_id", task.task_id);
    if (task.completed) li.classList.add("taskCompleted");
    li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        e.preventDefault();
        tasks = tasks.filter((t) => t.task_id !== task.task_id);
        li.remove();
        saveTasks();
      }
      task.completed = !task.completed;
      li.classList.toggle("taskCompleted");
      saveTasks();
    });
    taskList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
