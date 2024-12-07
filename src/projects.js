import { Task, TaskList } from "./task";

class Project extends Task {
    constructor (title, details, status) {
        super (title, details);
        this.status = status;
        this.id = TaskList.generateID('project');
    }

    validate () {
        const parentValidation = super.validate();
        if (!parentValidation) {
            return false;
        }

        if (this.status && this.status.trim() !== '') {
            console.log('Valid status');
            return true;
        } else {
            console.log('Invalid status');
            return false;
        }
    }
}

class ProjectList extends TaskList {
    constructor () {
        super();
    }
}

export default Project;