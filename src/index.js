import "./styles.css";
import '../node_modules/modern-normalize';
import { Task, Project, ProjectList, refreshDOM } from "./taskData.js";

const projectList = document.getElementById("projectList");
const taskList = document.getElementById("TaskList");
const addTaskMenu = document.getElementById("newTaskMenu");
const taskNameField = document.getElementById("taskName");
const taskDescField = document.getElementById("taskDesc");
const taskDueField = document.getElementById("taskDueDate");
const taskPriorityField = document.getElementById("taskPriority");
const taskSubmit = document.getElementById("taskSubmit");

taskSubmit.addEventListener("click", function() {
    addNewTask(taskNameField.value, taskDescField.value, taskDueField.value, taskPriorityField.value);
    //clear fields
    // taskNameField.value = "";
    // taskDescField.value = "";
    // taskDueField.value = "";
    // taskPriorityField.value = "Low";
});

let selectedProject = 0;

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
            updateDOM();
        });

        //Event listeners for edit
        editIcon.addEventListener("click", function(event) {
            console.log("edit button clicked")
            event.stopPropagation();
            updateDOM();
        });

        //Event listeners for delete
        deleteIcon.addEventListener("click", function(event) {
            console.log("delete button clicked!")
            defaultProjectList.projects[project].deleteThis();
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
        console.log("Add Project clicked");
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
                // Highlight selected task box
                updateDOM();
            });

            editIcon.addEventListener("click", function(event) {
                console.log("edit button clicked")
                //Open window to edit task
                event.stopPropagation();
                updateDOM();
            });
            deleteIcon.addEventListener("click", function(event) {
                console.log("delete button clicked")
                //need to add confirmation dialog before deleting
                defaultProjectList.projects[selectedProject].tasks[task].deleteThis();
                //console.log(defaultProjectList.projects[selectedProject].tasks[task].isDeleted);
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
        addTaskMenu.showModal();
        //Open window to add new task
    });
    taskList.appendChild(addTaskBox);
}
updateDOM();


function addNewProject(name) {
    const newProject = new Project(name);
    defaultProjectList.addProject(newProject);
    updateDOM();
}

function addNewTask(name, desc, dueDate, priority) {
    console.log(`Adding new task: ${name}, ${desc}, ${dueDate}, ${priority}`);
    const newTask = new Task(name, desc, dueDate, priority);
    defaultProjectList.projects[selectedProject].addTask(newTask);
    addTaskMenu.close();
    updateDOM();
}

// function createTaskForm() {
//     const form = document.getElementById("menu");


//     addButton.textContent = "Add Task";
//     addButton.addEventListener("click", function() {
//         addNewTask(nameField.value, descField.value, "", "", "", false);
//     });

//     form.appendChild(nameField);
//     form.appendChild(addButton);

//     updateDOM();
// }


function createProjectForm() {
    const form = document.getElementById("menu");
    // const nameField = document.createElement("input");
    // nameField.setAttribute("type", "text");
    // nameField.setAttribute("value", "fsdfasdfawsefasdfasdf");
    // nameField.setAttribute("id", "newProjectName");
    // nameField.setAttribute("placeholder", "Project Name");

    // const addButton = document.createElement("button");
    // addButton.textContent = "Add Project";
    // addButton.addEventListener("click", function() {
    //     addNewProject(nameField.value);
    // });

    form.appendChild(nameField);
    form.appendChild(addButton);

    updateDOM();
}

updateDOM();
