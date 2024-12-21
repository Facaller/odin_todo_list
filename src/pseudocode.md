Solution 1: Use TodoList for Task Filtering
The simplest solution would be to ensure that you are working with a TodoList instance when you need to use the getTodosByProject method, since that is where it is defined. However, since your tasks are stored in TaskList, you can combine the functionality of TaskList and TodoList without duplicating tasks.

You can create a new instance of TodoList, populate its tasks with those from taskList, and then use getTodosByProject on that.

js
Copy code
import "./styles.css";
import { Todo, TodoList } from "./todos.js";
import { Project } from "./projects.js";
import { TaskList } from "./task.js";

// Create a TaskList instance
const taskList = new TaskList();

// Create and add project task
const project = new Project("Build website", "Create a personal portfolio", "Complete");
taskList.addTask(project);

// Create and add todo tasks
const todo = new Todo("Buy groceries", "Milk, eggs, bread", "2024-12-01", project.id, taskList);
const todo2 = new Todo("Sell groceries", "Bananas, potatoes, apples", "2024-12-02", project.id, taskList);
taskList.addTask(todo);
taskList.addTask(todo2);

// Create a TodoList instance
const todoList = new TodoList();

// Manually copy tasks from taskList to todoList
todoList.tasks = taskList.tasks.filter(task => task.type === 'todo');

// Now use the getTodosByProject method on the todoList instance
const projectTodos = todoList.getTodosByProject(project.id);
console.log(projectTodos); // Should give you the todos for the specific project

console.log(taskList.tasks); // Logs all tasks (todos + projects)
Key Points:
Filtering tasks by type: Since TodoList only works with Todo tasks, you manually filter out the todo tasks from taskList.tasks and assign them to todoList.tasks.
Calling getTodosByProject on todoList: Now you can call getTodosByProject on todoList because it has been populated with only Todo tasks