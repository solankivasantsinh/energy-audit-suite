// ==========================================
// CALCULATION ENGINE
// ==========================================

// Current Project

const currentProjectId = localStorage.getItem("currentProjectId");

// ==========================================
// LOAD READING DROPDOWN
// ==========================================

function loadReadingDropdown() {

    const dropdown = document.getElementById("readingId");

    if (!dropdown) return;

    dropdown.innerHTML = `
        <option value="">
            Select Reading
        </option>
    `;

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    readings.forEach(reading => {

        if (reading.projectId === currentProjectId) {

            const chiller = chillers.find(

                c => c.id === reading.chillerId

            );

            let chillerName = reading.chillerId;

            if (chiller) {

                chillerName = `${chiller.id} | ${chiller.chillerName}`;

            }

            dropdown.innerHTML += `

                <option value="${reading.id}">

                    ${reading.id} | ${chillerName} | ${reading.date}

                </option>

            `;

        }

    });

}

// ==========================================
// LOAD SELECTED READING
// ==========================================

const loadBtn = document.getElementById("loadReading");

if (loadBtn) {

    loadBtn.addEventListener("click", loadSelectedReading);

}

function loadSelectedReading() {

    const readingId = document.getElementById("readingId").value;

    if (readingId === "") {

        alert("Please Select Reading");

        return;

    }

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    const reading = readings.find(

        r => r.id === readingId

    );

    if (!reading) {

        alert("Reading Not Found");

        return;

    }

    // ===========================
    // Measured Data
    // ===========================

    document.getElementById("power").value = reading.power;

    document.getElementById("chwIn").value = reading.chwIn;

    document.getElementById("chwOut").value = reading.chwOut;

    document.getElementById("chwFlow").value = reading.chwFlow;

    document.getElementById("cwIn").value = reading.cwIn;

    document.getElementById("cwOut").value = reading.cwOut;

    document.getElementById("cwFlow").value = reading.cwFlow;

}

// ==========================================
// INITIAL LOAD
// ==========================================

loadReadingDropdown();
// ==========================================
// CALCULATE BUTTON
// ==========================================

const calculateBtn = document.getElementById("calculateBtn");

if (calculateBtn) {

    calculateBtn.addEventListener("click", calculateResults);

}

// ==========================================
// CALCULATE RESULTS
// ==========================================

function calculateResults() {

    const power = Number(document.getElementById("power").value);

    const chwIn = Number(document.getElementById("chwIn").value);

    const chwOut = Number(document.getElementById("chwOut").value);

    const chwFlow = Number(document.getElementById("chwFlow").value);

    if (power <= 0 || chwFlow <= 0) {

        alert("Please Load Valid Operating Reading");

        return;

    }

    // =====================================
    // Delta T
    // =====================================

    const deltaT = calculateDeltaT(chwIn, chwOut);

    // =====================================
    // Actual TR
    // =====================================

    const actualTR = calculateTR(chwFlow, deltaT);

    // =====================================
    // kW/TR
    // =====================================

    const kwPerTR = calculateKWTR(power, actualTR);

    // =====================================
    // COP
    // =====================================

    const cop = calculateCOP(kwPerTR);

    // =====================================
    // Display Result
    // =====================================

    document.getElementById("deltaT").value =
        deltaT.toFixed(2);

    document.getElementById("actualTR").value =
        actualTR.toFixed(2);

    document.getElementById("kwPerTR").value =
        kwPerTR.toFixed(3);

    document.getElementById("cop").value =
        cop.toFixed(2);

    calculatePerformance(kwPerTR);

}
// ==========================================
// DELTA T
// ==========================================

function calculateDeltaT(inlet, outlet) {

    return inlet - outlet;

}

// ==========================================
// ACTUAL TR
// Formula:
// TR = Flow(LPM) × ΔT / 211
// ==========================================

function calculateTR(flow, deltaT) {

    return (flow * deltaT) / 211;

}

// ==========================================
// kW/TR
// ==========================================

function calculateKWTR(power, tr) {

    return power / tr;

}

// ==========================================
// COP
// ==========================================

function calculateCOP(kwtr) {

    return 3.517 / kwtr;

}
// ==========================================
// PERFORMANCE
// ==========================================

function calculatePerformance(kwtr) {

    let performance = "";

    let recommendation = "";

    let status = "";

    if (kwtr <= 0.60) {

        performance = "Excellent";

        recommendation = "No Action Required";

        status = "Healthy";

    }

    else if (kwtr <= 0.75) {

        performance = "Good";

        recommendation = "Routine Maintenance";

        status = "Good";

    }

    else if (kwtr <= 0.90) {

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
