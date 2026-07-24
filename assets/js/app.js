// Energy Audit Suite JavaScript

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.querySelector(".btn-success");

    if (btn) {

        btn.addEventListener("click", function () {

            const project = {

                projectId: generateProjectId(),

                company: document.querySelectorAll("input")[0].value,

                plant: document.querySelectorAll("input")[1].value,

                contact: document.querySelectorAll("input")[2].value,

                designation: document.querySelectorAll("input")[3].value,

                mobile: document.querySelectorAll("input")[4].value,

                email: document.querySelectorAll("input")[5].value

            };

            saveProject(project);

            alert("Project Saved Successfully");

            window.location.href = "dashboard.html";

        });

    }

});

// Save Chiller Information

const saveChillerBtn = document.getElementById("saveChiller");

if (saveChillerBtn) {

    saveChillerBtn.addEventListener("click", function () {

        const chiller = {

            chillerName: document.getElementById("chillerName").value,

            capacity: document.getElementById("capacity").value,

            type: document.getElementById("type").value,

            make: document.getElementById("make").value,

            model: document.getElementById("model").value,

            quantity: document.getElementById("qty").value

        };

        localStorage.setItem("currentChiller", JSON.stringify(chiller));

        alert("Chiller Information Saved Successfully");

    });

}