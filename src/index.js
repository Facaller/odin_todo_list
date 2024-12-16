import "./styles.css"
import { Todo, TodoList } from "./todos.js";
import { Project } from "./projects.js";

const project = new Project("Build website", "Create a personal portfolio", "Complete");
const todo = new Todo ("Buy groceries", "Milk, eggs, bread", "2024-12-01", project.title);
const todolist = new TodoList()

// todolist.addTask(todo);
// todolist.addTask(project);
// todolist.updateTask(todo.id, "Buy burgers", "Cheese", "2010-10-10")

// console.log(todo.id);
// console.log(project.id);
// console.log(todo);
// console.log(project);
// console.log(todolist.getAllTasks());
// console.log(todolist.removeTask(todo.id));
// console.log(todolist.getAllTasks());
// console.log(todo);
// console.log(todolist.markTaskProperty(project.id, 'complete'));
// console.log(todolist.getAllCompletedTasks());
// console.log(todo.isComplete);
// console.log(project.isComplete);