import { Task } from './task';
import { generateID } from './utility.js';
import { parse, format, isValid } from 'date-fns';

export class Todo extends Task {
    static MAX_TITLE_LENGTH = 50;
    static MAX_DETAILS_LENGTH = 150;

    constructor (title, details, date, projectID, id = null) {
        super (title, details, 'todo');
        this.date = date;
        this.id = id || generateID('todo');

        let parsedDate;

        if (typeof date === 'string' && date.includes('T')) {
            parsedDate = new Date(date);
        } else if (typeof date === 'string') {
            parsedDate = parse(date, 'yyyy-MM-dd', new Date());
        } else if (date instanceof Date) {
            parsedDate = date;
        } else {
            console.warn('Unexpected date format:', date);
            parsedDate = new Date();
        }

        if (!isValid(parsedDate)) {
            throw new Error('Invalid date');
        }
        
        this.date = parsedDate;
        this.formattedDate = format(parsedDate, 'dd/MM/yyyy');

        if (!projectID) {
            throw new Error('Project ID is required');
        }
    
        this.projectID = projectID;
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

    static fromJSON(data) {
        return new Todo(
            data.title,
            data.details,
            data.date,
            data.projectID,
            data.id
        );
    }
}