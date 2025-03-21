import "./styles.css"
import { TaskList } from "./task.js";
import { Todo } from "./todos.js";
import { Project } from "./projects.js";
import { DOMHandler } from "./DOMHandler.js";

const taskList = new TaskList();
const domHandler = new DOMHandler(taskList);





// const project = new Project("Build website", "Create a personal portfolio", "Complete");
// taskList.addTask(project);

// const todo = new Todo ("Buy groceries", "Milk, eggs, bread", "2025-01-04", project.id, taskList);
// const todo2 = new Todo ("Sell groceries", "Bananas, potatoes, apples", "2025-01-05", project.id, taskList);
// taskList.addTask(todo);
// taskList.addTask(todo2);

// const projectTodos = taskList.getTodosByProject(project.id);
// const todo3 = new Todo ("Make groceries", "Organic", "2024-02-11", project.id, taskList);
// taskList.addTask(todo3);
// console.log(projectTodos);
// console.log(taskList.sortTasks('title'));
// console.log(todo.id);