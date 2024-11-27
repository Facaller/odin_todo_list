class Project {
    constructor (title, id) {
        this.projectList = [];
        this.title = title;
        this.id    = id;
    }

    validateProject (projectInput, projectValue) {
        const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-_]*$/;

        if (pattern.test(projectInput)) {
            console.log('Validate project works');
            projectInput = projectValue;
        } else {
            console.log('Validation failed');
        }
    }
}