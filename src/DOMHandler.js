class DOMElements {
    constructor () {
        this.sidebarNav  = document.getElementById('sidebarNav');
        this.todoBox     = document.querySelector('.todos-box');
        this.exitBtn     = document.querySelector('.project-exit');
        this.addProject  = document.getElementById('addProject');
        this.projectForm = document.getElementById('projectForm')
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
    createProject () {
        this.elements.addProject.addEventListener('click', () => {
            this.elements.projectForm.style.display = 'block'
        })
    }

    createTodo () {
        
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
                addTask(task);
            }
        });
    }

    bindTodoButtons () {
        this.elements.todoBox.addEventListener('click', (event) => {
            if (event.target.tagname === 'BUTTON') {
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