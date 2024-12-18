import "./styles.css"
import { Todo } from "./todos.js";
import { Project, ProjectList } from "./projects.js";
import { TaskList } from "./task.js";

// create a get ID method in TaskList for "general use (it's only for Projects ;))" 
const taskList = new TaskList();

const project = new Project("Build website", "Create a personal portfolio", "Complete");
taskList.addTask(project);

const todo = new Todo ("Buy groceries", "Milk, eggs, bread", "2024-12-01", project.title, taskList);
taskList.addTask(todo);

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