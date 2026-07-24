// Save a new project
// Get All Projects

function getProjects() {

    return JSON.parse(localStorage.getItem("projects")) || [];

}

// Save Project

function saveProject(project) {

    let projects = getProjects();

    projects.push(project);

    localStorage.setItem("projects", JSON.stringify(projects));

}

// Generate Project ID

function generateProjectId() {

    let projects = getProjects();

    let number = projects.length + 1;

    return "EAS-2026-" + String(number).padStart(4, "0");

}