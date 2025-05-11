import { Task } from "./task";
import { generateID } from './utility.js';


export class Project extends Task {
    static MAX_TITLE_LENGTH = 30;
    static MAX_DETAILS_LENGTH = 100;

    constructor (title, details, priority, id = null) {
        super (title, details, 'project');
        this.priority = priority;
        this.id = id || generateID('project');
    }

    _validateInputLength(title, details) {
        if (title.length > Project.MAX_TITLE_LENGTH) {
            throw new Error(`Project title too long. Max: ${Project.MAX_TITLE_LENGTH} characters.`);
        }
        if (details.length > Project.MAX_DETAILS_LENGTH) {
            throw new Error(`Project details too long. Max: ${Project.MAX_DETAILS_LENGTH} characters.`);
        }
    }

    validate () {
        const parentValidation = super.validate();
        if (!parentValidation) {
            return false;
        }

        if (this.priority && this.priority.trim() !== '') {
            console.log('Valid priority');
            return true;
        } else {
            console.log('Invalid priority');
            return false;
        }
    }

    static fromJSON (data) {
        return new Project (data.title, data.details, data.priority, data.id);
    }
}