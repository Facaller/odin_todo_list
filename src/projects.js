import { Task, TaskList } from "./task";
import { generateID } from './utility.js';


export class Project extends Task {
    constructor (title, details, priority) {
        super (title, details, 'project');
        this.priority = priority;
        this.id = generateID('project');
    }

    validate () {
        const parentValidation = super.validate();
        if (!parentValidation) {
            return false;
        }

        if (this.priority && this.priority.trim() !== '') {
            console.log('Valid status');
            return true;
        } else {
            console.log('Invalid status');
            return false;
        }
    }
}