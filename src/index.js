import "./styles.css"
import Todo from "./todos.js";
import Project from "./projects.js";

const test = new Todo("Work", "Hard", 1010, 1);
console.log(test);

const project = new Project("Build website", "Create a personal portfolio", "2024-12-10");
const todo = new Todo ("Buy groceries", "Milk, eggs, bread", "2024-12-01");
console.log(todo.id);
console.log(project.id);
