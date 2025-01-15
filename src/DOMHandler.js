class DOMElements {
    constructor () {
        this.sidebarNav = document.getElementById('sidebarNav');
        this.projects   = document.querySelector('.project-container')
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

    projectEvents () {
        this.elements.projects.addEventListener('click', (event) => {
            if () {
                
            }
        })
    }
}