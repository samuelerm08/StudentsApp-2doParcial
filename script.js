const urlBase = "https://localhost:5001/api/student/";
const idInput = document.getElementById('idInput');
const firstNameValue = document.getElementById('firstNameInput');
const lastNameValue = document.getElementById('lastNameInput');
const addressValue = document.getElementById('address');
const gradeValue = document.getElementById('grade');
const dniValue = document.getElementById('DNI');
const bornDateValue = document.getElementById('bornDate');

function GetAllStudents() {
    fetch(`${urlBase}GetAllStudents`)
        .then(response => response.json())
        .then(json => Fill(json));
}
function GetStudentById(id) {
    fetch(`${urlBase}GetStudentById/${id}`)
        .then(response => response.json())
        .then(json => FillById(json));
}
function InsertStudent() {
    fetch(`${urlBase}InsertStudent`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            firstName: firstNameValue.value,
            lastName: lastNameValue.value,
            address: addressValue.value,
            grade: parseInt(gradeValue.value),
            dni: parseInt(dniValue.value),
            bornDate: bornDateValue.value
        })
    }).then(response => response.json())
    alert("Student Created");
}
function UpdateStudents() {
    fetch(`${urlBase}UpdateStudent/${idInput.value}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            studentId: parseInt(idInput.value),
            firstName: firstNameValue.value,
            lastName: lastNameValue.value,
            address: addressValue.value,
            grade: parseInt(gradeValue.value),
            dni: parseInt(dniValue.value),
            bornDate: bornDateValue.value
        })
    }).then(response => response.json())
        .then(json => console.log(json));
    alert("Student Updated");
}
function DeleteStudent(id) {
    fetch(`${urlBase}DeleteStudent/${id}`, {
        method: "DELETE"
    });
    alert("Student Deleted");
    window.location.reload();    
}

//RENDER METHODS
//FILL ENTIRE TABLE
function Fill(response) {
    let tableFill = document.getElementById('tbod');
    response.map(item => {
        row = `
        <tr>
            <td> ${item.studentId}</td>
            <td> ${item.firstName}</td>
            <td> ${item.lastName}</td>
            <td> ${item.address}</td>
            <td> ${item.grade}</td>
            <td> ${item.dni}</td>
            <td> ${item.bornDate}</td>
            <td class="buttons">    
            <a class="btn btn-primary" onClick="GetStudentById(${item.studentId})">Details</a>
            <a href="editStudent.html" class="btn btn-warning">Edit</a>
            <a class="btn btn-danger" onClick="DeleteStudent(${item.studentId})">Delete</a>
            </td>
        </tr>
        `;
        tableFill.innerHTML += row;
    });
}
//FILL BY ID
function FillById(response) {
    let table = document.getElementById('table-container');
    let detailView = document.getElementById('detailView');
    table.style.display = "none";
    detailView.style.display = "block";
    let detailContent = `
    <h3>Student Detail</h3>
    <hr />
    <dl class="row">

        <dt class="col-sm-2">
            ID
        </dt>

        <dd class="col-sm-10">
            ${response.studentId}
        </dd>

        <dt class="col-sm-2">
            First Name
        </dt>
        <dd class="col-sm-10">
        ${response.firstName}
        </dd>

        <dt class="col-sm-2">
            Last Name
        </dt>

        <dd class="col-sm-10">
        ${response.lastName}
        </dd>

        <dt class="col-sm-2">
            Address
        </dt>

        <dd class="col-sm-10">
        ${response.address}
        </dd>

        <dt class="col-sm-2">
            Grade
        </dt>

        <dd class="col-sm-10">
        ${response.grade}
        </dd>

        <dt class="col-sm-2">
            DNI
        </dt>

        <dd class="col-sm-10">
            ${response.dni}
        </dd>

        <dt class="col-sm-2">
            Born Date
        </dt>

        <dd class="col-sm-10">
        ${response.bornDate}
        </dd>       
    </dl>
    <a href="index.html" class="btn btn-warning" style="font-weight: bold;">Back to Index</a>`;

    detailView.innerHTML = detailContent;
}