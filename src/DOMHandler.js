import { container } from "webpack";
import { Project } from "./projects";
import { Todo } from "./todos.js";
import { id } from "date-fns/locale";

class DOMElements {
    constructor () {
        this.sidebarNav        = document.querySelector('.sidebar');
        this.sidebarProjects   = document.querySelector('.sidebar-projects');
        this.mainContent       = document.querySelector('.main-content');        
        this.projectForm       = document.querySelector('.project-form');
        this.projectTitle      = document.getElementById('projectTitle');
        this.projectDetails    = document.getElementById('projectDetails');
        this.projectPrio       = document.querySelectorAll('input[name="priority"]');
        this.contemplativePrio = document.getElementById('contemplativePrio');
        this.pragmaticPrio     = document.getElementById('pragmaticPrio');
        this.imperativePrio    = document.getElementById('imperativePrio');
        this.submitProject     = document.getElementById('submitProject');
        this.cancelProject     = document.getElementById('cancelProject');
        this.addProject        = document.getElementById('addProject');        
        this.todoForm          = document.querySelector('.todo-form');
        this.todoTitle         = document.getElementById('todoTitle');
        this.todoDetails       = document.getElementById('todoDetails');
        this.todoDate          = document.getElementById('todoDate');
        this.submitTodo        = document.getElementById('submitTodo');
        this.cancelTodo        = document.getElementById('cancelTodo');
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
        this.deleteProject();
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
                if (!this.checkRenderedTask(project.id)) {
                    this.createProjectForMain(project);
                    this.createProjectForNav(project);
                    this.markTaskAsRendered(project.id);
                }
            }
        })
    }

    renderTodo () {
        this.tasklist.tasks.forEach(todo => {
            if (getTaskType(task) === 'todo') {
                if (!this.checkRenderedTask(todo.id)) {
                    this.createTodo(todo, todo.projectID);
                    this.markTaskAsRendered(todo.id);
                }
            }
        })
    }

    createProjectForMain (project) {
        const div = this.createNewElement('div', 'project-container');

        const box = this.createNewElement('div', 'todos-box');
        div.appendChild(box);

        const addTodoDiv = this.createNewElement('div', 'add-todo');
        div.appendChild(addTodoDiv);

        const addTodoBtn = this.createNewElement('button', '');
        addTodoBtn.textContent = 'Add Todo';
        addTodoDiv.appendChild(addTodoBtn);

        div.setAttribute('data-id', project.id);
        
        this.elements.mainContent.appendChild(div);
    }

    createProjectForNav (project) {
        const div = this.createNewElement('div', 'project-item');

        const projectImg = this.createNewElement('img', 'project-img');
        div.appendChild(projectImg);

        const title = this.createNewElement('h4', '');
        title.textContent = project.title;
        div.appendChild(title);

        const details = this.createNewElement('div', 'nav-project-details');
        div.appendChild(details);

        const detailsText = this.createNewElement('p', '');
        detailsText.textContent = project.details;
        details.appendChild(detailsText);

        const more = this.createNewElement('div', 'project-more');
        div.appendChild(more);

        const moreOptions = this.createNewElement('div', 'more-options-project');
        more.appendChild(moreOptions);

        const editBtn = this.createNewElement('button', 'edit-project-btn');
        editBtn.textContent = 'Edit';
        moreOptions.appendChild(editBtn);

        const deleteBtn = this.createNewElement('button', 'delete-project-btn');
        deleteBtn.textContent = 'Delete';
        moreOptions.appendChild(deleteBtn);

        div.setAttribute('data-id', project.id);

        this.elements.sidebarProjects.appendChild(div);
    }

    createTodo (todo, projectID) {
        const div = this.createNewElement('div', 'todo');

        const h4 = this.createNewElement('h4', '');
        h4.textContent = todo.title;
        div.appendChild(h4);

        const p = this.createNewElement('p', '');
        p.textContent = todo.details;
        div.appendChild(p);

        const buttonDiv = this.createNewElement('div', 'todo-buttons');
        div.appendChild(buttonDiv);
// need to add logic for background colour on img
        const importantBtn = this.createNewElement('div', 'todo-important');
        buttonDiv.appendChild(importantBtn);
// need to add logic for strikethrough and fill on img
        const completeBtn = this.createNewElement('div', 'todo-completed');
        buttonDiv.appendChild(completeBtn);

        const todoMore = this.createNewElement('div', 'todo-more');
        buttonDiv.appendChild(todoMore);

        const moreOptions = this.createNewElement('div', 'more-options-todo');
        todoMore.appendChild(moreOptions);

        const editTodoBtn = this.createNewElement('button', 'edit-todo-btn');
        editTodoBtn.textContent = 'Edit';
        moreOptions.appendChild(editTodoBtn);

        const deleteTodo = this.createNewElement('button', 'delete-todo-btn');
        deleteTodo.textContent = 'Delete';
        moreOptions.appendChild(deleteTodo);

        div.setAttribute('data-id', todo.id);

        this.targetProjectForTodo(projectID, div);
    }

    createNewElement(element, elementClass) {
        const newElement = document.createElement(element);
        newElement.classList.add(elementClass);
        return newElement;
    }

    targetProjectForTodo (projectID, div) {
        const mainContent = this.elements.mainContent;
        const projectContainer = mainContent.querySelector(`.project-container[data-id='${projectID}']`);
        const todoBox = projectContainer.querySelector('.todos-box');
        if (projectContainer) {
            todoBox.appendChild(div);
        }
    }
//Form Handling
    renderProjectForm () {
        const projectForm = this.elements.projectForm;
        if (projectForm && projectForm.style.display === 'none') {
            projectForm.classList.remove('hidden');
        }
    }

    renderTodoForm (event) {
        const projectContainer = event.target.closest('.project-container');
        const mainContent = this.elements.mainContent;

        if (projectContainer) {
            const todoForm = this.elements.todoForm;
            const addTodo = projectContainer.querySelector('.add-todo');

            const existingForm = mainContent.querySelector('.todo-form:not(.hidden)');
            if (existingForm) {
                existingForm.classList.add('hidden');
                existingForm.parentNode?.removeChild(existingForm);
                todoForm.reset();
            }
            projectContainer.insertBefore(todoForm, addTodo)
            todoForm.classList.remove('hidden');
        }
    }

    submitProjectForm (event) {
        event.preventDefault();

        if (this.editProject) {
            this.submitEditedProjectForm();
        } else {
            const newProject = this.getProjectValues();
            this.tasklist.addTask(newProject);
            this.renderProject()
        }
        this.elements.projectForm.reset();
        this.elements.projectForm.classList.add('hidden');
    }

    submitEditedProjectForm () {
        const projectID = this.editProject.id;
        const existingProject = this.tasklist.tasks.find(project => project.id === projectID);

        if (existingProject) {
            const newTitle    = this.elements.projectTitle.value.trim();
            const newDetails  = this.elements.projectDetails.value.trim();
            const newPriority = Array.from(this.elements.projectPrio).find(prio => prio.checked)?.value || '';

            this.tasklist.updateTask(projectID, newTitle, newDetails, newPriority);
            this.updateProjectDOM();
            this.editProject = null;
        }
    }

    submitTodoForm (event) {
        event.preventDefault();

        if (this.editTodo) {
            this.submitEditedTodoForm();
        } else {
            const newTodo = this.getTodoValues();
            this.tasklist.addTask(newTodo);
            this.renderTodo();
        }
        this.elements.todoForm.reset();
        this.elements.todoForm.classList.add('hidden');
    }

    submitEditedTodoForm () {
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
    }

    cancelProjectForm () {
        const projectForm = this.elements.projectForm;
        projectForm.reset();
        projectForm.classList.add('hidden');
    }

    cancelTodoForm () {
        const todoForm = this.elements.todoForm;
        todoForm.reset();
        todoForm.classList.add('hidden');
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
        const sidebarNav = this.elements.sidebarNav;
        sidebarNav.addEventListener('click', (event) => {
            const sidebarBtn = event.target.closest('button');
            
            if (sidebarBtn) {
                const BtnID = sidebarBtn.id;

                switch (BtnID) {
                    case 'allTasks':
                        this.tasklist.getAllTasks();
                        break;
                    case 'today':
                        this.tasklist.getTasksDueToday();
                        break;
                    case 'next7Days':
                        this.tasklist.getTasksForNextSevenDays();
                        break;
                    case 'navImportant':
                        this.tasklist.getAllImportantTasks();
                        break;
                    case 'addProject':
                        this.renderProjectForm();
                        break;
                    default:
                        break;
                }
            }
            const projectDiv = event.target.closest('.project-item');
            if (projectDiv) {
                const projectID = projectDiv.getAttribute('data-id');
                this.showProject(event, projectID);
            }
        });
    }

    bindProjectButtons () {
        const sidebarProjects = this.elements.sidebarProjects;
        sidebarProjects.addEventListener('click', (event) => {
            const projectMore = event.target.closest('.project-more');
            if (projectMore) {
                this.toggleVisibilityForClass(projectMore);
            }

            const deleteBtn = event.target.closest('.delete-project-btn');
            const editBtn = event.target.closest('.edit-project-btn');
            if (deleteBtn) {
                this.deleteProject(event);
            } else if (editBtn) {
                this.editProjectValues(event);
            }
        })
    }

    bindMainContentButtons () {
        const mainContent = this.elements.mainContent;
        mainContent.addEventListener('click', (event) => {
            const addTodo = event.target.closest('.add-todo');
            const exit = event.target.closest('.project-exit');
            
            if (addTodo) {
                this.renderTodoForm(event)
            } else if (exit) {
                this.removeProject(event);
            }

            this.handleTodoButtonClicks(event);
        });
    }

    bindProjectFormButtons () {
        const submitProject = this.elements.submitProject;
        const cancelProject = this.elements.cancelProject;

        submitProject.addEventListener('click', (event) => this.submitProjectForm(event));
        cancelProject.addEventListener('click', () => this.cancelProjectForm());
    }

    bindTodoFormButtons () {
        const submitTodo = this.elements.submitTodo;
        const cancelTodo = this.elements.cancelTodo;

        submitTodo.addEventListener('click', (event) => this.submitTodoForm(event));
        cancelTodo.addEventListener('click', () => this.cancelTodoForm());
    }

    handleTodoButtonClicks (event) {
        const button = event.target.closest('.todo-buttons');
        if (button) {
            const todoElement = event.target.closest('.todo');
        
            if (todoElement) {
                const todoID = todoElement.getAttribute('data-id');

                if (button.classList.contains('todo-important')) {
                    markTaskProperty(todoID, 'important');
                } else if (button.classList.contains('todo-completed')) {
                    markTaskProperty(todoID, 'complete');
                } else if (button.classList.contains('todo-more')) {
                    this.toggleVisibilityForClass('.todo-more');
                }

                const deleteBtn = event.target.closest('.delete-project-btn');
                const editBtn = event.target.closest('.edit-project-btn');

                if (deleteBtn) {
                    this.deleteTodo(event);
                } else if (editBtn) {
                    this.editTodoValues(event);
                }
            }
        }
    }

    showProject = (event, projectID) => {
        const mainContent = this.elements.mainContent;
        const projectContainer = mainContent.querySelector(`.project-container[data-id='${projectID}']`);

        if (projectID) {
            projectContainer.style.display = 'block';
            this.markTaskAsRendered(projectID);
        }
    }

    removeProject = (event) => {
        const exitButton = event.target.closest('.project-exit');
        if (!exitButton) return;
        
        const projectContainer = exitButton.closest('.project-container');
        if (projectContainer) {
            const projectContainerID = projectContainer?.getAttribute('data-id');
            projectContainer.classList.add('hidden');
            this.removeRenderedTask(projectContainerID);
        }
    }

    deleteProject = (event) => {
        const mainContent = this.elements.mainContent;
        const sidebar = this.elements.sidebarProjects
        const navProject = event.closest('.project-item');
        if (!navProject) return;

        const navProjectID = navProject?.getAttribute('data-id');
        if (navProjectID) {
            const projectContainer = mainContent.querySelector(`.project-container[data-id='${navProjectID}']`);
            const projectNavContainer = sidebar.querySelector(`.project-item[data-id='${navProjectID}']`);

            if (projectContainer) {
                projectContainer.remove();
            }

            if (projectNavContainer) {
                projectNavContainer.remove();
            }
            this.removeRenderedTask(navProjectID);
            this.tasklist.removeTask(navProjectID);
        }
    }

    deleteTodo = (event) => {
        const todoContainer = event.closest('.todo');
        const todoContainerID = todoContainer?.getAttribute('data-id');

        const businessTodo = this.tasklist.tasks.find(todo => todo.id === todoContainerID);

        if (businessTodo) {
            this.removeRenderedTask(todoContainerID)
            todoContainer.remove();
            this.tasklist.removeTask(todoContainerID);
        }
    }
//UI Manipulations
    toggleVisibilityForClass (elementClass) {
        const element = document.querySelector(`.${elementClass}`);
        if (!element) {
            return;
        } else if (element) {
            element.classList.toggle('hidden');
        }
    }

    updateTodoDOM () {
        const mainContent = this.elements.mainContent;
        const todo = this.editTodo;
        const todoID = todo?.getAttribute('data-id');
        
        if (todoID) {
            const title   = this.elements.todoTitle.value.trim();
            const details = this.elements.todoDetails.value.trim();
            const date    = this.elements.todoDate.value.trim();

            const todoElement = mainContent.querySelector(`.todo[data-id='${todoID}']`);
            if (todoElement) {
                todoElement.querySelector('h4').textContent = title;
                todoElement.querySelector('p').textContent = details;
            }
            
            const dateElement = todo.querySelector('.todo-date'); 
            if (dateElement) {
                dateElement.textContent = date;
            }
        }
    }

    updateProjectDOM () {
        const sidebar = this.elements.sidebarProjects;
        const project = this.editProject;
        const projectID = project?.getAttribute('data-id');

        if (projectID) {
            const title   = this.elements.projectTitle.value.trim();
            const details = this.elements.projectDetails.value.trim();
            const prioID  = this.getPriorityID();

            const projectElement = sidebar.querySelector(`.project[data-id='${projectID}']`);
            if (projectElement) {
                projectElement.querySelector('h4').textContent = title;
                projectElement.querySelector('p').textContent = details;

                const projectImg = projectElement.querySelector('.project-img');
                projectImg.src = this.getProjectImageSrc(prioID);
            }
        }
    }

    getProjectImageSrc (prioID) {
        const imageSources = {
            contemplativePrio: '//img here',
            pragmaticPrio: '//img here',
            imperativePrio: '//img here'
        };
        return imageSources[prioID];
    }

    editTodoValues (event) {
        const todoElement = event.target.closest('.todo');
        const todoID = todoElement.getAttribute('data-id');
        const todo = this.tasklist.tasks.find(task => task.id === todoID);

        this.todoTitle.value   = todo.title;
        this.todoDetails.value = todo.details;
        this.todoDate.value    = todo.date;
        this.editTodo = todo;

        const todoMore = todoElement.querySelector('.todo-more');
        todoMore.classList.add('hidden');
        this.renderTodoForm(event);
    }

    editProjectValues (event) {
        const sidebar = this.elements.sidebarNav;
        const projectElement = event.closest('.project-item');
        const projectID = projectElement.getAttribute('data-id');
        const project = this.tasklist.tasks.find(task => task.id === projectID);

        this.projectTitle.value = project.title
        this.projectDetails.value = project.details
        
        const prioID = this.getPriorityID();
        if (prioID) {
            sidebar.getElementById(prioID).checked = true;
        }

        this.editProject = project;
        const projectMore = projectElement.querySelector('.project-more');
        projectMore.classList.add('hidden');
        this.renderProjectForm(event);
    }

    getPriorityID () {
        const prioID = Array.from(this.projectPrio).find(radio => radio.checked);
        return prioID ? prioID.id : null;
    }
}