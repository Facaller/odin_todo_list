import { Task } from './task';
import { generateID } from './utility.js';
import { parse, format, isValid } from 'date-fns';

export class Todo extends Task {
    static MAX_TITLE_LENGTH = 50;
    static MAX_DETAILS_LENGTH = 150;

    constructor (title, details, date, objectID, taskList) {
        super (title, details, 'todo');
        this.date = date;
        this.id   = generateID('todo');

        const parsedDate = parse(this.date, 'yyyy-MM-dd', new Date());

        if (!isValid(parsedDate)) {
            throw new Error('Invalid date');
        }
        
        this.date = parsedDate;
        this.formattedDate = format(parsedDate, 'dd/MM/yyyy');

        const projectID = taskList.getTaskID(objectID);

        if (projectID) {
            this.projectID = projectID
        } else {
            throw new Error('Project not found');
        }
    }

    _validateInputLengths (title, details) {
        if (title.length > Todo.MAX_TITLE_LENGTH) {
            throw new Error(`Todo title too long. Max: ${Todo.MAX_TITLE_LENGTH} characters.`);            
        }
        if (details.length > Todo.MAX_DETAILS_LENGTH) {
            throw new Error(`Todo details too long. Max: ${Todo.MAX_DETAILS_LENGTH} characters.`);
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