document.addEventListener("DOMContentLoaded", function () {

    const projects = getProjects();

    // Total Projects
    const totalProjects = document.getElementById("totalProjects");

    if (totalProjects) {
        totalProjects.innerText = projects.length;
    }

    // Latest Project
    if (projects.length > 0) {

        const latest = projects[projects.length - 1];

        document.getElementById("company").innerText = latest.company;
        document.getElementById("plant").innerText = latest.plant;
        document.getElementById("contact").innerText = latest.contact;
    }

    // All Projects Table
    const table = document.getElementById("projectTable");

    if (table) {

        table.innerHTML = "";

        projects.forEach(project => {

            table.innerHTML += `
            <tr>
                <td>${project.projectId}</td>
                <td>${project.company}</td>
                <td>${project.plant}</td>
                <td>${project.contact}</td>
                <td>
                    <button class="btn btn-primary btn-sm"
                        onclick="openProject('${project.projectId}')">
                        Open
                    </button>
                </td>
            </tr>
            `;

        });

    }

});

// Open Project
function openProject(projectId) {

    localStorage.setItem("currentProjectId", projectId);

    window.location.href = "chiller.html";

}