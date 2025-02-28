import { container } from "webpack";
import { Project } from "./projects";
import { Todo } from "./todos.js";

class DOMElements {
    constructor () {
        this.sidebarNav         = document.getElementById('sidebarNav');
        this.sidebarProjects    = document.querySelector('.sidebar-projects');
        this.todoBox            = document.querySelector('.todos-box');
        this.mainContent        = document.querySelector('.main-content');
        this.projectContainer   = document.querySelector('.project-container');
        this.projectExitBtn     = document.querySelector('.project-exit');
        this.newProject         = document.querySelector('.new-project');
        this.addProject         = document.getElementById('addProject');
        this.projectImage       = document.getElementById('projectImg');
        this.projectMore        = document.getElementById('projectMore');
        this.moreOptionsProject = document.getElementById('moreOptionsProject');
        this.editProjectBtn     = document.getElementById('editProjectBtn');
        this.deleteProjectBtn   = document.getElementById('deleteProjectBtn');
        this.projectForm        = document.getElementById('projectForm');
        this.projectTitle       = document.getElementById('projectTitle');
        this.projectDetails     = document.getElementById('projectDetails');
        this.projectPrio        = document.querySelectorAll('input[name="priority"]');
        this.contemplativePrio  = document.getElementById('contemplativePrio');
        this.pragmaticPrio      = document.getElementById('pragmaticPrio');
        this.imperativePrio     = document.getElementById('imperativePrio');
        this.submitProject      = document.getElementById('submitProject');
        this.cancelProject      = document.getElementById('cancelProject');
        this.addTodo            = document.getElementById('addTodo');
        this.todoMore           = document.getElementById('todoMore');
        this.moreOptionsTodo    = document.getElementById('moreOptionsTodo');
        this.editTodoButton     = document.getElementById('editTodoBtn');
        this.deleteTodoBtn      = document.getElementById('deleteTodoBtn');
        this.todoForm           = document.getElementById('todoForm');
        this.todoTitle          = document.getElementById('todoTitle');
        this.todoDetails        = document.getElementById('todoDetails');
        this.todoDate           = document.getElementById('todoDate');
        this.submitTodo         = document.getElementById('submitTodo');
        this.cancelTodo         = document.getElementById('cancelTodo');
    }
}

class DOMHandler {
    constructor (tasklist) {
        this.tasklist      = tasklist;
        this.elements      = new DOMElements();
        this.renderedTasks = [];
        this.editTodo      = null;
        this.editProject   = null;

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
//Task Management
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
        projectImg.classList.add('project-img');
        div.appendChild(projectImg);

        const title = document.createElement('h4');
        div.appendChild(title);

        const details = document.createElement('div');
        details.classList.add('nav-project-details');
        div.appendChild(details);

        const detailsText = document.createElement('p');
        details.appendChild(detailsText);

        const more = document.createElement('div');
        more.classList.add('more');
        div.appendChild(more);

        const moreOptions = document.createElement('div');
        moreOptions.classList.add('more-options');
        more.appendChild(moreOptions);

        const editBtn = document.createElement('button');
        moreOptions.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        moreOptions.appendChild(deleteBtn);

        div.setAttribute('data-id', project.id);

        this.elements.sidebarProjects.insertBefore(div, this.elements.projectForm);
    }
//Fix this, ID conflixts for each new todo, use classes instead and refactor
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
        buttonDiv.classList.add('todo-buttons');
        div.appendChild(buttonDiv);

        const importantBtn = document.createElement('button');
        importantBtn.id = 'todoImportant';
        buttonDiv.appendChild(importantBtn);

        const completeBtn = document.createElement('button');
        completeBtn.id = 'complete';
        buttonDiv.appendChild(completeBtn);

        const todoMore = document.createElement('div');
        todoMore.id = 'todoMore';
        todoMore.classList.add('more');
        buttonDiv.appendChild(todoMore);

        const moreOptions = document.createElement('div');
        moreOptions.id = 'moreOptionsTodo';
        moreOptions.classList.add('more-options');
        todoMore.appendChild(moreOptions);

        const editTodoBtn = document.createElement('button');
        editTodoBtn.id = 'editTodoBtn';
        moreOptions.appendChild(editTodoBtn);

        const deleteTodo = document.createElement('button');
        deleteTodo.id = 'deleteTodoBtn';
        moreOptions.appendChild(deleteTodo);

        div.setAttribute('data-id', todo.id);

        this.targetProjectForTodo(projectID, div);
    }

    targetProjectForTodo (projectID, div) {
        const projectContainer = document.querySelector(`.project-container[data-id='${projectID}']`);
        if (projectContainer) {
            const todoBox = projectContainer.querySelector('.todos-box');
            todoBox.appendChild(div);
        }
    }
//Form Handling
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

    cancelProjectForm () {
        this.elements.cancelProject.addEventListener('click', () => {
            this.elements.projectForm.reset();
            this.elements.projectForm.style.display = 'none';
        });
    }

    cancelTodoForm () {
        this.elements.cancelTodo.addEventListener('click', () => {
            this.elements.todoForm.reset();
            this.elements.todoForm.style.display = 'none';
        });
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
//Event Handlers
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
                    case 'navImportant':
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
            
                    switch (buttonID) {
                        case 'todoImportant':
                            markTaskProperty(todoID, 'important');
                            break
                        case 'complete':
                            markTaskProperty(todoID, 'complete');
                            break
                        case 'todoMore':
                            this.showHideOptionsTodo();
                            break
                        default:
                            break
                    }
                }
            }
        });
    }

    showProject () {
        this.elements.sidebarNav.addEventListener('click', this.handleShowProject);
    }

    handleShowProject = (event) => {
        const navProject = event.target.closest('.new-project');

        if (navProject) {
            const navProjectID = navProject?.getAttribute('data-id');
            const projectContainer = document.querySelector(`.project-container[data-id='${navProjectID}']`);

            if (navProjectID) {
                projectContainer.style.display = 'block';
                this.markTaskAsRendered(navProjectID);
            }
        }
    }

    removeProject () {
        this.elements.mainContent.addEventListener('click', this.handleRemoveProject);
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
        this.elements.sidebarNav.addEventListener('click', this.handleDeleteProject);
    }

    handleDeleteProject = (event) => {
        const deleteBtn = event.target.closest('#deleteProjectBtn');

        if (deleteBtn) {
            const navProject = deleteBtn.closest('.new-project');
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

    deleteTodo () {
        this.elements.todoBox.addEventListener('click', this.handleDeleteTodo);
    }

    handleDeleteTodo = (event) => {
        const removeTodo = event.target.closest('#deleteTodoBtn');

        if (removeTodo) {
            const todoContainer = removeTodo.closest('.todo');
            const todoContainerID = todoContainer?.getAttribute('data-id');

            const businessTodo = this.tasklist.tasks.find(todo => todo.id === todoContainerID);

            if (businessTodo) {
                this.removeRenderedTask(todoContainerID)
                todoContainer.remove();
                this.tasklist.removeTask(todoContainerID);
            }
        }
    }
//UI Manipulations
    showHideOptionsTodo () {
        this.elements.todoMore.addEventListener('click', (event) => {
            const moreOptions = event.target.closest('#moreOptionsTodo');
            if (!moreOptions) return;
            //forgot why I added this, keeping it until I remember
            const todo = event.target.closest('.todo');

            if (moreOptions.style.display === 'none') {
                moreOptions.style.display = 'block';
            } else {
                moreOptions.style.display = 'none';
            }
            // this.elements.moreOptionsTodo.style.display = 'block';
        });
    }

    showHideOptionsProject () {
        this.elements.projectMore.addEventListener('click', (event) => {
            const moreOptions = event.target.closest('#moreOptionsProject');
            if (!moreOptions) return;

            if (moreOptions.style.display === 'none') {
                moreOptions.style.display = 'block';
            } else {
                moreOptions.style.display = 'none';
            }
            // this.elements.moreOptionsProject.style.display = 'block';
        });
    }

    updateTodoDOM () {
        const todo = this.editTodo;
        //keep an eye out, might have to set, instead of get ID
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

    updateProjectDOM () {
        const project = this.editProject;
        //keep an eye out, might have to set, instead of get ID
        const projectID = project?.getAttribute('data-id');

        if (projectID) {
            const title   = this.elements.projectTitle.value.trim();
            const details = this.elements.projectDetails.value.trim();
            const prioID  = this.getPriorityID();

            project.querySelector('h4').textContent = title;
            project.querySelector('p').textContent = details;

            if (prioID === 'contemplativePrio') {
                this.projectImage = //img here
            } else if (prioID === 'pragmaticPrio') {
                this.projectImage = //img here
            } else if (prioID === 'imperativePrio') {
                this.projectImage = //img here
            }
        }
    }

    editTodoValues () {
        this.editTodoButton.addEventListener('click', (event) => {
            const edit = event.target.closest('#editTodoBtn');
            if (edit) {
                const todoElement = event.target.closest('.todo');

                if (todoElement) {
                    const todoID = todoElement.getAttribute('data-id');
                    const todo = this.tasklist.tasks.find(task => task.id === todoID);

                    this.todoTitle.value   = todo.title;
                    this.todoDetails.value = todo.details;
                    this.todoDate.value    = todo.date;
                    this.editTodo = todo;
                    this.elements.todoMore.style.display = 'none';
                    this.renderTodoForm();
                }
            }
        });
    }

    editProjectValues () {
        this.editProjectBtn.addEventListener('click', (event) => {
            const edit = event.target.closest('#editProjectBtn');
            if (edit) {
                const projectElement = event.target.closest('.new-project');

                if (projectElement) {
                    const projectID = projectElement.getAttribute('data-id');
                    const project = this.tasklist.tasks.find(task => task.id === projectID);

                    this.projectTitle.value = project.title
                    this.projectDetails.value = project.details
                    
                    const prioID = this.getPriorityID();
                    if (prioID === 'contemplativePrio') {
                        this.contemplativePrio.checked = true;
                    } else if (prioID === 'pragmaticPrio') {
                        this.pragmaticPrio.checked = true;
                    } else if (prioID === 'imperativePrio') {
                        this.imperativePrio.checked = true;
                    }

                    this.editProject = project;
                    this.elements.projectMore.style.display = 'none';
                    this.renderProjectForm();
                }
            }
        })
    }

    getPriorityID () {
        for (let radio of this.projectPrio) {
            if (radio.checked) {
                return radio.id;
            }
        }
        return  null;
    }
}