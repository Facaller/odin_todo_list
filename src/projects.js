import { Task, TaskList } from "./task";
import { generateID } from './utility.js';


export class Project extends Task {
    constructor (title, details, status) {
        super (title, details, 'project');
        this.status = status;
        this.id = generateID('project');
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

export class ProjectList extends TaskList {
    constructor () {
        super();
    }

    getProjectID (projectTitle) {
        const project = this.tasks.find(task => task.title === projectTitle);

        if (!project) {
            console.log('Project does not exist');
            return null
        }
        return project.id;
    }
}