// =============================================
// Energy Audit Suite
// Chiller Module v2.0
// =============================================

// =============================================
// GLOBAL VARIABLES
// =============================================

const currentProjectId = getCurrentProjectId();

let editIndex = -1;

const saveBtn = document.getElementById("saveChiller");

// =============================================
// INITIALIZE
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    if (!currentProjectId) {

        alert("Please create or open a project first.");

        window.location.href = "dashboard.html";

        return;

    }

    loadChillers();

});

// =============================================
// SAVE BUTTON
// =============================================

if (saveBtn) {

    saveBtn.addEventListener("click", saveChiller);

}

// =============================================
// SAVE / UPDATE CHILLER
// =============================================

function saveChiller() {

    let chillers = getChillers();

    const chiller = {

        id:
            editIndex === -1
            ? generateChillerId()
            : chillers[editIndex].id,

        projectId: currentProjectId,

        chillerName:
            document.getElementById("chillerName").value.trim(),

        capacity:
            Number(document.getElementById("capacity").value),

        type:
            document.getElementById("type").value,

        make:
            document.getElementById("make").value.trim(),

        model:
            document.getElementById("model").value.trim(),

        quantity:
            Number(document.getElementById("qty").value),

        refrigerant:
            document.getElementById("refrigerant").value,

        compressorType:
            document.getElementById("compressorType").value,

        installationYear:
            document.getElementById("installationYear").value,

        ratedPower:
            Number(document.getElementById("ratedPower").value),

        ratedFlow:
            Number(document.getElementById("ratedFlow").value),

        designCOP:
            Number(document.getElementById("designCOP").value)

    };

    // =========================================
    // VALIDATION
    // =========================================

    if (chiller.chillerName === "") {

        alert("Please enter Chiller Name.");

        return;

    }

    if (!chiller.capacity || chiller.capacity <= 0) {

        alert("Please enter valid Capacity.");

        return;

    }

    if (chiller.type === "") {

        alert("Please select Chiller Type.");

        return;

    }

    if (chiller.make === "") {

        alert("Please enter Chiller Make.");

        return;

    }

    if (!chiller.quantity || chiller.quantity <= 0) {

        alert("Please enter Quantity.");

        return;

    }

    // =========================================
    // DUPLICATE CHECK
    // =========================================

    const duplicate = chillers.find((item, index) =>

        index !== editIndex &&
        item.projectId === currentProjectId &&
        item.chillerName.toLowerCase() === chiller.chillerName.toLowerCase()

    );

    if (duplicate) {

        alert("Chiller already exists.");

        return;

    }

    // =========================================
    // SAVE / UPDATE
    // =========================================

    if (editIndex === -1) {

        chillers.push(chiller);

        alert("Chiller Saved Successfully.");

    }

    else {

        chillers[editIndex] = chiller;

        alert("Chiller Updated Successfully.");

    }

    updateChillers(chillers);

    clearForm();

    loadChillers();

}
// =============================================
// LOAD CHILLERS
// =============================================

function loadChillers() {

    const table = document.getElementById("chillerTable");

    if (!table) return;

    table.innerHTML = "";

    let totalChillers = 0;
    let totalCapacity = 0;

    const searchText =
        document.getElementById("searchChiller")
        ?.value
        .trim()
        .toLowerCase() || "";

    const chillers = getChillers();

    chillers.forEach((chiller, index) => {

        if (chiller.projectId !== currentProjectId) return;

        const searchString = `
            ${chiller.id}
            ${chiller.chillerName}
            ${chiller.make}
            ${chiller.model}
            ${chiller.type}
        `.toLowerCase();

        if (!searchString.includes(searchText)) return;

        totalChillers += Number(chiller.quantity || 1);

        totalCapacity += Number(chiller.capacity || 0);

        table.innerHTML += `

<tr>

<td>${chiller.id}</td>

<td>${chiller.chillerName}</td>

<td>${chiller.capacity}</td>

<td>${chiller.type}</td>

<td>${chiller.make}</td>

<td>${chiller.model}</td>

<td>${chiller.quantity}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="editChiller(${index})">

Edit

</button>

<button
class="btn btn-danger btn-sm"
onclick="deleteChiller(${index})">

Delete

</button>

</td>

</tr>

`;

    });

    document.getElementById("totalChillers").innerText = totalChillers;

    document.getElementById("totalCapacity").innerText = totalCapacity;

}

// =============================================
// SEARCH
// =============================================

const searchBox = document.getElementById("searchChiller");

if (searchBox) {

    searchBox.addEventListener("keyup", loadChillers);

}

// =============================================
// EDIT CHILLER
// =============================================

function editChiller(index) {

    const chillers = getChillers();

    const chiller = chillers[index];

    if (!chiller) return;

    document.getElementById("chillerName").value = chiller.chillerName;
    document.getElementById("capacity").value = chiller.capacity;
    document.getElementById("type").value = chiller.type;
    document.getElementById("make").value = chiller.make;
    document.getElementById("model").value = chiller.model;
    document.getElementById("qty").value = chiller.quantity;

    document.getElementById("refrigerant").value =
        chiller.refrigerant || "";

    document.getElementById("compressorType").value =
        chiller.compressorType || "";

    document.getElementById("installationYear").value =
        chiller.installationYear || "";

    document.getElementById("ratedPower").value =
        chiller.ratedPower || "";

    document.getElementById("ratedFlow").value =
        chiller.ratedFlow || "";

    document.getElementById("designCOP").value =
        chiller.designCOP || "";

    editIndex = index;

    saveBtn.innerText = "Update Chiller";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// =============================================
// DELETE CHILLER
// =============================================

function deleteChiller(index) {

    if (!confirm("Are you sure you want to delete this chiller?")) {

        return;

    }

    let chillers = getChillers();

    chillers.splice(index, 1);

    updateChillers(chillers);

    loadChillers();

}

// =============================================
// CLEAR FORM
// =============================================

function clearForm() {

    document.getElementById("chillerName").value = "";
    document.getElementById("capacity").value = "";
    document.getElementById("type").selectedIndex = 0;
    document.getElementById("make").value = "";
    document.getElementById("model").value = "";
    document.getElementById("qty").value = "";

    document.getElementById("refrigerant").selectedIndex = 0;
    document.getElementById("compressorType").selectedIndex = 0;
    document.getElementById("installationYear").value = "";
    document.getElementById("ratedPower").value = "";
    document.getElementById("ratedFlow").value = "";
    document.getElementById("designCOP").value = "";

    editIndex = -1;

    saveBtn.innerText = "Save Chiller";

}

// =============================================
// GENERATE CHILLER ID
// =============================================

function generateChillerId() {

    const chillers = getChillers();

    const projectChillers = chillers.filter(

        c => c.projectId === currentProjectId

    );

    let nextNumber = projectChillers.length + 1;

    let id = "CH-" + String(nextNumber).padStart(3, "0");

    while (projectChillers.some(c => c.id === id)) {

        nextNumber++;

        id = "CH-" + String(nextNumber).padStart(3, "0");

    }

    return id;

}

// =============================================
// REFRESH AFTER PAGE LOAD
// =============================================

window.addEventListener("focus", function () {

    loadChillers();

});

// =============================================
// END OF MODULE
// =============================================