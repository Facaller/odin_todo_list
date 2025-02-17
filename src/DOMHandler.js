import { container } from "webpack";
import { Project } from "./projects";
import { Todo } from "./todos.js";

class DOMElements {
    constructor () {
        this.sidebarNav       = document.getElementById('sidebarNav');
        this.sidebarProjects  = document.querySelector('.sidebar-projects');
        this.todoBox          = document.querySelector('.todos-box');
        this.mainContent      = document.querySelector('.main-content');
        this.projectContainer = document.querySelector('.project-container');
        this.projectExitBtn   = document.querySelector('.project-exit');
        this.navProjectExit   = document.querySelector('.nav-project-exit');
        this.newProject       = document.querySelector('.new-project');
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
        this.todoMore         = document.getElementById('todoMore');
        this.moreOptionsTodo  = document.getElementById('moreOptionsTodo');
        this.editTodo         = document.getElementById('editTodo');
    }
}

class DOMHandler {
    constructor (tasklist) {
        this.tasklist      = tasklist;
        this.elements      = new DOMElements();
        this.renderedTasks = [];
        this.editTodo      = null;

        this.removeProject();
    }

    markTaskAsRendered (taskID) {
        this.renderedTasks.push(taskID);
    }

    checkRenderedTask (taskID) {
        return this.renderedTasks.includes(taskID);
    }

    removeRenderedTask (taskID) {
        const index = this.renderedTasks.indexOf(taskID);
        if (index !== -1) {
            this.renderedTasks.splice(index, 1);
        }
    }

    targetProjectForTodo (projectID, div) {
        const projectContainer = document.querySelector(`.project-container[data-id='${projectID}']`);
        if (projectContainer) {
            const todoBox = projectContainer.querySelector('.todos-box');
            todoBox.appendChild(div);
        }
    }

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
            this.tasklist.addTask(newProject);
            this.renderProject()
        })
    }

    submitTodoForm () {
        this.elements.submitTodo.addEventListener('click', (event) => {
            event.preventDefault();

            if (this.editTodo) {
                const todoID = this.editTodo.id;
                const existingTodo = this.tasklist.tasks.find(todo => todo.id === todoID);
                
                if (existingTodo) {
                    const newTitle   = this.elements.todoTitle.value.trim();
                    const newDetails = this.elements.todoDetails.value.trim();
                    const newDate    = this.elements.todoDate.value.trim();

                    this.tasklist.updateTask(todoID, newTitle, newDetails, newDate);
                    this.updateTodoDOM();
                    this.editTodo = null;
                }
            } else {
                const newTodo = this.getTodoValues();
                this.tasklist.addTask(newTodo);
                this.renderTodo();
            }
            this.elements.todoForm.reset();
            this.elements.todoForm.style.display = 'none'
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
        const newTitle   = this.elements.todoTitle.value.trim();
        const newDetails = this.elements.todoDetails.value.trim();
        const newDate    = this.elements.todoDate.value.trim();

        const newTodo = new Todo(newTitle, newDetails, newDate)

        return newTodo;
    }

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
        div.classList.add('new-project');

        const projectImg = document.createElement('img');
        div.appendChild(projectImg);

        const projectBtn = document.createElement('button');
        projectBtn.textContent = project.title;
        div.appendChild(projectBtn);

        const projectX = document.createElement('button');
        projectX.textContent = 'X';
        projectX.classList.add('nav-project-exit')
        div.appendChild(projectX);

        div.setAttribute('data-id', project.id);

        this.elements.sidebarProjects.insertBefore(div, this.elements.projectForm);
    }

    createTodo (todo, projectID) {
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

        div.setAttribute('data-id', todo.id);

        this.targetProjectForTodo(projectID, div);
    }

    renderProject () {
        this.tasklist.tasks.forEach(project => {
            if (getTaskType(task) === 'project') { 
                if (!this.checkRenderedTask(taskID)) {
                    this.createProjectForMain(project);
                    this.createProjectForNav(project);
                    this.markTaskAsRendered(taskID);
                }
            }
        })
    }

    renderTodo () {
        this.tasklist.tasks.forEach(todo => {
            if (getTaskType(task) === 'todo') {
                if (!this.checkRenderedTask(taskID)) {
                    this.createTodo(todo, projectID);
                    this.markTaskAsRendered(taskID);
                }
            }
        })
    }

    updateTodoDOM () {
        const todo = this.editTodo.closest('todo');
        const todoID = todo?.getAttribute('data-id');
        
        if (todoID) {
            const title   = this.elements.todoTitle.value.trim();
            const details = this.elements.todoDetails.value.trim();
            const date    = this.elements.todoDate.value.trim();

            todo.querySelector('h4').textContent = title;
            todo.querySelector('p').textContent = details;
            
            const dateElement = todo.this.todoDate; 
            if (dateElement) {
                dateElement.textContent = date;
            }
        }
    }

    bindSidebarButtons () {
        this.elements.sidebarNav.addEventListener('click', (event) => {
            const sidebarBtn = event.target.closest('button');
            
            if (sidebarBtn) {
                const BtnID = sidebarBtn.id;

                switch (BtnID) {
                    case 'allTasks':
                        this.tasklist.getAllTasks();
                        break
                    case 'today':
                        this.tasklist.getTasksDueToday();
                        break
                    case 'next7Days':
                        this.tasklist.getTasksForNextSevenDays();
                        break
                    case 'important':
                        this.tasklist.getAllImportantTasks();
                        break
                    case 'addProject':
                        this.renderProjectForm();
                        break
                    default:
                        break
                }
            }
        });
    }
//come back to updateTask method and check
    bindTodoButtons () {
        this.elements.todoBox.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (button) {
                const todoElement = event.target.closest('.todo');
                const buttonID = event.target.id;
            
                if (todoElement) {
                    const todoID = todoElement.getAttribute('data-id');
                    const todo = this.tasklist.tasks.find(task => task.id === todoID);
            
                    switch (buttonID) {
                        case 'important':
                            markTaskProperty(todoID, 'important');
                            break
                        case 'complete':
                            markTaskProperty(todoID, 'complete');
                            break
                        case 'edit':
                            this.todoTitle.value   = todoElement.title;
                            this.todoDetails.value = todoElement.details;
                            this.todoDate.value    = todoElement.date;
                            this.editTodo = todo;
                            this.elements.projectForm.style.display = 'block';
                            break
                        default:
                            break
                    }
                }
            }
        });
    }

    removeProject () {
        this.elements.mainContent.addEventListener('click', this.handleRemoveProject)
    }

    handleRemoveProject = (event) => {
        const exitButton = event.target.closest('.project-exit');
            
            if (exitButton) {
                const projectContainer = exitButton.closest('.project-container');
                const projectContainerID = projectContainer?.getAttribute('data-id');

                if (projectContainerID) {
                    const businessProject = this.tasklist.tasks.find(project => project.id === projectContainerID);

                    if (businessProject) {
                        projectContainer.style.display = 'none';
                        this.removeRenderedTask(projectContainerID);
                    }
                }
            }
    }

    deleteProject () {
        this.elements.mainContent.addEventListener('click', this)
    }

    handleDeleteProject = (event) => {
        const projectNav = event.target.closest('nav-project-exit');

        if (projectNav) {
            const navProject = projectNav.closest('.new-project');
            const navProjectID = navProject?.getAttribute('data-id');

            const businessProject = this.tasklist.tasks.find(project => project.id === navProjectID);

            if (businessProject) {
                this.removeRenderedTask(navProjectID);

                const projectContainer = document.querySelector(`.project-container[data-id='${navProjectID}']`);
                const projectNavContainer = document.querySelector(`.new-project[data-id='${navProjectID}']`);

                if (projectContainer) {
                    projectContainer.remove();
                }

                if (projectNavContainer) {
                    projectNavContainer.remove();
                }

                this.tasklist.removeTask(navProjectID);
            }
        }
    }

    showHideOptionsTodo () {
        this.elements.todoMore.addEventListener('click', (event) => {
            const todo = event.target.closest('todo');
            const moreOptions = todo.closest('moreOptionsTodo');

            if (todo && moreOptions.style.display === 'none') {
                moreOptions.style.display ='block';
            } else {
                moreOptions.style.display ='none';
            }
            this.elements.moreOptionsTodo.style.display = 'block';
        });
    }

    deleteTodo () {
        this.elements.todoBox.addEventListener('click', this.handleDeleteTodo)
    }

    handleDeleteTodo = (event) => {
        const editButton = event.target.closest('edit');

        if (editButton) {
            const todoContainer = editButton.closest('todo');
            const todoContainerID = todoContainer?.getAttribute('data-id');

            const businessTodo = this.tasklist.tasks.find(todo => todo.id === todoContainerID);

            if (businessTodo) {
                this.removeRenderedTask(todoContainerID)
                todoContainer.remove();
                this.tasklist.removeTask(todoContainerID);
            }
        }
    }

    cancelProjectForm () {
        this.elements.cancelProject.addEventListener('click', () => {
            this.elements.projectForm.reset();
        });
    }

    cancelTodoForm () {
        this.elements.cancelTodo.addEventListener('click', () => {
            this.elements.todoForm.reset();
        });
    }
}