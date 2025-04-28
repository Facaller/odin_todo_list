import { Project } from "./projects";
import { Todo } from "./todos.js";

export class DOMElements {
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

        this.submitProject.disabled = true;
        this.submitTodo.disabled    = true;
    }
}

export class DOMImages {
    constructor () {
        this.contemplative      = require('./assets/images/sculpture.png');
        this.pragmatic          = require('./assets/images/hard-work.png');
        this.imperative         = require('./assets/images/whip.png');
        this.moreOptions        = require('./assets/images/more.png');
        this.importantUnchecked = require('./assets/images/star-unchecked.png');
        this.importantChecked   = require ('./assets/images/star-checked.png')
    }
}

export class DOMHandler {
    constructor (tasklist) {
        this.tasklist      = tasklist;
        this.elements      = new DOMElements();
        this.images        = new DOMImages();
        this.renderedTasks = [];
        this.editTodo      = null;
        this.editProject   = null;

        this.bindMainContentButtons();
        this.bindProjectButtons();
        this.bindProjectFormButtons();
        this.bindSidebarButtons();
        this.bindTodoFormButtons();

        // this.removeProject();
        // this.deleteProject();
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
//issue is somehwere here
    removeAllRenderedTodos () {
        const todos = this.tasklist.getTasksByType('todo');
        const mainContent = this.elements.mainContent;
        todos.forEach(todo => {
            const todoID = todo.id;
            if (this.checkRenderedTask(todoID)) {
                const todoDOM = mainContent.querySelector(`.todo[data-id='${todoID}']`);
                if (todoDOM) {
                    todoDOM.remove();
                }
                this.removeRenderedTask(todoID);
            }
        });
    }
//Task Management
    renderProject (project) {
                if (!this.checkRenderedTask(project.id)) {
                    this.createProjectForMain(project);
                    this.createProjectForNav(project);
                    this.markTaskAsRendered(project.id);
                }
    }

    renderTodo (todo) {
        if (!this.checkRenderedTask(todo.id)) {
            this.createTodo(todo, todo.projectID);
            this.markTaskAsRendered(todo.id);
        }
    }

    // ******old render methods*****
    // renderProject () {
    //     this.tasklist.tasks.forEach(project => {
    //         if (this.tasklist.getTaskType('project') === 'project') { 
    //             if (!this.checkRenderedTask(project.id)) {
    //                 this.createProjectForMain(project);
    //                 this.createProjectForNav(project);
    //                 this.markTaskAsRendered(project.id);
    //             }
    //         }
    //     });
    // }

    // renderTodo () {
    //     this.tasklist.tasks.forEach(todo => {
    //         if (this.tasklist.getTaskType('todo') === 'todo') {
    //             if (!this.checkRenderedTask(todo.id)) {
    //                 this.createTodo(todo, todo.projectID);
    //                 this.markTaskAsRendered(todo.id);
    //             }
    //         }
    //     });
    // }

    renderSpecificTodos (todos) {
        todos.forEach(todo => {
            if (!this.checkRenderedTask(todo.id)) {
                this.createTodo(todo, todo.projectID);
                this.markTaskAsRendered(todo.id);
            }
        });
    }

    createProjectForMain (project) {
        const div = this.createNewElement('div', 'project-container');

        const titleContainer = this.createNewElement('div', 'project-container-title');
        div.appendChild(titleContainer);

        const title = this.createNewElement('h4', '');
        title.textContent = project.title;
        titleContainer.appendChild(title);

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
        projectImg.src = this.getProjectImageSrc(this.getPriorityID());
        div.appendChild(projectImg);

        const title = this.createNewElement('h4', '');
        title.textContent = project.title;
        div.appendChild(title);

        const details = this.createNewElement('div', 'nav-project-details');
        div.appendChild(details);

        const detailsText = this.createNewElement('p', '');
        detailsText.textContent = project.details;
        details.appendChild(detailsText);

        const projectMore = this.createNewElement('div', 'project-more');
        const moreImg = this.createNewElement('img', 'more-img');
        moreImg.src = this.images.moreOptions;
        projectMore.appendChild(moreImg);
        div.appendChild(projectMore);

        const moreOptions = this.createNewElement('div', 'more-options-project');
        this.addClass(moreOptions, 'hidden');
        projectMore.appendChild(moreOptions);

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

        const todoDate = this.createNewElement('p', 'todo-item-date');
        todoDate.textContent = todo.formattedDate;
        buttonDiv.appendChild(todoDate);

        const importantBtn = this.createNewElement('div', 'todo-important');
        const importantImg = this.createNewElement('img', 'todo-important-img');
        importantImg.src = this.images.importantUnchecked;
        importantBtn.appendChild(importantImg);
        buttonDiv.appendChild(importantBtn);

        const completeBtn = this.createNewElement('div', 'todo-completed');
        buttonDiv.appendChild(completeBtn);

        const todoMore = this.createNewElement('div', 'todo-more');
        const moreImg = this.createNewElement('img', 'more-img');
        moreImg.src = this.images.moreOptions;
        todoMore.appendChild(moreImg);
        buttonDiv.appendChild(todoMore);

        const moreOptions = this.createNewElement('div', 'more-options-todo');
        this.addClass(moreOptions, 'hidden');
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
        if (elementClass) {
            newElement.classList.add(elementClass);
        }
        return newElement;
    }

    addClass(selector, newClass, newClassTwo = null) {
        if (selector && newClass) {
            selector.classList.add(newClass);
            selector.classList.add(newClassTwo);
        } else {
            throw new Error;
        }
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
    isFormValid (title, details, isProjectForm) {
        const titleValid    = title && title.value.trim() !== '';
        const detailsValid  = details && details.value.trim() !== '';
        const specificValid = this.isPrioOrDateValid(isProjectForm);

        return titleValid && detailsValid && specificValid;
    }

    isPrioOrDateValid (isProjectForm) {
        if (isProjectForm) {
            const priority = this.elements.projectPrio;
            const priorityValid = Array.from(priority).some(input => input.checked);
            return priorityValid;
        } else {
            const date = this.elements.todoDate;
            const dateValid = date && date.value.trim() !== '';
            return dateValid;
        }
    }

    renderProjectForm = () => {
        const projectForm = this.elements.projectForm;
        if (projectForm && projectForm.classList.contains('hidden')) {
            projectForm.classList.toggle('hidden');
        }
    }

    renderTodoForm (event) {
        const projectContainer = event.target.closest('.project-container');
        const mainContent = this.elements.mainContent;

        if (projectContainer) {
            const todoForm = this.elements.todoForm;
            const form = todoForm.querySelector('form');
            const addTodo = projectContainer.querySelector('.add-todo');

            const existingForm = mainContent.querySelector('.todo-form:not(.hidden)');
            if (existingForm) {
                existingForm.classList.toggle('hidden');
                existingForm.parentNode?.removeChild(existingForm);
                form.reset();
            }
            projectContainer.insertBefore(todoForm, addTodo)
            todoForm.classList.toggle('hidden');
        }
    }

    submitProjectForm (event) {
        event.preventDefault();
        const projectForm = this.elements.projectForm;
        const form = projectForm.querySelector('form');
        const title = this.elements.projectTitle;
        const details = this.elements.projectDetails;
        const isProjectForm = true;

        if (this.isFormValid(title, details, isProjectForm)) {
            if (this.editProject) {
                this.submitEditedProjectForm();
            } else {
                const newProject = this.getProjectValues();
                this.tasklist.addTask(newProject);
                this.renderProject(newProject);
            }
        form.reset();
        projectForm.classList.toggle('hidden');
        }
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
        const todoForm = this.elements.todoForm;
        const form = todoForm.querySelector('form');
        const title = this.elements.todoTitle;
        const details = this.elements.todoDetails;
        const isProjectForm = false;

        if (this.isFormValid(title, details, isProjectForm)) {
            if (this.editTodo) {
                this.submitEditedTodoForm();
            } else {
                const newTodo = this.getTodoValues(event);
                this.tasklist.addTask(newTodo);
                this.renderTodo(newTodo);
            }
        }
        form.reset();
        this.elements.todoForm.classList.toggle('hidden');
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
        const form = projectForm.querySelector('form');

        if (form) {            
            form.reset();
            this.elements.cancelProject.focus();
        }

        if (this.editProject) {
            this.editProject = null;
        }
        projectForm.classList.toggle('hidden');
    }

    cancelTodoForm () {
        const todoForm = this.elements.todoForm;
        const form = todoForm.querySelector('form');
        console.log('Todo cancel works')
        if (form) {
            form.reset();
            this.elements.cancelTodo.focus();
        }

        if (this.editTodo) {
            this.editTodo = null;
        }
        todoForm.classList.toggle('hidden');
    }

    getProjectValues () {
        const newTitle    = this.elements.projectTitle.value.trim();
        const newDetails  = this.elements.projectDetails.value.trim();
        const newPriority = Array.from(this.elements.projectPrio)
        .find(prio => prio.checked)?.value || '';

        const newProject =  new Project(newTitle, newDetails, newPriority);

        return newProject;
    }

    getTodoValues (event) {
        const newTitle   = this.elements.todoTitle.value.trim();
        const newDetails = this.elements.todoDetails.value.trim();
        const newDate    = this.elements.todoDate.value.trim();

        const project    = event.target.closest('.project-container');
        const projectID  = project.getAttribute('data-id');

        const newTodo = new Todo(newTitle, newDetails, newDate, projectID, this.tasklist)

        return newTodo;
    }
//Event Handlers
    bindSidebarButtons = () => {
        const sidebarNav = this.elements.sidebarNav;
        sidebarNav.addEventListener('click', (event) => {
            const sidebarBtn = event.target.closest('button');
            
            if (sidebarBtn && sidebarBtn.closest('.sidebar')) {
                const btnID = sidebarBtn.id;

                switch (btnID) {
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
                        this.newFilterImportantTodos();
                        break;
                    case 'addProject':
                        this.renderProjectForm();
                        break;
                    default:
                        break;
                }
            }
            // const projectDiv = event.target.closest('.project-item');
            // if (projectDiv) {
            //     const projectID = projectDiv.getAttribute('data-id');
            //     this.showProject(event, projectID);
            // }
        });
    }

    bindProjectButtons = () => {
        const sidebarProjects = this.elements.sidebarProjects;
        sidebarProjects.addEventListener('click', (event) => {
            const projectMore = event.target.closest('.project-more');
            if (projectMore) {
                this.toggleVisibilityForClass(event, 'project-item', 'more-options-project');
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

    bindMainContentButtons = () => {
        const mainContent = this.elements.mainContent;
        mainContent.addEventListener('click', (event) => {
            const projectContainer = event.target.closest('.project-container');
            if (!projectContainer) return; 
            
            const addTodo = event.target.closest('.add-todo');
            const exit = event.target.closest('.project-exit');
            
            if (addTodo) {
                if (this.editTodo) {
                    this.editTodo = null;
                }
                this.renderTodoForm(event)
            } else if (exit) {
                this.removeProject(event);
            }
            this.handleTodoButtonClicks(event);
        });
    }
    //add check for other prio field, use delegation for clicks
    bindProjectFormButtons = () => {
        const projectForm   = this.elements.projectForm.querySelector('form');
        const titleField    = this.elements.projectTitle;
        const detailsField  = this.elements.projectDetails;

        projectForm.addEventListener('input', () => {
            const isProjectForm = true;
            this.elements.submitProject.disabled = !this.isFormValid(titleField, detailsField, isProjectForm);
        });

        projectForm.addEventListener('click', (event) => {
            const formBtn = event.target.closest('button');
            if (formBtn) {
                const btnID = formBtn.id
                if (btnID === 'submitProject') {
                    this.submitProjectForm(event);
                } else if (btnID === 'cancelProject') {
                    this.cancelProjectForm();
                }
            }
        });
    }

    bindTodoFormButtons = () => {
        const todoForm     = this.elements.todoForm.querySelector('form');
        const titleField   = this.elements.todoTitle;
        const detailsField = this.elements.todoDetails;

        todoForm.addEventListener('input', () => {
            const isProjectForm = false;
            this.elements.submitTodo.disabled = !this.isFormValid(titleField, detailsField, isProjectForm);
        });

        todoForm.addEventListener('click', (event) => {
            const formBtn = event.target.closest('button');
            if (formBtn) {
                const btnID = formBtn.id;
                if (btnID === 'submitTodo') {
                    this.submitTodoForm(event)
                } else if (btnID === 'cancelTodo') {
                    this.cancelTodoForm()
                }
            }
        });
    }

    handleTodoButtonClicks = (event) => {
        const todoElement = event.target.closest('.todo');
        if (todoElement) {
            const todoID = todoElement.getAttribute('data-id');

            if (event.target.closest('.todo-important')) {
                this.toggleImportant(event);
            } else if (event.target.closest('.todo-completed')) {
                this.toggleComplete(event);
            } else if (event.target.closest('.todo-more')) {
                this.toggleVisibilityForClass(event, 'todo', 'more-options-todo');
            }

            const deleteBtn = event.target.closest('.delete-todo-btn');
            const editBtn = event.target.closest('.edit-todo-btn');

            if (deleteBtn) {
                console.log('todo delete success')
                this.deleteTodo(event);
            } else if (editBtn) {
                console.log('todo edit success')
                this.editTodoValues(event);
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
        const sidebar = this.elements.sidebarProjects;
        const navProject = event.target.closest('.project-item');
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
            this.deleteTodosInProject(navProjectID);
            this.removeRenderedTask(navProjectID);
            this.tasklist.removeTask(navProjectID);
        }
    }

    deleteTodosInProject = (projectID) => {
        const todos = this.tasklist.getTodosByProject(projectID);
        todos.forEach(todo => {
            this.removeRenderedTask(todo.id);
            const mainContent = this.elements.mainContent;
            const todoDOM = mainContent.querySelector(`.todo[data-id='${todo.id}']`);
            if (todoDOM) {
                todoDOM.remove();
            }
            this.tasklist.removeTask(todo.id);
        })
    }

    deleteTodo = (event) => {
        const todoContainer = event.target.closest('.todo');
        const todoContainerID = todoContainer?.getAttribute('data-id');

        const businessTodo = this.tasklist.tasks.find(todo => todo.id === todoContainerID);

        if (businessTodo) {
            this.removeRenderedTask(todoContainerID)
            todoContainer.remove();
            this.tasklist.removeTask(todoContainerID);
        }
    }
//UI Manipulations
    toggleVisibilityForClass (event, parentClass, targetClass, addSpecificityClass = null) {
        const parentElement = event.target.closest(`.${parentClass}`);
        const targetElement = parentElement.querySelector(`.${targetClass}`);
        
        if (!targetElement) {
            console.log(targetElement, 'does not exist')
            return;
        }
        targetElement.classList.toggle('show');
    }

    toggleImportant (event) {
        const todoElement = event.target.closest('.todo');
        const todoID = todoElement.getAttribute('data-id');
        const todo = this.tasklist.tasks.find(task => task.id === todoID);
        const importantImg = todoElement.querySelector('.todo-important-img');

        if (!todo) {
            return;
        } else if (todo.isImportant === false) {
            this.tasklist.markTaskProperty(todoID, 'important');
            importantImg.src = this.images.importantChecked;
        } else if (todo.isImportant == true) {
            this.tasklist.unmarkTaskProperty(todoID, 'important');
            importantImg.src =this.images.importantUnchecked;
        }
    }

    newFilterImportantTodos () {
        const todos = this.tasklist.getTasksByType('todo');
        const mainContent = this.elements.mainContent;
        
        todos.forEach(todo => {
            const todoID = todo.id;
            const todoElement = mainContent.querySelector(`.todo[data-id='${todoID}']`)
            
            if (this.checkRenderedTask(todoID)) {
                if (todo.isImportant !== true) {
                    todoElement.classList.add('hidden');
                };
            }
        })
    }

    filterImportantTodos = () => {
        const importantTodos = this.tasklist.getAllImportantTasks();
        this.removeAllRenderedTodos();
        this.renderSpecificTodos(importantTodos);
    }

    toggleComplete (event) {
        const todoElement = event.target.closest('.todo');
        const todoID = todoElement.getAttribute('data-id');
        const todo = this.tasklist.tasks.find(task => task.id === todoID);
        const todoComplete = todoElement.querySelector('.todo-completed');
        
        const h4 = todoElement.querySelector('h4');
        const p = todoElement.querySelector('p');

        if (!todo) {    
            return;
        } else if (todo.isComplete === false) {
            this.tasklist.markTaskProperty(todoID, 'complete');
            todoComplete.classList.toggle('todo-completed-full');
            h4.classList.toggle('strike-through');
            p.classList.toggle('strike-through');
        } else if (todo.isComplete === true) {
            this.tasklist.unmarkTaskProperty(todoID, 'complete');
            todoComplete.classList.toggle('todo-completed-full');
            h4.classList.toggle('strike-through');
            p.classList.toggle('strike-through');
        }
    }

    addClickFeedback(element) {
        if (!element) return;
        element.classList.remove('click-feedback');
        void element.offsetWidth;
        element.classList.add('click-feedback');
    }

    updateTodoDOM () {
        const mainContent = this.elements.mainContent;
        const todoID = this.editTodo.id;
        
        if (todoID) {
            const title   = this.elements.todoTitle.value.trim();
            const details = this.elements.todoDetails.value.trim();
            const date    = this.elements.todoDate.value.trim();

            const todoElement = mainContent.querySelector(`.todo[data-id='${todoID}']`);
            if (todoElement) {
                const titleElement = todoElement.querySelector('h4');
                const detailsElement = todoElement.querySelector('p');
                const dateElement = todoElement.querySelector('.todo-item-date');

                if (titleElement && title !== titleElement.textContent) {
                    titleElement.textContent = title;
                }

                if (detailsElement && details !== detailsElement.textContent) {
                    detailsElement.textContent = details;
                }
                
                if (dateElement && date !== dateElement.textContent) {
                    dateElement.textContent = date
                }
            }
        }
    }

    updateProjectDOM () {
        const sidebar     = this.elements.sidebarProjects;
        const mainContent = this.elements.mainContent;
        const projectID   = this.editProject.id;

        if (projectID) {
            const title   = this.elements.projectTitle.value.trim();
            const details = this.elements.projectDetails.value.trim();
            const prioID  = this.getPriorityID();

            const navProjectElement = sidebar.querySelector(`.project-item[data-id='${projectID}']`);
            const mainProjectElement = mainContent.querySelector(`.project-container[data-id='${projectID}']`);

            if (navProjectElement) {
                const navTitleElement  = navProjectElement.querySelector('h4');
                const detailsElement   = navProjectElement.querySelector('p');
                const projectImg       = navProjectElement.querySelector('.project-img');
                const mainTitleElement = mainProjectElement.querySelector('h4');
                
                if (navTitleElement && title !== navTitleElement.textContent) {
                    navTitleElement.textContent = title;
                }
                
                if (detailsElement && details !== detailsElement.textContent) {
                    detailsElement.textContent = details;
                }
                
                const newImgSrc = this.getProjectImageSrc(prioID);
                if (projectImg && projectImg.src !== newImgSrc) {
                    projectImg.src = newImgSrc;
                }

                if (mainTitleElement && title !== mainTitleElement.textContent) {
                    mainTitleElement.textContent = title;
                }
            }
        }
    }

    getProjectImageSrc (prioID) {
        const imageSources = {
            contemplativePrio: this.images.contemplative,
            pragmaticPrio:     this.images.pragmatic,
            imperativePrio:    this.images.imperative
        };
        return imageSources[prioID];
    }

    editTodoValues (event) {
        const todoElement = event.target.closest('.todo');
        const todoID = todoElement.getAttribute('data-id');
        const todo = this.tasklist.tasks.find(task => task.id === todoID);

        const projectForm = this.elements.projectForm;
        const form = projectForm.querySelector('form');
        form.reset();

        this.elements.todoTitle.value   = todo.title;
        this.elements.todoDetails.value = todo.details;
        this.elements.todoDate.value    = todo.date;
        this.editTodo = todo;

        this.renderTodoForm(event);
    }

    editProjectValues (event) {
        const sidebar = this.elements.sidebarNav;
        const projectElement = event.target.closest('.project-item');
        const projectID = projectElement.getAttribute('data-id');
        const project = this.tasklist.tasks.find(task => task.id === projectID);

        const projectForm = this.elements.projectForm;
        const form = projectForm.querySelector('form');
        form.reset();

        this.elements.projectTitle.value = project.title
        this.elements.projectDetails.value = project.details
        
        const prioID = this.getPriorityID();
        if (prioID) {
            sidebar.getElementById(prioID).checked = true;
        }

        this.editProject = project;
        this.renderProjectForm(event);
    }

    getPriorityID () {
        const prioID = Array.from(this.elements.projectPrio).find(radio => radio.checked);
        return prioID ? prioID.id : null;
    }
}