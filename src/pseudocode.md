1. Encapsulate Todos within Projects
Project Class Owns Todos: Rather than having Todo instances being created independently, you can make it so that Todo instances are only created through a Project class. The Project class can have a method like addTodo() that creates and manages Todo instances within that project.
Encapsulation of Todos: The Project class holds a collection (like an array) of Todo items. This would mean you instantiate a Todo only via a Project, and Todo cannot exist outside of a Project.
How it works:

When a Project is created, it can maintain a list of associated Todo objects.
A method like addTodo() within the Project class can control the creation of Todo items, ensuring that they belong to that specific project.
Example Thought Process:

The Todo constructor may receive a reference to the Project instance when being created (or some identifier that links it to the Project), ensuring that Todo items are tied directly to the project context.
2. Use a Factory Pattern
Project as a Factory: The Project class can act as a factory for Todo items. Instead of creating a Todo independently, you would always create a Todo using a method like createTodo(). This method would ensure that the Todo is tied to the specific project, preventing it from being instantiated outside of a project context.
Factory Restrictions: This approach makes sure that you can't accidentally instantiate a Todo without a Project context.
How it works:

A createTodo() method in Project could call the Todo constructor and link the Todo to its Project.
This also allows you to control the creation of Todo instances (e.g., validating that they can only be created under certain conditions or with required properties).
3. Validation on Todo Creation
Ensure Project Context: If you want to strictly enforce that a Todo can only be created if a Project exists, you could implement a check in the Todo constructor. For example, you could add a check that ensures a Todo can only be instantiated if it has a valid Project object (or an identifier pointing to a Project).
Preventing Independent Instantiation: You could even throw an error if a Todo is instantiated without being part of a Project.
How it works:

The Project constructor could either initialize an empty list of Todos or pass itself to Todo when adding a new Todo.
The Todo constructor might look for a Project reference and refuse to initialize without one.
4. UI-Level Constraints
UI Instantiation Flow: If you're planning to create Todo items via the UI, you could manage the flow such that a Todo is only created after a Project is selected or created. The UI could handle the validation that a Project must exist before creating a Todo.
Prevent Direct Todo Creation: In the UI, when creating a Todo, only allow it to be created when a Project is selected (or linked). This would be a user-facing way to enforce the relationship.
5. Linking Todos and Projects via IDs
Link via ID: If you need more flexibility, you could assign each Todo an ID that links it to a Project. When creating a Todo, you would pass the Project ID or reference, ensuring that each Todo is tied to the correct project.
Enforcing Relationships via ID: In the Todo class, you could add a check in the constructor to verify that the Project exists (using its ID or a reference).
6. Designing with Composition
Project Composes Todos: Instead of inheriting from Task, the Project class could "compose" Todo instances, meaning the Project would internally hold and manage Todo objects, but the Todo would be a standalone object outside of inheritance. You could design it such that a Todo cannot exist outside a Project context.
Summary of Ideas:
Encapsulate Todo within Project: Only allow Todo creation through a method in Project.
Factory Pattern: Use a factory method in the Project to create Todo instances.
Constructor Validation: Check if a Project exists when creating a Todo, and only allow it to be created if it’s linked to a project.
UI Constraints: Only allow Todo creation when a Project is selected or created, enforcing the relationship at the UI level.
Link via IDs: Use IDs to enforce that Todos belong to a Project.
Composition: Design your Todo and Project relationship using composition rather than inheritance.
These ideas should give you flexibility to implement a structure where Todo can only be part of a Project, either through enforcing relationships in the code or through user interactions in the UI.