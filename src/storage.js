const STORAGE_KEY = 'todo-app-data';

export class Storage {

    saveTaskList (tasklist) {
        const json = JSON.stringify(tasklist);
        localStorage.setItem(STORAGE_KEY, json);
        console.log("Saved:", tasklist);
    }

    loadTasklist () {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;
        return JSON.parse(data);
    }

    clearTasklist () {
        localStorage.removeItem(STORAGE_KEY);
    }
}

