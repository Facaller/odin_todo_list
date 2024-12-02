import "./styles.css"
import { Todo, TodoList } from "./todos.js";
import Project from "./projects.js";

const project = new Project("Build website", "Create a personal portfolio", "2024-12-10");
const todo = new Todo ("Buy groceries", "Milk, eggs, bread", "2024-12-01");
const todolist = new TodoList()

todolist.addTask(todo);
todolist.updateTask(todo.id, "Buy burgers", "Cheese", "2010-10-10")

console.log(todo.id);
console.log(project.id);
console.log(todo);