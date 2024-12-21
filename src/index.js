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
console.log(projectTodos);

console.log(taskList.tasks)

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