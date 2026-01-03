class Entry {
    constructor(name, isDeleted = false) {
        this.name = name;
        this.isDeleted = isDeleted;
    }

    deleteThis() {
        console.log("Deleting entry: " + this.name);
        this.isDeleted = true;
    }
}


class Task extends Entry {
    constructor(name, desc, dueDate, priority, status = false, id = crypto.randomUUID(), isDeleted = false) {
        super(name, isDeleted);
        this.id = id;
        this.detail = desc;
        this.priority = priority;
        this.done = status;
    }

    toggleDone() {
        this.done = !this.done;
    }
}

class Project extends Entry {
    constructor(name, isDeleted = false, id = crypto.randomUUID()) {
        super(name, isDeleted);
        this.id = id;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
    editName(newName) {
        this.name = newName;
    }   
}

class ProjectList {
    constructor() {
        this.projects = [];
    }
    
    addProject(project) {
        this.projects.push(project);
    }
}

export { Task, Project, ProjectList };