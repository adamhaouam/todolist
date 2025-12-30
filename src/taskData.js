class Task {
    constructor(name, detail, priority, done = false) {
        this.name = name;
        this.detail = detail;
        this.priority = priority;
        this.done = done;
    }

    //toggleDone
}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    //deleteTask
}

class ProjectList {
    constructor() {
        this.projects = [];
    }
    
    addProject(project) {
        this.projects.push(project);
    }

    //DeleteProject
}

export { Task, Project, ProjectList };