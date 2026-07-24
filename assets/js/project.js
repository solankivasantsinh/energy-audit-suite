document.addEventListener("DOMContentLoaded", function () {

    const saveBtn = document.getElementById("saveProjectBtn");

    if (!saveBtn) return;

    saveBtn.addEventListener("click", saveProjectData);

});

function saveProjectData() {

    const companyName = document.getElementById("companyName").value.trim();
    const plantName = document.getElementById("plantName").value.trim();
    const contactPerson = document.getElementById("contactPerson").value.trim();
    const designation = document.getElementById("designation").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const auditType = document.getElementById("auditType").value;
    const auditDate = document.getElementById("auditDate").value;

    if (companyName === "" || contactPerson === "" || mobile === "") {
        alert("Please fill all mandatory fields.");
        return;
    }

    const project = {
        projectId: generateProjectId(),
        companyName,
        plantName,
        contactPerson,
        designation,
        mobile,
        email,
        address,
        city,
        state,
        pincode,
        auditType,
        auditDate,
        createdOn: new Date().toISOString()
    };
        // Save Project
    saveProject(project);

    // Set Current Project
    localStorage.setItem("currentProjectId", project.projectId);

    alert("Project Created Successfully!");

    // Redirect
    window.location.href = "dashboard.html";
}