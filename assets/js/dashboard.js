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

        document.getElementById("company").innerText = latest.companyName;
document.getElementById("plant").innerText = latest.plantName;
document.getElementById("contact").innerText = latest.contactPerson;
    }

    // All Projects Table
    const table = document.getElementById("projectTable");

    if (table) {

        table.innerHTML = "";

        projects.forEach(project => {

            table.innerHTML += `
            <tr>
                <td>${project.projectId}</td>
                <td>${project.companyName}</td>
<td>${project.plantName}</td>
<td>${project.contactPerson}</td>
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

    setCurrentProjectId(projectId);

    window.location.href = "chiller.html";

}