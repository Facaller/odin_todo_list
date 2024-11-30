class Project {
    constructor (title, details, id) {
        this.title = title;
        this.details = details;
        this.id    = id;
    }

    validateProject (projectInput) {
        if (projectInput && projectInput.trim() !== '') {
            const pattern = /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-_]*$/;

            if (pattern.test(projectInput)) {
                console.log('Validate project works');
                return true
            } else {
                console.log('Validation failed: Invalid characters');
                return false;
            }
        } else {
            console.log('Validation failed: Input is empty or invalid');
            return false;
        }
    }
}

class ProjectList {
    constructor () {
        this.projects = [];
    }
}