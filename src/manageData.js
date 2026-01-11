import { Task, Project, ProjectList } from "./taskData.js";

export function getLocalData() {
    let defaultProjectList;
    if (storageAvailable("localStorage") && localStorage.projectList) {

        defaultProjectList = JSON.parse(localStorage.projectList);
        // console.log("EXTRACT LOCAL DATA");
        // defaultProjectList = new ProjectList();
        // const defaultProject = new Project("Default Project");
        // defaultProjectList.addProject(defaultProject);
        // const project2 = new Project("Project 2");
        // defaultProjectList.addProject(project2);
        // const defaultTask = new Task("Task 1", "Some info", "2026-01-21", "high");
        // defaultProject.addTask(defaultTask);
        // const task2 = new Task("Task 2", "Second Task", "", "medium");
        // defaultProject.addTask(task2);
        // const task3 = new Task("Task 3", "Third Task", "2026-05-21", "low");
        // project2.addTask(task3);
    }
    else {
        defaultProjectList = new ProjectList();
        const defaultProject = new Project("Default Project");
        defaultProjectList.addProject(defaultProject);
    }
    return defaultProjectList;
}

export function setLocalData(projectList) {
    localStorage.projectList = JSON.stringify(projectList);
}

//Check if data is supported and available
//Copied from mdn web storage api page
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}