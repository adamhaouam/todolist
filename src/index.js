import "./styles.css";
import word from "./test.js";
import '../node_modules/modern-normalize';
import { Task, Project, ProjectList } from "./taskData.js";

console.log("Webpack src successful!");
console.log(word);


const defaultProjectList = new ProjectList();
const defaultProject = new Project("Default Project");
defaultProjectList.addProject(defaultProject);

const defaultTask = new Task("Task 1", "First Task", "Low", false);
defaultProject.addTask(defaultTask);

console.log(defaultProjectList);
console.log("printed")


const projectlist = document.getElementById("projectList");
projectlist.innerText = defaultProjectList.projects[0].name;

const tasklist = document.getElementById("TaskList");
tasklist.innerText = defaultProjectList.projects[0].tasks[0].name;