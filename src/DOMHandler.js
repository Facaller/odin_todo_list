import { container } from "webpack";
import { Project } from "./projects";
import { TaskList } from "./task";

class DOMElements {
    constructor () {
        this.sidebarNav       = document.getElementById('sidebarNav');
        this.sidebarProjects  = document.querySelector('.sidebarProjects');
        this.todoBox          = document.querySelector('.todos-box');
        this.mainContent      = document.querySelector('.main-content');
        this.projectContainer = document.querySelector('.project-container');
        this.exitBtn          = document.querySelector('.project-exit');
        this.addProject       = document.getElementById('addProject');
        this.projectForm      = document.getElementById('projectForm');
        this.projectTitle     = document.getElementById('projectTitle');
        this.projectDetails   = document.getElementById('projectDetails');
        this.projectPrio      = document.getElementById('priority');
        this.submitProject    = document.getElementById('submitProject');
        this.cancelProject    = document.getElementById('cancelProject');
        this.addTodo          = document.getElementById('addTodo');
        this.todoForm         = document.getElementById('todoForm');
        this.todoTitle        = document.getElementById('todoTitle');
        this.todoDetails      = document.getElementById('todoDetails');
        this.todoDate         = document.getElementById('todoDate');
        this.submitTodo       = document.getElementById('submitTodo');
        this.cancelTodo       = document.getElementById('cancelTodo');
    }
}

class DOMHandler {
    constructor (tasklist) {
        this.tasklist = tasklist;
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
            this.tasklist.addProject(newProject);
            this.renderProject()
        })
    }

    submitTodoForm () {
        this.elements.submitTodo.addEventListener('click', (event) => {
            event.preventDefault();
            const newTodo = this.getTodoValues();
            this.tasklist.addProject(newTodo);
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
// consider adding parameter for project to use ID if necessary
    createProjectForMain (project) {
        const div = document.createElement('div');
        div.classList.add('project-container');

        const box = document.createElement('div');
        box.classList.add('todos-box')
        div.appendChild(box);

        div.setAttribute('data-id', project.id);
        
        this.elements.mainContent.appendChild(div);
    }

    createProjectForNav (project) {
        const div = document.createElement('div');
        // div.classList.add('.');

        const projectBtn = document.createElement('button');
        projectBtn.textContent = project.title;
        div.appendChild(projectBtn);

        this.elements.sidebarProjects.insertBefore(div, this.elements.projectForm);
    }

    createTodo (todo) {
        const div = document.createElement('div');
        div.classList.add('todo');

        const h4 = document.createElement('h4');
        h4.textContent = todo.title;
        div.appendChild(h4);

        const p = document.createElement('p');
        p.textContent = todo.details;
        div.appendChild(p);

        const buttonDiv = document.createElement('div');
        div.appendChild(buttonDiv);

        const importantBtn = document.createElement('button');
        importantBtn.id = 'important';
        buttonDiv.appendChild(importantBtn);

        const completeBtn = document.createElement('button');
        completeBtn.id = 'complete';
        buttonDiv.appendChild(completeBtn);

        const editBtn = document.createElement('button');
        editBtn.id = 'edit';
        buttonDiv.appendChild(editBtn);

        this.elements.todoBox.insertBefore(div, this.elements.todoForm);
    }

    renderProject () {
        this.tasklist.tasks.forEach(project => {
            this.createProjectForMain(project);
            this.createProjectForNav(project);
        })
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