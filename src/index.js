import "./styles.css";
import '../node_modules/modern-normalize';
import { Task, Project, ProjectList } from "./taskData.js";

const projectList = document.getElementById("projectList");
const taskList = document.getElementById("TaskList");

console.log("Webpack src successful!");


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




function updateDOM(currentTask = 0) {
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

        projectBox.appendChild(projectIcons);

        projectList.appendChild(projectBox);
    }

    //Update Task List (set to only show tasks of default project)
    for (const task in defaultProjectList.projects[currentTask].tasks) {
        const taskBox = document.createElement("div");
        taskBox.classList.add("taskEntry");

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = defaultProjectList.projects[currentTask].tasks[task].name;
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
        taskList.appendChild(taskBox);
    }
}

console.log(defaultProjectList.projects);
updateDOM();
