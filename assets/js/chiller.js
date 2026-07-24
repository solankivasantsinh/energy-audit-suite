// =========================================
// CHILLER MODULE
// =========================================

// Current Project
const currentProjectId = localStorage.getItem("currentProjectId");

// Edit Index
let editIndex = -1;

// Save Button
const saveBtn = document.getElementById("saveChiller");

// =========================================
// SAVE / UPDATE
// =========================================

if (saveBtn) {

    saveBtn.addEventListener("click", saveChiller);

}

function saveChiller() {

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    const chiller = {

        id: editIndex === -1
            ? generateChillerId()
            : (chillers[editIndex].id || generateChillerId()),

        projectId: currentProjectId,

        chillerName: document.getElementById("chillerName").value.trim(),

        capacity: document.getElementById("capacity").value,

        type: document.getElementById("type").value,

        make: document.getElementById("make").value.trim(),

        model: document.getElementById("model").value.trim(),

        quantity: document.getElementById("qty").value,

        refrigerant: document.getElementById("refrigerant").value,

        compressorType: document.getElementById("compressorType").value,

        installationYear: document.getElementById("installationYear").value,

        ratedPower: document.getElementById("ratedPower").value,

        ratedFlow: document.getElementById("ratedFlow").value,

        designCOP: document.getElementById("designCOP").value

    };

    // =====================================
    // VALIDATION
    // =====================================

    if (chiller.chillerName === "") {

        alert("Please Enter Chiller Name");

        return;

    }

    if (chiller.capacity === "") {

        alert("Please Enter Capacity");

        return;

    }

    if (chiller.type === "") {

        alert("Please Select Chiller Type");

        return;

    }

    if (chiller.make === "") {

        alert("Please Enter Make");

        return;

    }

    if (chiller.quantity === "") {

        alert("Please Enter Quantity");

        return;

    }

    // =====================================
    // DUPLICATE CHECK
    // =====================================

    const duplicate = chillers.find((item, index) =>

        index !== editIndex &&
        item.projectId === currentProjectId &&
        item.chillerName.toLowerCase() === chiller.chillerName.toLowerCase()

    );

    if (duplicate) {

        alert("Chiller already exists.");

        return;

    }

    // =====================================
    // SAVE / UPDATE
    // =====================================

    if (editIndex === -1) {

        chillers.push(chiller);

        alert("Chiller Saved Successfully");

    } else {

        chillers[editIndex] = chiller;

        alert("Chiller Updated Successfully");

    }

    localStorage.setItem("chillers", JSON.stringify(chillers));

    clearForm();

    loadChillers();

}

// =========================================
// LOAD TABLE
// =========================================

function loadChillers() {

    const table = document.getElementById("chillerTable");

    if (!table) return;

    table.innerHTML = "";

    let totalChillers = 0;

    let totalCapacity = 0;

    const search = document
        .getElementById("searchChiller")
        ?.value
        .toLowerCase() || "";

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    chillers.forEach((chiller, index) => {

        if (!chiller.id) {

            chiller.id = generateChillerId();

        }

        const id = chiller.id.toLowerCase();

        if (

            chiller.projectId === currentProjectId &&

            (

                chiller.chillerName.toLowerCase().includes(search)

                ||

                chiller.make.toLowerCase().includes(search)

                ||

                chiller.model.toLowerCase().includes(search)

                ||

                chiller.type.toLowerCase().includes(search)

                ||

                id.includes(search)

            )

        ) {

            totalChillers++;

            totalCapacity += Number(chiller.capacity);

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

        }

    });

    localStorage.setItem("chillers", JSON.stringify(chillers));

    document.getElementById("totalChillers").innerText = totalChillers;

    document.getElementById("totalCapacity").innerText = totalCapacity;

}
// =========================================
// EDIT CHILLER
// =========================================

function editChiller(index) {

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    const chiller = chillers[index];

    document.getElementById("chillerName").value = chiller.chillerName;
    document.getElementById("capacity").value = chiller.capacity;
    document.getElementById("type").value = chiller.type;
    document.getElementById("make").value = chiller.make;
    document.getElementById("model").value = chiller.model;
    document.getElementById("qty").value = chiller.quantity;

    document.getElementById("refrigerant").value = chiller.refrigerant || "";
    document.getElementById("compressorType").value = chiller.compressorType || "";
    document.getElementById("installationYear").value = chiller.installationYear || "";
    document.getElementById("ratedPower").value = chiller.ratedPower || "";
    document.getElementById("ratedFlow").value = chiller.ratedFlow || "";
    document.getElementById("designCOP").value = chiller.designCOP || "";

    editIndex = index;

    saveBtn.innerText = "Update Chiller";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// =========================================
// DELETE CHILLER
// =========================================

function deleteChiller(index) {

    if (!confirm("Are you sure you want to delete this chiller?")) {

        return;

    }

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

    chillers.splice(index, 1);

    localStorage.setItem("chillers", JSON.stringify(chillers));

    loadChillers();

}

// =========================================
// CLEAR FORM
// =========================================

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

// =========================================
// GENERATE CHILLER ID
// =========================================

function generateChillerId() {

    let chillers = JSON.parse(localStorage.getItem("chillers")) || [];

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

// =========================================
// INITIAL LOAD
// =========================================

loadChillers();

// =========================================
// SEARCH
// =========================================

const searchBox = document.getElementById("searchChiller");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        loadChillers();

    });

}