import "./styles.css";
import '../node_modules/modern-normalize';
import { Task, Project, ProjectList } from "./taskData.js";

const projectList = document.getElementById("projectList");
const taskList = document.getElementById("TaskList");

const newProjectMenu = document.getElementById("newProjectMenu");
const newProjectForm = document.getElementById("newProjectForm");
const projectNameField = document.getElementById("projectName");
const projectSubmit = document.getElementById("projectSubmit");

const editProjectMenu = document.getElementById("editProjectMenu");
const editProjectForm = document.getElementById("editProjectForm");
const projectEditNameField = document.getElementById("projectEditName");
const projectEditSubmit = document.getElementById("projectEditSubmit");

const TaskMenu = document.getElementById("TaskMenu");
const taskForm = document.getElementById("TaskForm");
const taskNameField = document.getElementById("taskName");
const taskDescField = document.getElementById("taskDesc");
const taskDueField = document.getElementById("taskDueDate");
const taskPriorityField = document.getElementById("taskPriority");
const taskSubmit = document.getElementById("taskSubmit");
const taskEdit = document.getElementById("taskEdit");




projectSubmit.addEventListener("click", function() {
    if (!newProjectForm.checkValidity()) {
        alert("Please fill out all required fields.");
    }
    else {
        addNewProject(projectNameField.value);
        projectNameField.value = "";
        newProjectMenu.close();
        selectedProject = findLastSelectedProject();
        updateDOM();
    }
    
});

projectEditSubmit.addEventListener("click", function() {
    if (!editProjectForm.checkValidity()) {
        alert("Please fill out all required fields.");
    }
    else {
        editProject(projectEditNameField);
        editProjectMenu.close();
        updateDOM();
    }
    
});



taskSubmit.addEventListener("click", function() {
    if (!taskForm.checkValidity()) {
        alert("Please fill out all required fields.");
    }
    else {
        addNewTask(taskNameField.value, taskDescField.value, taskDueField.value, taskPriorityField.value);
        taskNameField.value = "";
        taskDescField.value = "";
        taskDueField.value = "";
        taskPriorityField.value = "Low";
        TaskMenu.close();
        updateDOM();
    }
    
});

taskEdit.addEventListener("click", function() {
    if (!taskForm.checkValidity()) {
        alert("Please fill out all required fields.");
    }
    else {
        editTask(taskNameField.value, taskDescField.value, taskDueField.value, taskPriorityField.value);
        taskNameField.value = "";
        taskDescField.value = "";
        taskDueField.value = "";
        taskPriorityField.value = "Low";
        TaskMenu.close();
        updateDOM();
    }
    
});



//test data
//creates 2 projects with 2 tasks in the default project and 1 task in the 2nd project
const defaultProjectList = new ProjectList();
const defaultProject = new Project("Default Project");
defaultProjectList.addProject(defaultProject);
const project2 = new Project("Project 2");
defaultProjectList.addProject(project2);
const defaultTask = new Task("Task 1", "Some info", "date", "High");
defaultProject.addTask(defaultTask);
const task2 = new Task("Task 2", "Second Task", "Low", false);
defaultProject.addTask(task2);
const task3 = new Task("Task 3", "Third Task", "High", false);
project2.addTask(task3);


let selectedProject = findFirstUndeletedProject();
let selectedTask = findFirstUndeletedTask();


function updateDOM() {
    //Clear existing entries
    projectList.replaceChildren();
    taskList.replaceChildren();

    //Update Project List
    if (defaultProjectList.projects.filter(proj => proj.isDeleted === false).length === 0) {
            const noProjectsMsg = document.createElement("div");
            noProjectsMsg.classList.add("projectEntry");
            noProjectsMsg.textContent = "No projects available. Please add a new project.";
            projectList.appendChild(noProjectsMsg);
    }

    for (const project in defaultProjectList.projects) {
        if (defaultProjectList.projects[project].isDeleted === false) {
            //create project box for each project
            const projectBox = document.createElement("div");
            projectBox.classList.add("projectEntry");

            //change colour if selected
            if (project == selectedProject) {
                projectBox.classList.add("selected");
            }

            const projectTitle = document.createElement("h3");
            projectTitle.textContent = defaultProjectList.projects[project].name;
            projectBox.appendChild(projectTitle);

            //add icons for edit and delete
            const projectIcons = document.createElement("div");
            projectIcons.classList.add("icons");
            const editIcon = document.createElement("span");
            editIcon.classList.add("editIcon");
            //To replace "del" and "edit" text with icons later
            editIcon.textContent = "Edit";
            projectIcons.appendChild(editIcon);
            const deleteIcon = document.createElement("span");
            deleteIcon.classList.add("deleteIcon");
            deleteIcon.textContent = "Del";
            projectIcons.appendChild(deleteIcon);

            //Add event listener for selecting project
            projectBox.addEventListener('click', function() {
                console.log("box clicked");
                // Highlight selected task box
                selectedProject = project;
                console.log("Selected Project: " + selectedProject);
                selectedTask = "";
                updateDOM();
            });

            //Event listeners for edit
            editIcon.addEventListener("click", function(event) {
                console.log("edit button clicked");
                selectedProject = project;
                editProjectMenu.showModal();
                projectEditNameField.value = defaultProjectList.projects[selectedProject].name;
            });

            //Event listeners for delete
            deleteIcon.addEventListener("click", function(event) {
                console.log("delete button clicked!")
                defaultProjectList.projects[project].deleteThis();
                if (selectedProject == project) {
                    selectedProject = findFirstUndeletedProject();
                };
                event.stopPropagation();
                updateDOM();
            });

            //apend icons to project box and project box to project list
            projectBox.appendChild(projectIcons);
            projectList.appendChild(projectBox);
        }
    }
    
    //add field for adding new project
    const addProjectBox = document.createElement("div");
    addProjectBox.classList.add("projectEntry", "newProjectEntry");
    addProjectBox.textContent = "+ Add New Project";
    addProjectBox.addEventListener("click", function() {
        console.log("Add Project clicked123");
        newProjectMenu.showModal();
        //Open window to add new project
    });
    projectList.appendChild(addProjectBox);

    //Update Task List (set to only show tasks of default project)
    if (defaultProjectList.projects[selectedProject].tasks.filter(tsk => tsk.isDeleted === false).length === 0) {
            const noTasksMsg = document.createElement("div");
            noTasksMsg.classList.add("taskEntry");
            noTasksMsg.textContent = "No tasks available. Please add a new task.";
            taskList.appendChild(noTasksMsg);
    }
    for (const task in defaultProjectList.projects[selectedProject].tasks) {
        if (defaultProjectList.projects[selectedProject].tasks[task].isDeleted === false) {
            const taskBox = document.createElement("div");
            taskBox.classList.add("taskEntry");

            if (task == selectedTask) {
                taskBox.classList.add("selected");
            }

            const taskTitle = document.createElement("h3");
            taskTitle.textContent = defaultProjectList.projects[selectedProject].tasks[task].name;
            taskBox.appendChild(taskTitle);
            const taskIcons = document.createElement("div");
            taskIcons.classList.add("icons");

            //To replace "del" and "edit" text with icons later
            const editIcon = document.createElement("span");
            editIcon.classList.add("editIcon");
            editIcon.textContent = "Edit";
            taskIcons.appendChild(editIcon);
            const deleteIcon = document.createElement("span");
            deleteIcon.classList.add("deleteIcon");
            deleteIcon.textContent = "Del";
            taskIcons.appendChild(deleteIcon);
            taskBox.appendChild(taskIcons); 

            taskBox.addEventListener('click', function() {
                console.log("box clicked");
                selectedTask = task;
                console.log("Selected Task: " + selectedTask);
                // Highlight selected task box
                updateDOM();
            });

            editIcon.addEventListener("click", function(event) {
                console.log("edit button clicked")
                selectedTask = task;
                taskSubmit.style.display = "none";
                taskEdit.style.display = "block";
                TaskMenu.showModal();
                taskNameField.value = defaultProjectList.projects[selectedProject].tasks[task].name;
                event.stopPropagation();
                updateDOM();
            });
            deleteIcon.addEventListener("click", function(event) {
                console.log("delete button clicked")
                //need to add confirmation dialog before deleting
                defaultProjectList.projects[selectedProject].tasks[task].deleteThis();
                if (selectedTask == task) {
                    selectedTask = findFirstUndeletedTask();
                };
                event.stopPropagation();
                updateDOM();
            });

            taskList.appendChild(taskBox);
        }
    }

    //add field for adding new task
    const addTaskBox = document.createElement("div");
    addTaskBox.classList.add("taskEntry", "newTaskEntry");
    addTaskBox.textContent = "+ Add New Task";
    addTaskBox.addEventListener("click", function() {
        console.log("Add Task clicked");
        TaskMenu.showModal();
        taskSubmit.style.display = "block";
        taskEdit.style.display = "none";
    });
    taskList.appendChild(addTaskBox);
}

function addNewProject(name) {
    const newProject = new Project(name);
    defaultProjectList.addProject(newProject);
}

function addNewTask(name, desc, dueDate, priority) {
    console.log(`Adding new task: ${name}, ${desc}, ${dueDate}, ${priority}`);
    const newTask = new Task(name, desc, dueDate, priority);
    defaultProjectList.projects[selectedProject].addTask(newTask);
}

//Edit Project
function editProject(newName) {
    defaultProjectList.projects[selectedProject].editName(newName);
    projectEditNameField.value = "";
}
//Edit Task
function editTask(name, desc, dueDate, priority) {
    defaultProjectList.projects[selectedProject].tasks[selectedTask].editTask(name, desc, dueDate, priority);
    //clear all fields
}


function findFirstUndeletedProject() {
    for (const project in defaultProjectList.projects) {
        console.log("Checking", defaultProjectList.projects[project])
        if (defaultProjectList.projects[project].isDeleted === false) {
            return project;
        }
    }
    return null;
}

function findLastSelectedProject() {
    for (let i = defaultProjectList.projects.length - 1; i >= 0; i--) {
        if (defaultProjectList.projects[i].isDeleted === false) {
            return i;
        }
    }
    return null;
}

function findFirstUndeletedTask() {
    for (const task in defaultProjectList.projects[selectedProject].tasks) {
        if (defaultProjectList.projects[selectedProject].tasks[task].isDeleted === false) {
            return task;
        }
    }
}

updateDOM();
