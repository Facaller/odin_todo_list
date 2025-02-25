For your navProjectDetails element, it's a good idea to wrap it in a div rather than just using a p tag. This will give you more flexibility in terms of styling and layout, especially since you're aiming to make it appear as a box on hover. The p tag is more suited for simple paragraphs of text, while a div allows for easier styling and containing multiple types of elements inside it (such as additional p tags, span, or other elements, if needed).

So, the structure would look like this:

html
Copy
<div class="sidebar-projects">
    <h3>Projects</h3>
    <div class="new-project">
        <button class="project-img" id="projectImg">Img</button>
        <h4>Title</h4>
        <!-- Container div for details, keeping the p tag inside -->
        <div class="nav-project-details" id="navProjectDetails">
            <p>Deets</p> <!-- You can later add more details in here -->
        </div>
        <div class="more" id="projectMore">X
            <div class="more-options" id="moreOptionsProject">
                <button id="editProjectBtn">Edit</button>
                <button id="deleteProjectBtn">Delete</button>
            </div>
        </div>
    </div>
</div>
Styling the hover effect:
You can use CSS to hide the navProjectDetails by default and only show it when the user hovers over the project container (new-project):

css
Copy
.nav-project-details {
    display: none; /* Hide by default */
}

.new-project:hover .nav-project-details {
    display: block; /* Show when hovered */
}
This way, the navProjectDetails div will contain the details (which can be expanded later), and you can control its visibility more easily. Plus, by using a div, you'll have more flexibility to add different elements inside as your app grows!



