___The issue___

- The render methods are loops, so I can't add new methods individually.
- Should probably make them single methods and add a separate method for rendering all tasks.
-Won't be going with state-tracking, but rather with visibility changes to make things easier.
Disable add todo & project buttons unless All Tasks state is in action

***Important button click***

Create variable for todos from the main array.
Use that variable to check if any todos are marked important
Run forEach loop to check if any todos marked NOT important is currently rendered
Every todo that is not important that is rendered, add a hidden class to it