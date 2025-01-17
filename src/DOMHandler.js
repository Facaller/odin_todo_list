class DOMElements {
    constructor () {
        this.sidebarNav = document.getElementById('sidebarNav');
        this.todo      = document.querySelector('.todo');
        this.exitBtn    = document.querySelector('.project-exit');
    }
}

class DOMHandler {
    constructor (app) {
        this.app = app;
        this.elements = new DOMElements();
    }

    sidebarEvents () {
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

    todoEvents () {
        this.elements.todo.addEventListener('click', (event) => {
            if (event.target.tagname === 'BUTTON') {
                const todoElement = event.target.closest('.todo').id;
                const buttonID = event.target.id;
                // can't set data attribute in constructor because it doesn't exist yet
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