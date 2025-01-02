import { Task} from './task';
import { generateID } from './utility.js';
import { parse, format, isValid } from 'date-fns';

export class Todo extends Task {
    constructor (title, details, date, objectID, taskList) {
        super (title, details, 'todo');
        this.date = date;
        this.id   = generateID('todo');

        const parsedDate = parse(this.date, 'yyyy-MM-dd', new Date());

        if (!isValid(parsedDate)) {
            throw new Error('Invalid date');
        }
        
        this.rawDate = parsedDate;
        this.formattedDate = format(parsedDate, 'dd/MM/yyyy');

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

        return isValid(new Date(this.date));
    }
}