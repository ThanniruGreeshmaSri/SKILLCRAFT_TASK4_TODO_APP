const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const clearAll = document.getElementById("clearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

searchInput.addEventListener("keyup", displayTasks);

clearAll.addEventListener("click", () => {
    if(confirm("Delete all tasks?")){
        tasks = [];
        saveTasks();
    }
});

function addTask(){

    const text = taskInput.value.trim();

    if(text===""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text:text,
        priority:priority.value,
        date:taskDate.value,
        time:taskTime.value,
        completed:false
    });

    taskInput.value="";
    taskDate.value="";
    taskTime.value="";

    saveTasks();
}

function displayTasks(){

    taskList.innerHTML="";

    const search = searchInput.value.toLowerCase();

    let completed=0;

    tasks.forEach((task,index)=>{

        if(!task.text.toLowerCase().includes(search))
            return;

        if(task.completed)
            completed++;

        const li=document.createElement("li");

        li.className="task";

        if(task.priority==="High")
            li.classList.add("priority-high");

        if(task.priority==="Medium")
            li.classList.add("priority-medium");

        if(task.priority==="Low")
            li.classList.add("priority-low");

        li.innerHTML=`
        <div class="task-info ${task.completed ? 'completed':''}">
            <h3>${task.text}</h3>
            <p>
            Priority : ${task.priority}<br>
            📅 ${task.date || "No Date"} &nbsp;&nbsp;
            ⏰ ${task.time || "No Time"}
            </p>
        </div>

        <div class="actions">

        <button class="complete-btn" onclick="toggleTask(${index})">
        ✔
        </button>

        <button class="edit-btn" onclick="editTask(${index})">
        ✏
        </button>

        <button class="delete-btn" onclick="deleteTask(${index})">
        🗑
        </button>

        </div>
        `;

        taskList.appendChild(li);

    });

    totalTasks.textContent=tasks.length;
    completedTasks.textContent=completed;
    pendingTasks.textContent=tasks.length-completed;

}

function toggleTask(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

}

function editTask(index){

    const newTask=prompt("Edit Task",tasks[index].text);

    if(newTask!==null && newTask.trim()!==""){

        tasks[index].text=newTask;

        saveTasks();

    }

}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

    }

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

    displayTasks();

}