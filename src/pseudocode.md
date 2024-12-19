getTaskID(id) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
        console.log('Task does not exist');
        return null; // Return null if no task found
    }
    return task.id; // Return the task ID
}
