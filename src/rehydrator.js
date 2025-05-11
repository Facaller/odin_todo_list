import { Task } from './task.js';
import { Project } from './projects.js';
import { Todo } from './todos.js';
import { TaskList } from './task.js';

export function fromJSON (data) {
    const tasklist = new TaskList();

    tasklist.tasks = data.tasks.map(taskData => {
        if (taskData.type === 'project') {
            return Project.fromJSON(taskData);
        } else if (taskData.type === 'todo') {
            return Todo.fromJSON(taskData);
        } else {
            const task = Object.create(Task.prototype);
            Object.assign(task, taskData);
            return task;
        }
    });
    return tasklist
}
