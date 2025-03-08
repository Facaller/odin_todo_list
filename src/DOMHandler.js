import { container } from "webpack";
import { Project } from "./projects";
import { Todo } from "./todos.js";

class DOMElements {
    constructor () {
        this.sidebarNav         = document.querySelector('.sidebar');
        this.sidebarProjects    = document.querySelector('.sidebar-projects');
        this.todoBox            = document.querySelector('.todos-box');
        this.mainContent        = document.querySelector('.main-content');
        this.projectContainer   = document.querySelector('.project-container');
        this.projectExitBtn     = document.querySelector('.project-exit');
        this.projectItem        = document.querySelector('.project-item');
        this.projectImage       = document.querySelector('.project-img');
        this.projectMore        = document.querySelector('.project-more');
        this.moreOptionsProject = document.querySelector('.more-options-project');
        this.editProjectBtn     = document.querySelector('.edit-project-btn');
        this.deleteProjectBtn   = document.querySelector('.delete-project-btn');
        this.projectForm        = document.querySelector('.project-form');
        this.projectTitle       = document.getElementById('projectTitle');
        this.projectDetails     = document.getElementById('projectDetails');
        this.projectPrio        = document.querySelectorAll('input[name="priority"]');
        this.contemplativePrio  = document.getElementById('contemplativePrio');
        this.pragmaticPrio      = document.getElementById('pragmaticPrio');
        this.imperativePrio     = document.getElementById('imperativePrio');
        this.submitProject      = document.getElementById('submitProject');
        this.cancelProject      = document.getElementById('cancelProject');
        this.addProject         = document.getElementById('addProject');
        this.todoMore           = document.querySelector('.todo-more');
        this.moreOptionsTodo    = document.querySelector('.more-options-todo');
        this.editTodoButton     = document.querySelector('.edit-todo-btn');
        this.deleteTodoBtn      = document.querySelector('.delete-todo-btn');
        this.todoForm           = document.querySelector('.todo-form');
        this.todoTitle          = document.getElementById('todoTitle');
        this.todoDetails        = document.getElementById('todoDetails');
        this.todoDate           = document.getElementById('todoDate');
        this.submitTodo         = document.getElementById('submitTodo');
        this.cancelTodo         = document.getElementById('cancelTodo');
        this.addTodo            = document.querySelector('.add-todo');
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
        const div = document.createElement('div');
        div.classList.add('project-container');

        const box = document.createElement('div');
        box.classList.add('todos-box')
        div.appendChild(box);

        const addTodoDiv = document.createElement('div');
        addTodoDiv.classList.add('add-todo');
        div.appendChild(addTodoDiv);

        const addTodoBtn = document.createElement('button');
        addTodoDiv.appendChild(addTodoBtn);

        div.setAttribute('data-id', project.id);
        
        this.elements.mainContent.appendChild(div);
    }

    createProjectForNav (project) {
        const div = document.createElement('div');
        div.classList.add('project-item');

        const projectImg = document.createElement('img');
        projectImg.classList.add('project-img');
        div.appendChild(projectImg);

        const title = document.createElement('h4');
        title.textContent = project.title;
        div.appendChild(title);

        const details = document.createElement('div');
        details.classList.add('nav-project-details');
        div.appendChild(details);

        const detailsText = document.createElement('p');
        detailsText.textContent = project.details;
        details.appendChild(detailsText);

        const more = document.createElement('div');
        more.classList.add('project-more');
        div.appendChild(more);

        const moreOptions = document.createElement('div');
        moreOptions.classList.add('more-options-project');
        more.appendChild(moreOptions);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-project-btn');
        editBtn.textContent = 'Edit';
        moreOptions.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-project-btn');
        deleteBtn.textContent = 'Delete';
        moreOptions.appendChild(deleteBtn);

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
        buttonDiv.classList.add('todo-buttons');
        div.appendChild(buttonDiv);
// need to add logic for background colour on img
        const importantBtn = document.createElement('div');
        importantBtn.classList.add('todo-important');
        buttonDiv.appendChild(importantBtn);
// need to add logic for strikethrough and fill on img
        const completeBtn = document.createElement('div');
        completeBtn.classList.add('todo-completed');
        buttonDiv.appendChild(completeBtn);

        const todoMore = document.createElement('div');
        todoMore.classList.add('todo-more');
        buttonDiv.appendChild(todoMore);

        const moreOptions = document.createElement('div');
        moreOptions.classList.add('more-options-todo');
        todoMore.appendChild(moreOptions);

        const editTodoBtn = document.createElement('button');
        editTodoBtn.classList.add('edit-todo-btn');
        editTodoBtn.textContent = 'Edit';
        moreOptions.appendChild(editTodoBtn);

        const deleteTodo = document.createElement('button');
        deleteTodo.classList.add('delete-todo-btn');
        deleteTodo.textContent = 'Delete';
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
        this.elements.projectForm.style.display = 'block'
    }
// form can't be attached to project container because container doesn't exist yet
// let form be free standing block that attaches to specific container when add
// todo button is clicked. if clicked on separate containers, it removes from the
// one and attaches to another, getting a new project container ID 
    renderTodoForm () {
        //put listener on mainContent then check for specific project
        // and add todo btn. add todo based on project container ID
        const addTodo = this.elements.addTodo;
        addTodo.addEventListener('click', () => {
            this.elements.todoForm.style.display = 'block'
        })
    }
// add edit project logic same as for todo
    submitProjectForm () {
        const submitProject = this.elements.submitProject;
        submitProject.addEventListener('click', (event) => {
            event.preventDefault();

            if (this.editProject) {
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
            } else {
                const newProject = this.getProjectValues();
                this.tasklist.addTask(newProject);
                this.renderProject()
            }
            this.elements.projectForm.reset();
            this.elements.projectForm.classList.toggle('hidden');
        })
    }

    submitTodoForm () {
        const submitTodo = this.elements.submitTodo;
        submitTodo.addEventListener('click', (event) => {
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
            this.elements.todoForm.classList.toggle('hidden');
        })
    }

    cancelProjectForm () {
        const cancelProject = this.elements.cancelProject;
        cancelProject.addEventListener('click', () => {
            this.elements.projectForm.reset();
            this.elements.projectForm.classList.toggle('hidden');
        });
    }

    cancelTodoForm () {
        const cancelTodo = this.elements.cancelTodo;
        cancelTodo.addEventListener('click', () => {
            this.elements.todoForm.reset();
            this.elements.todoForm.classList.toggle('hidden');
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

    bindTodoButtons () {
        const todoBox = this.elements.todoBox;
        todoBox.addEventListener('click', (event) => {
            const button = event.target.closest('.todo-buttons');
            if (button) {
                const todoElement = event.target.closest('.todo');
            
                if (todoElement) {
                    const todoID = todoElement.getAttribute('data-id');

                    if (button.classList.contains('todo-important')) {
                        markTaskProperty(todoID, 'important');
                    } else if (button.classList.contains('todo-complete')) {
                        markTaskProperty(todoID, 'complete');
                    } else if (button.classList.contains('todo-more')) {
                        this.toggleVisibilityForClass('todo-more');
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
        });
    }

    showProject = (event, projectID) => {
        const projectContainer = document.querySelector(`.project-container[data-id='${projectID}']`);

        if (projectID) {
            projectContainer.style.display = 'block';
            this.markTaskAsRendered(projectID);
        }
    }

    removeProject () {
        const mainContent = this.elements.mainContent;
        mainContent.addEventListener('click', this.bindRemoveProject);
    }

    bindRemoveProject = (event) => {
        const exitButton = event.target.closest('.project-exit');
            
        if (exitButton) {
            const projectContainer = exitButton.closest('.project-container');
            const projectContainerID = projectContainer?.getAttribute('data-id');

            if (projectContainerID) {
                const businessProject = this.tasklist.tasks.find(project => project.id === projectContainerID);

                if (businessProject) {
                    projectContainer.classList.toggle('hidden');
                    this.removeRenderedTask(projectContainerID);
                }
            }
        }
    }

    deleteProject = (event) => {
        const navProject = event.closest('.project-item');
        const navProjectID = navProject?.getAttribute('data-id');

        const businessProject = this.tasklist.tasks.find(project => project.id === navProjectID);

        if (businessProject) {
            this.removeRenderedTask(navProjectID);

            const projectContainer = document.querySelector(`.project-container[data-id='${navProjectID}']`);
            const projectNavContainer = document.querySelector(`.project-item[data-id='${navProjectID}']`);

            if (projectContainer) {
                projectContainer.remove();
            }

            if (projectNavContainer) {
                projectNavContainer.remove();
            }

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
        const todo = this.editTodo;
        const todoID = todo?.getAttribute('data-id');
        
        if (todoID) {
            const title   = this.elements.todoTitle.value.trim();
            const details = this.elements.todoDetails.value.trim();
            const date    = this.elements.todoDate.value.trim();

            todo.querySelector('h4').textContent = title;
            todo.querySelector('p').textContent = details;
            
            const dateElement = todo.querySelector('.todo-date'); 
            if (dateElement) {
                dateElement.textContent = date;
            }
        }
    }

    updateProjectDOM () {
        const project = this.editProject;
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

    editTodoValues (event) {
        const todoElement = event.target.closest('.todo');
        const todoID = todoElement.getAttribute('data-id');
        const todo = this.tasklist.tasks.find(task => task.id === todoID);

        this.todoTitle.value   = todo.title;
        this.todoDetails.value = todo.details;
        this.todoDate.value    = todo.date;
        this.editTodo = todo;

        const todoMore = todoElement.querySelector('.todo-more');
        todoMore.classList.toggle('hidden');
        this.renderTodoForm();
    }

    editProjectValues (event) {
        const projectElement = event.closest('.project-item');
        const projectID = projectElement.getAttribute('data-id');
        const project = this.tasklist.tasks.find(task => task.id === projectID);

        this.projectTitle.value = project.title
        this.projectDetails.value = project.details
        
        const prioID = this.getPriorityID();
        if (prioID) {
            document.getElementById(prioID).checked = true;
        }

        this.editProject = project;
        const projectMore = projectElement.querySelector('.project-more');
        projectMore.classList.toggle('hidden');
        this.renderProjectForm();
    }

    getPriorityID () {
        const prioID = Array.from(this.projectPrio).find(radio => radio.checked);
        return prioID ? prioID.id : null;
    }
}