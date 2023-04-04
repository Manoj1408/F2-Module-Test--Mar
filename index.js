let form = document.getElementById("student-form");
let nameInput = document.getElementById("name");
let email = document.getElementById("email");
let gpa = document.getElementById("gpa");
let age = document.getElementById("age");
let degree = document.getElementById("degree");

const table = document.getElementById("student-table");

const header = table.createTHead();
const row = header.insertRow();

let students = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveData();
});

let saveData = () => {
  let student = {
    ID: students.length + 1,
    Name: nameInput.value,
    Email: email.value,
    GPA: gpa.value,
    Age: age.value,
    Degree: degree.value,
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  nameInput.value = "";
  email.value = "";
  gpa.value = "";
  age.value = "";
  degree.value = "";
  showData();
  console.log(students);
};

let showData = () => {
  let tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    let row = tbody.insertRow();
    row.insertCell().textContent = index + 1;
    row.insertCell().textContent = student.Name;
    row.insertCell().textContent = student.Email;
    row.insertCell().textContent = student.Age;
    row.insertCell().textContent = student.GPA;
    // row.insertCell().textContent = student.Degree;
    let degreeCell = row.insertCell();
    let degreeText = document.createTextNode(student.Degree + " ");
    degreeCell.appendChild(degreeText);

    let pencilIcon = document.createElement("i");
    pencilIcon.classList.add("fa", "fa-pencil", "edit-icon");
    pencilIcon.addEventListener("click", () => editData(student.ID));
    degreeCell.appendChild(pencilIcon);

    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa", "fa-trash", "delete-icon");
    trashIcon.addEventListener("click", () => deleteData(student.ID));
    degreeCell.appendChild(trashIcon);
  });
};



function editData(id) {
  const student = students.find((student) => student.ID == id);
  nameInput.value = student.Name;
  email.value = student.Email;
  gpa.value = student.GPA;
  age.value = student.Age;
  degree.value = student.Degree;

  addButton.style.display = "none";
  updateButton.style.display = "inline-block";
  updateButton.setAttribute("data-id", id);
  updateButton.onclick = function () {
    updateStudent(id);
  };
}

function updateStudent(id) {
  const studentIndex = students.findIndex((student) => student.ID == id);
  students[studentIndex].Name = nameInput.value;
  students[studentIndex].Email = email.value;
  students[studentIndex].GPA = gpa.value;
  students[studentIndex].Age = age.value;
  students[studentIndex].Degree = degree.value;

  localStorage.setItem("students", JSON.stringify(students));
  nameInput.value = "";
  email.value = "";
  gpa.value = "";
  age.value = "";
  degree.value = "";
  updateButton.style.display = "none";
  addButton.style.display = "inline-block";
  showData();
}

let deleteData = (id) => {
  students = students.filter((student) => student.ID !== id);
  localStorage.setItem("students", JSON.stringify(students));
  showData();
};

const searchBox = document.getElementById("search-box");

searchBox.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredStudents = students.filter(
    (student) =>
      student.Name.toLowerCase().includes(searchString) ||
      student.Email.toLowerCase().includes(searchString) ||
      student.Degree.toLowerCase().includes(searchString)
  );

  
  let tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  // Add filtered students to the table
  filteredStudents.forEach((student, index) => {
    let row = tbody.insertRow();
    row.insertCell().textContent = index + 1;
    row.insertCell().textContent = student.Name;
    row.insertCell().textContent = student.Email;
    row.insertCell().textContent = student.Age;
    row.insertCell().textContent = student.GPA;
    let degreeCell = row.insertCell();
    let degreeText = document.createTextNode(student.Degree + " ");
    degreeCell.appendChild(degreeText);
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-pencil", "edit-icon");
    editIcon.addEventListener("click", () => editData(student.ID));
    degreeCell.appendChild(editIcon);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "delete-icon");
    deleteIcon.addEventListener("click", () => deleteData(student.ID));
    degreeCell.appendChild(deleteIcon);
  });
});








