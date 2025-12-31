import "./styles.css";
import '../node_modules/modern-normalize';
import { Task, Project, ProjectList, refreshDOM } from "./taskData.js";

const projectList = document.getElementById("projectList");
const taskList = document.getElementById("TaskList");
console.log("Webpack src successful!");

let selectedProject = 0;

//test data
//creates 2 projects with 2 tasks in the default project
const defaultProjectList = new ProjectList();
const defaultProject = new Project("Default Project");
defaultProjectList.addProject(defaultProject);
const project2 = new Project("Project 2");
defaultProjectList.addProject(project2);
const defaultTask = new Task("Task 1", "First Task", "Low", false);
defaultProject.addTask(defaultTask);
const task2 = new Task("Task 2", "Second Task", "Low", false);
defaultProject.addTask(task2);
const task3 = new Task("Task 3", "Third Task", "High", false);
project2.addTask(task3);




function updateDOM(currentProject = 0) {
    //Clear existing entries
    projectList.replaceChildren();
    taskList.replaceChildren();

    //Update Project List
    for (const project in defaultProjectList.projects) {
        const projectBox = document.createElement("div");
        projectBox.classList.add("projectEntry");

        const projectTitle = document.createElement("h3");
        projectTitle.textContent = defaultProjectList.projects[project].name;
        projectBox.appendChild(projectTitle);

        const projectIcons = document.createElement("div");
        projectIcons.classList.add("icons");

        //To replace "del" and "edit" text with icons later
        const editIcon = document.createElement("span");
        editIcon.classList.add("editIcon");
        editIcon.textContent = "Edit";
        projectIcons.appendChild(editIcon);
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("deleteIcon");
        deleteIcon.textContent = "Del";
        projectIcons.appendChild(deleteIcon);

        projectBox.addEventListener('click', function() {
            console.log("box clicked");
            // Highlight selected task box
            selectedProject = project;
            console.log("Selected Project: " + selectedProject);
            updateDOM();
        });

        editIcon.addEventListener("click", function(event) {
            console.log("edit button clicked")
            event.stopPropagation();
            updateDOM();
        });
        deleteIcon.addEventListener("click", function(event) {
            console.log("delete button clicked")
            event.stopPropagation();
            updateDOM();
        });

        projectBox.appendChild(projectIcons);

        projectList.appendChild(projectBox);

    }

    //Update Task List (set to only show tasks of default project)
    for (const task in defaultProjectList.projects[selectedProject].tasks) {
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
            defaultProjectList.projects[selectedProject].tasks[task].deleteThis();
            console.log(defaultProjectList.projects[selectedProject].tasks[task].isDeleted);
            event.stopPropagation();
            updateDOM();
        });

        taskList.appendChild(taskBox);
    }

   
    
}

console.log(defaultProjectList.projects);
updateDOM();