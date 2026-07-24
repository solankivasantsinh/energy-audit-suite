// ==========================================
// REPORT MODULE
// ==========================================

// Current Project
const currentProjectId = localStorage.getItem("currentProjectId");

// ==========================================
// LOAD REPORT
// ==========================================

window.addEventListener("load", function () {

    loadProjectInfo();

    loadChillerTable();

    loadOperatingData();

    loadCalculationResults();

});

// ==========================================
// PROJECT INFORMATION
// ==========================================

function loadProjectInfo() {

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    const project = projects.find(

        p => p.id === currentProjectId

    );

    if (!project) return;

    document.getElementById("projectId").innerText = project.id;

    document.getElementById("company").innerText = project.company;

    document.getElementById("plant").innerText = project.plant;

    document.getElementById("contact").innerText = project.contact;

    document.getElementById("reportDate").innerText =
        new Date().toLocaleDateString();

}

// ==========================================
// CHILLER TABLE
// ==========================================

function loadChillerTable() {

    const table = document.getElementById("chillerTable");

    if (!table) return;

    table.innerHTML = "";

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    chillers.forEach(chiller => {

        if (chiller.projectId === currentProjectId) {

            table.innerHTML += `

                <tr>

                    <td>${chiller.id}</td>

                    <td>${chiller.chillerName}</td>

                    <td>${chiller.capacity}</td>

                    <td>${chiller.type}</td>

                    <td>${chiller.make}</td>

                    <td>${chiller.model}</td>

                </tr>

            `;

        }

    });

}
// ==========================================
// LOAD OPERATING DATA
// ==========================================

function loadOperatingData() {

    const table = document.getElementById("operatingTable");

    if (!table) return;

    table.innerHTML = "";

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    readings.forEach(reading => {

        if (reading.projectId === currentProjectId) {

            table.innerHTML += `

            <tr>

                <td>${reading.date}</td>

                <td>${reading.time}</td>

                <td>${reading.power}</td>

                <td>${reading.chwIn}</td>

                <td>${reading.chwOut}</td>

                <td>${reading.chwFlow}</td>

                <td>${reading.loadPercent}</td>

            </tr>

            `;

        }

    });

}

// ==========================================
// LOAD CALCULATION RESULTS
// ==========================================

function loadCalculationResults() {

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    const reading = readings.find(

        r => r.projectId === currentProjectId

    );

    if (!reading) return;

    const power = Number(reading.power);
    const chwIn = Number(reading.chwIn);
    const chwOut = Number(reading.chwOut);
    const flow = Number(reading.chwFlow);

    const deltaT = chwIn - chwOut;

    const actualTR = (flow * deltaT) / 211;

    const kwPerTR = power / actualTR;

    const cop = 3.517 / kwPerTR;

    document.getElementById("deltaT").value =
        deltaT.toFixed(2);

    document.getElementById("actualTR").value =
        actualTR.toFixed(2);

    document.getElementById("kwPerTR").value =
        kwPerTR.toFixed(3);

    document.getElementById("cop").value =
        cop.toFixed(2);

    // ===============================
    // Performance Rating
    // ===============================

    let performance = "";
    let recommendation = "";
    let status = "";

    if (kwPerTR <= 0.60) {

        performance = "Excellent";
        recommendation = "No Action Required";
        status = "Healthy";

    }

    else if (kwPerTR <= 0.75) {

        performance = "Good";
        recommendation = "Routine Maintenance";
        status = "Good";

    }

    else if (kwPerTR <= 0.90) {

        performance = "Average";
        recommendation = "Energy Audit Recommended";
        status = "Needs Attention";

    }

    else {

        performance = "Poor";
        recommendation = "Immediate Optimization Required";
        status = "Critical";

    }

    document.getElementById("performance").value =
        performance;

    document.getElementById("recommendation").value =
        recommendation;

    document.getElementById("status").value =
        status;

}