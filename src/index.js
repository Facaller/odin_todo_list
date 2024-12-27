import "./styles.css"
import { Todo, TodoList } from "./todos.js";
import { Project } from "./projects.js";
import { TaskList } from "./task.js";

// create a get ID method in TaskList for "general use (it's only for Projects ;))" 
const taskList = new TaskList();

const project = new Project("Build website", "Create a personal portfolio", "Complete");
taskList.addTask(project);

const todo = new Todo ("Buy groceries", "Milk, eggs, bread", "2024-12-01", project.id, taskList);
const todo2 = new Todo ("Sell groceries", "Bananas, potatoes, apples", "2024-12-02", project.id, taskList);
taskList.addTask(todo);
taskList.addTask(todo2);

const projectTodos = taskList.getTodosByProject(project.id);
const todo3 = new Todo ("Make groceries", "Organic", "2024-02-22", project.id, taskList);
taskList.addTask(todo3);
console.log(projectTodos);

console.log(taskList.tasks);

console.log(taskList.sortTasks('title'))

// taskList.markAllProjectTodos(project.id, 'complete');
// console.log(taskList.getAllCompletedTasks());
// taskList.unmarkAllProjectTodos(project.id, 'complete');
// console.log(taskList.getAllCompletedTasks());

// tasklist.updateTask(todo.id, "Buy burgers", "Cheese", "2010-10-10")

// console.log(todo.id);
// console.log(project.id);
// console.log(todo);
// console.log(project);
// console.log(tasklist.getAllTasks());
// console.log(tasklist.removeTask(todo.id));
// console.log(tasklist.getAllTasks());
// console.log(todo);
// console.log(tasklist.markTaskProperty(project.id, 'complete'));
// console.log(tasklist.getAllCompletedTasks());
// console.log(todo.isComplete);
// console.log(project.isComplete);