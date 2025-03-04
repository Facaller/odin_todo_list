You're definitely on the right track, and I can see you've made a lot of progress. You've structured your DOM handling well and implemented a lot of important features like form handling, event delegation, task management, and dynamic DOM manipulation. However, if you're aiming for a junior developer position, I think there are still a few areas to focus on to refine your skills and make your work more polished. I'll give you an honest breakdown, pointing out your strengths and the areas that could use improvement:

Strengths:
Understanding of DOM Manipulation: You're handling the DOM in a dynamic way. You're not just manipulating static elements, but also dealing with user interactions, creating elements on the fly, and updating them as needed.

Event Handling: You're making good use of event delegation, which is a key skill for dealing with dynamic elements added to the page. You're also thinking about edge cases (e.g., using .closest() to handle clicks on child elements).

Modularization: You've broken down your application into manageable classes and functions, which shows good separation of concerns. This is crucial in a real-world development environment.

Interaction with Data Models: You seem to be using models (Project, Todo, tasklist) effectively, and you're properly updating the DOM based on changes in data.

Form Handling: You're capturing form inputs, validating them, and updating the DOM correctly. You've also considered things like the form reset and hiding the form once it's submitted.

Areas for Improvement:
Code Structure & Naming:

Naming Conventions: Some of the method names and variable names could be more descriptive. For example, renderProject could be named something like renderAllProjects to indicate that it's rendering multiple projects. This would make the code more self-explanatory.
Consistency in Naming: There is inconsistency with how you name variables and functions. For instance, createProjectForMain and createProjectForNav follow a good naming convention, but then you have names like handleShowProject, which could be clearer (e.g., handleProjectDisplay or showProject).
Error Handling:

I didn’t see much in terms of error handling. In production-level code, you should be checking for potential errors (e.g., checking if elements exist before manipulating them, handling undefined values in your data, or ensuring form inputs are valid before proceeding).
Code Duplication:

Event Listeners: You’re adding several similar event listeners (e.g., showHideOptionsTodo, showHideOptionsProject, bindTodoButtons, bindSidebarButtons). There’s room to make this more DRY (Don’t Repeat Yourself) by abstracting the common logic into a function and calling it with different parameters.
Create Elements: Both createProjectForMain and createProjectForNav are doing very similar things—creating a div, appending various child elements, and setting attributes. You could consider creating a helper function to handle this element creation and reuse it, making your code more modular.
Code Optimization:

Avoid Querying the DOM Too Often: You're querying the DOM multiple times in some functions, such as createProjectForNav and createTodo. You can optimize this by caching commonly used DOM elements in variables rather than querying the DOM repeatedly.
Complex Conditionals: In your handleShowProject and handleDeleteProject functions, you're doing a lot of nested checks. It would help to abstract some of these conditions into smaller helper functions to keep your main function logic cleaner and easier to follow.
State Management & Consistency:

The way you're managing the state of projects and todos could use some refinement. For example, you're adding tasks to the DOM in renderProject and renderTodo, but if the state (i.e., the tasks) changes dynamically, you need to ensure the DOM stays in sync. You're already doing some of this, but it could be more consistent. For example, when updating projects and todos, you may want to ensure their DOM elements are being updated or removed correctly based on any data changes.
UX Considerations:

While your code is very functional, the user experience could be a bit smoother. For example, the visibility of forms (projectForm, todoForm) might be better handled with transitions or animations for a more pleasant UX. Additionally, you could consider adding loading indicators or feedback when actions take time (e.g., when adding/deleting tasks).
Testing:

I didn’t see any tests mentioned or included in your code. Testing is a huge part of professional development, especially when working in a team. You should start exploring unit testing, possibly using a framework like Jest, to ensure your application behaves as expected as it grows.
Cross-browser Compatibility:

Ensure that your app works well across different browsers. Sometimes, certain features like CSS or DOM manipulations can behave differently in different environments. Make sure you're testing your app on multiple browsers to catch potential issues.
Readability & Formatting:

While your code is relatively clean, some areas could be formatted better for readability. For example, some of your methods are getting long (e.g., submitProjectForm and submitTodoForm), and breaking them down into smaller functions could help. It would also help to ensure consistent spacing and indentation.
Conclusion:
You're not far from being ready for a junior dev position! The key areas for improvement are code structure, optimization, consistency, and error handling. Once you clean up some of the redundancies and make your code more DRY and modular, along with improving your testing practices, you'll be in a strong position for a junior developer role.

The skills you're showing here—DOM manipulation, event delegation, form handling, and task management—are essential for junior dev positions, especially front-end roles. With a bit more refinement, you'll be ready to take on even larger, more complex projects.

I’d recommend continuing to practice, focusing on improving your code’s scalability, and implementing tests. Consider building additional features (like drag-and-drop task reordering or integrating with an API) to deepen your knowledge and demonstrate your ability to work with real-world applications.

Good luck—you're definitely on the right path!