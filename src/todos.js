import { Task} from './task';
import { generateID } from './utility.js';
import { format, isValid } from 'date-fns';

export class Todo extends Task {
    constructor (title, details, date, objectID, taskList) {
        super (title, details, 'todo');
        this.date = date;
        this.id   = generateID('todo');

        const parsedDate = new Date(this.date)

        if (!isValid(parsedDate)) {
            throw new Error('Invalid date');
        }
    
        this.date = format(parsedDate, 'dd/MM/yyyy');

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

        const parsedDate = new Date(this.date)

        if (isValid(parsedDate)) {
            console.log('Valid date');
            return true;
        } else {
            console.log('Invalid date');
            return false;
        }
    }
}