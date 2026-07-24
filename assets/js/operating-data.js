// ==========================================
// OPERATING DATA MODULE
// ==========================================

// Current Project
const currentProjectId = localStorage.getItem("currentProjectId");

// ==========================================
// LOAD CHILLER DROPDOWN
// ==========================================

function loadChillers() {

    const dropdown = document.getElementById("chillerId");

    if (!dropdown) return;

    // Default Option
    dropdown.innerHTML = `
        <option value="">
            Select Chiller
        </option>
    `;

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    chillers.forEach(chiller => {

        if (chiller.projectId === currentProjectId) {

            dropdown.innerHTML += `

                <option value="${chiller.id}">

                    ${chiller.id} | ${chiller.chillerName} | ${chiller.capacity} TR

                </option>

            `;

        }

    });

}

// ==========================================
// INITIAL LOAD
// ==========================================

loadChillers();
// ==========================================
// SAVE READING
// ==========================================

const saveBtn = document.getElementById("saveReading");

let editIndex = -1;

if (saveBtn) {

    saveBtn.addEventListener("click", saveReading);

}

function saveReading() {

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    const reading = {

        id: editIndex === -1
            ? generateReadingId()
            : readings[editIndex].id,

        projectId: currentProjectId,

        chillerId: document.getElementById("chillerId").value,

        date: document.getElementById("readingDate").value,

        time: document.getElementById("readingTime").value,

        status: document.getElementById("runningStatus").value,

        loadPercent: document.getElementById("loadPercent").value,

        chwIn: document.getElementById("chwIn").value,

        chwOut: document.getElementById("chwOut").value,

        chwFlow: document.getElementById("chwFlow").value,

        cwIn: document.getElementById("cwIn").value,

        cwOut: document.getElementById("cwOut").value,

        cwFlow: document.getElementById("cwFlow").value,

        power: document.getElementById("power").value,

        voltage: document.getElementById("voltage").value,

        current: document.getElementById("current").value,

        pf: document.getElementById("pf").value,

        ambient: document.getElementById("ambient").value,

        remarks: document.getElementById("remarks").value

    };

    // ==========================
    // Validation
    // ==========================

    if (reading.chillerId === "") {

        alert("Please Select Chiller");

        return;

    }

    if (reading.date === "") {

        alert("Please Select Date");

        return;

    }

    if (reading.power === "") {

        alert("Please Enter Power");

        return;

    }

    if (editIndex === -1) {

        readings.push(reading);

        alert("Reading Saved Successfully");

    } else {

        readings[editIndex] = reading;

        alert("Reading Updated Successfully");

    }

    localStorage.setItem("operatingData", JSON.stringify(readings));

    clearForm();

    loadReadings();

}
// ==========================================
// GENERATE READING ID
// ==========================================

function generateReadingId() {

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    const projectReadings = readings.filter(

        r => r.projectId === currentProjectId

    );

    let nextNumber = projectReadings.length + 1;

    return "OP-" + String(nextNumber).padStart(3, "0");

}
// ==========================================
// LOAD READINGS
// ==========================================

function loadReadings() {

    const table = document.getElementById("readingTable");

    if (!table) return;

    table.innerHTML = "";

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];
    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    readings.forEach((reading, index) => {

        if (reading.projectId === currentProjectId) {

            const chiller = chillers.find(c => c.id === reading.chillerId);

            const chillerName = chiller
                ? `${chiller.id} | ${chiller.chillerName}`
                : reading.chillerId;

            table.innerHTML += `

            <tr>

                <td>${chillerName}</td>

                <td>${reading.date}</td>

                <td>${reading.time}</td>

                <td>${reading.power}</td>

                <td>${reading.chwIn}</td>

                <td>${reading.chwOut}</td>

                <td>${reading.status}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editReading(${index})">

                        Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteReading(${index})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        }

    });

}
// ==========================================
// EDIT READING
// ==========================================

function editReading(index) {

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    const r = readings[index];

    document.getElementById("chillerId").value = r.chillerId;
    document.getElementById("readingDate").value = r.date;
    document.getElementById("readingTime").value = r.time;
    document.getElementById("runningStatus").value = r.status;

    document.getElementById("loadPercent").value = r.loadPercent;

    document.getElementById("chwIn").value = r.chwIn;
    document.getElementById("chwOut").value = r.chwOut;
    document.getElementById("chwFlow").value = r.chwFlow;

    document.getElementById("cwIn").value = r.cwIn;
    document.getElementById("cwOut").value = r.cwOut;
    document.getElementById("cwFlow").value = r.cwFlow;

    document.getElementById("power").value = r.power;
    document.getElementById("voltage").value = r.voltage;
    document.getElementById("current").value = r.current;
    document.getElementById("pf").value = r.pf;

    document.getElementById("ambient").value = r.ambient;
    document.getElementById("remarks").value = r.remarks;

    editIndex = index;

    saveBtn.innerText = "Update Reading";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// ==========================================
// DELETE READING
// ==========================================

function deleteReading(index) {

    if (!confirm("Delete this reading?")) {

        return;

    }

    let readings = JSON.parse(localStorage.getItem("operatingData")) || [];

    readings.splice(index, 1);

    localStorage.setItem(

        "operatingData",

        JSON.stringify(readings)

    );

    loadReadings();

}
// ==========================================
// CLEAR FORM
// ==========================================

function clearForm() {

    document.getElementById("chillerId").selectedIndex = 0;

    document.getElementById("readingDate").value = "";
    document.getElementById("readingTime").value = "";

    document.getElementById("runningStatus").selectedIndex = 0;

    document.getElementById("loadPercent").value = "";

    document.getElementById("chwIn").value = "";
    document.getElementById("chwOut").value = "";
    document.getElementById("chwFlow").value = "";

    document.getElementById("cwIn").value = "";
    document.getElementById("cwOut").value = "";
    document.getElementById("cwFlow").value = "";

    document.getElementById("power").value = "";
    document.getElementById("voltage").value = "";
    document.getElementById("current").value = "";
    document.getElementById("pf").value = "";

    document.getElementById("ambient").value = "";
    document.getElementById("remarks").value = "";

    editIndex = -1;

    saveBtn.innerText = "Save Reading";

}
// ==========================================
// INITIAL LOAD
// ==========================================

loadReadings();