import { Task} from './task';
import { generateID } from './utility.js';
import { format, isValid } from 'date-fns';

export class Todo extends Task {
    constructor (title, details, date, objectID, taskList) {
        super (title, details, 'todo');
        this.date = date;
        this.id   = generateID('todo');

        const formattedDate = format(new Date(this.date), 'dd/MM/yyyy');
        const parsedDate = isValid(formattedDate) ? formattedDate : null;

        if (parsedDate) {
            formattedDate = parsedDate;
        } else {
            throw new Error('Invalid date format');
        }

        const projectID = taskList.getTaskID(objectID);

        if (projectID) {
            this.projectID = projectID
        } else {
            throw new Error('Project not found');
        }
    }

    validate () {
        const parentValidation = super.validate();
        if (!parentValidation) {
            return false;
        }

        if (this.date && isValid(this.date)) {
            console.log('Valid date');
            return true;
        } else {
            console.log('Invalid date');
            return false;
        }
    }
}