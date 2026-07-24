// =============================================
// Energy Audit Suite Storage Manager v2.0
// =============================================

// ---------------------------------------------
// Generic Storage Functions
// ---------------------------------------------

function getData(key) {

    return JSON.parse(localStorage.getItem(key)) || [];

}

function saveData(key, data) {

    localStorage.setItem(key, JSON.stringify(data));

}

// ---------------------------------------------
// Current Project
// ---------------------------------------------

function getCurrentProjectId() {

    return localStorage.getItem("currentProjectId");

}

function setCurrentProjectId(projectId) {

    localStorage.setItem("currentProjectId", projectId);

}

// ---------------------------------------------
// Project Functions
// ---------------------------------------------

function getProjects() {

    return getData("projects");

}

function saveProject(project) {

    let projects = getProjects();

    projects.push(project);

    saveData("projects", projects);

}

function updateProjects(projects) {

    saveData("projects", projects);

}

function generateProjectId() {

    let number = getProjects().length + 1;

    return "EAS-2026-" + String(number).padStart(4, "0");

}
// =============================================
// Customer Functions
// =============================================

function getCustomers() {

    return getData("customers");

}

function saveCustomer(customer) {

    let customers = getCustomers();

    customers.push(customer);

    saveData("customers", customers);

}

// =============================================
// Chiller Functions
// =============================================

function getChillers() {

    return getData("chillers");

}

function saveChiller(chiller) {

    let chillers = getChillers();

    chillers.push(chiller);

    saveData("chillers", chillers);

}

// =============================================
// Operating Data Functions
// =============================================

function getOperatingData() {

    return getData("operatingData");

}

function saveOperatingData(data) {

    let operatingData = getOperatingData();

    operatingData.push(data);

    saveData("operatingData", operatingData);

}

// =============================================
// Calculation Functions
// =============================================

function getCalculations() {

    return getData("calculations");

}

function saveCalculation(calculation) {

    let calculations = getCalculations();

    calculations.push(calculation);

    saveData("calculations", calculations);

}

// =============================================
// Report Functions
// =============================================

function getReports() {

    return getData("reports");

}

function saveReport(report) {

    let reports = getReports();

    reports.push(report);

    saveData("reports", reports);

}
// =============================================
// Backup & Restore Functions
// =============================================

// Export Complete Database
function exportDatabase() {

    const backup = {

        projects: getProjects(),
        customers: getCustomers(),
        chillers: getChillers(),
        operatingData: getOperatingData(),
        calculations: getCalculations(),
        reports: getReports(),
        exportDate: new Date().toLocaleString()

    };

    const data = JSON.stringify(backup, null, 2);

    const blob = new Blob([data], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "EnergyAuditSuite_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

}

// Import Complete Database
function importDatabase(jsonData) {

    saveData("projects", jsonData.projects || []);

    saveData("customers", jsonData.customers || []);

    saveData("chillers", jsonData.chillers || []);

    saveData("operatingData", jsonData.operatingData || []);

    saveData("calculations", jsonData.calculations || []);

    saveData("reports", jsonData.reports || []);

}

// Clear Database
function clearDatabase() {

    if (!confirm("Delete complete database?")) return;

    localStorage.clear();

    alert("Database Cleared Successfully");

    location.reload();

}
