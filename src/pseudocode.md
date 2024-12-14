// project.js

class Project {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    static getProjectId(projectName) {
        // logic to find and return the project ID based on project name or other criteria
    }
}

export { Project };

// todo.js
import { Project } from './project.js';

class Todo {
    constructor(title, projectName) {
        const projectId = Project.getProjectId(projectName);
        if (projectId) {
            this.title = title;
            this.projectId = projectId;
        } else {
            throw new Error('Project not found');
        }
    }
}

export { Todo };
