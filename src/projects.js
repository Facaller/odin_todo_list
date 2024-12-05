import { Task, TaskList } from "./task";

class Project extends Task {
    constructor (title, details, status) {
        super (title, details);
        this.status = status;
        this.id = TaskList.generateID('project');
    }
}

class ProjectList extends TaskList {
    constructor () {
        super();
        this.projects = [];
    }
}

export default Project;