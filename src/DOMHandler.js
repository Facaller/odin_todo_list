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
            const todoElement = event.target.closest('.todo').id;
            if (todoElement === 'important') {
                markTaskProperty (taskID, property)
            } else if (todoElement === 'complete') {
                markTaskProperty (taskID, property)
            } else if (todoElement === 'edit') {

            }
        })
    }
}