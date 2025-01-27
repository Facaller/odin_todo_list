import { container } from "webpack";
import { Project } from "./projects";
import { TaskList } from "./task";

class DOMElements {
    constructor () {
        this.sidebarNav      = document.getElementById('sidebarNav');
        this.sidebarProjects = document.querySelector('sidebarProjects');
        this.todoBox         = document.querySelector('.todos-box');
        this.mainContent     = document.querySelector('.main-content');
        this.projectBox      = document.querySelector('project-container');
        this.exitBtn         = document.querySelector('.project-exit');
        this.addProject      = document.getElementById('addProject');
        this.projectForm     = document.getElementById('projectForm');
        this.projectTitle    = document.getElementById('projectTitle');
        this.projectDetails  = document.getElementById('projectDetails');
        this.projectPrio     = document.getElementById('priority');
        this.submitProject   = document.getElementById('submitProject');
        this.cancelProject   = document.getElementById('cancelProject');
        this.addTodo         = document.getElementById('addTodo');
        this.todoForm        = document.getElementById('todoForm');
        this.todoTitle       = document.getElementById('todoTitle');
        this.todoDetails     = document.getElementById('todoDetails');
        this.todoDate        = document.getElementById('todoDate');
        this.submitTodo      = document.getElementById('submitTodo');
        this.cancelTodo      = document.getElementById('cancelTodo');
    }
}

class DOMHandler {
    constructor (app) {
        this.app = app;
        this.elements = new DOMElements();
    }
    //produce form
    //use values from form for parameters
    //call addTask method with arguments
    //
    renderProjectForm () {
        this.elements.addProject.addEventListener('click', () => {
            this.elements.projectForm.style.display = 'block'
        });
    }

    renderTodoForm () {
        this.elements.addTodo.addEventListener('click', () => {
            this.elements.todoForm.style.display = 'block'
        })
    }

    submitProjectForm () {
        this.elements.submitProject.addEventListener('click', (event) => {
            event.preventDefault();
            const newProject = this.getProjectValues();
            this.app.addProject(newProject);
            // render array here
        })
    }

    submitTodoForm () {
        this.elements.submitTodo.addEventListener('click', (event) => {
            event.preventDefault();
            const newTodo = this.getTodoValues();
            this.app.addProject(newTodo);
            // render array here
        })
    }

    getProjectValues () {
        const newTitle    = this.elements.projectTitle.value.trim();
        const newDetails  = this.elements.projectDetails.value.trim();
        const newPriority = [this.elements.projectPrio].find(prio => prio.checked)?.value || '';

        const newProject =  new Project(newTitle, newDetails, newPriority);

        return newProject;
    }

    getTodoValues () {
        const newTitle   =  this.elements.todoTitle.value.trim();
        const newDetails =  this.elements.todoDetails.value.trim();
        const newDate    =  this.elements.todoDate.value.trim();

        const newTodo = new Todo(newTitle, newDetails, newDate)

        return newTodo;
    }

    renderProject () {
        
    }

    renderProjectToMain () {
        const div = document.createElement('div');
        div.classList.add('.project-container');
        
        this.elements.mainContent.appendChild(div)
    }

    renderProjectToNav (project) {
        const div = document.createElement('div');
        // div.classList.add('.');

        this.elements.sidebarProjects.appendChild(div);
    }

    renderTodo () {

    }

    bindSidebarButtons () {
        this.elements.sidebarNav.addEventListener('click', (event) => {
            if (event.target.id === 'allTasks') {
                getAllTasks();
            } else if (event.target.id === 'today') {
                getTasksDueToday();
            } else if (event.target.id === 'next7Days') {
                getTasksForNextSevenDays();
            } else if (event.target.id === 'Important') {
                getAllImportantTasks();
            } else if (event.target.id === 'addProject') {
                renderProjectForm();
            }
        });
    }

    bindTodoButtons () {
        this.elements.todoBox.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const todoElement = event.target.closest('.todo');
                const buttonID = event.target.id;

                if (buttonID === 'important') {
                    const todoID = todoElement.todo.id;
                    markTaskProperty (todoID, 'important')
                } else if (buttonID === 'complete') {
                    const todoID = todoElement.todo.id;
                    markTaskProperty (todoID, 'complete')
                } else if (buttonID === 'edit') {
                    const todoID = todoElement.todo.id;
                    updateTask (todoID, newTitle, newDetails)
                    //need to create input form, will use that for other params
                }
            }
        })
    }
}