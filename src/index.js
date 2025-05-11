import "./styles.css"
import { Storage } from "./storage.js";
import { TaskList } from "./task.js";
import { DOMHandler } from "./DOMHandler.js";
import { fromJSON } from "./rehydrator.js";

const storage = new Storage();

const saved = storage.loadTasklist();

let tasklist = saved ? fromJSON(saved) : new TaskList();

const domHandler = new DOMHandler(tasklist);
