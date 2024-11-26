import "./styles.css"
import Todo  from "./todos.js";

const test = new Todo("Work", "Hard", 1010, 1);
console.log(test);

const question = prompt('New data?');

test.updateTodo(test, { details: question })

console.log(test);