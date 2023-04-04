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

// let editData = (id) => {
//   let student = students.find((s) => s.ID == id);

//   // Populate form fields with data of selected row
//   nameInput.value = student.Name;
//   email.value = student.Email;
//   gpa.value = student.GPA;
//   age.value = student.Age;
//   degree.value = student.Degree;

//   // Change submit button to update button
//   addButton.style.display = "none";
//   updateButton.style.display = "inline-block";
//   updateButton.dataset.id = id;
// };

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

  // Remove all existing rows from the table
  // while (tbody.firstChild) {
  //   tbody.removeChild(tbody.firstChild);
  // }
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

// const searchBox = document.getElementById("search-box");

// searchBox.addEventListener("input", (e) => {
//   const searchString = e.target.value.toLowerCase();
//   console.log(searchString)
//   const filteredStudents = students.filter(
//     (student) =>
//       student.Name.toLowerCase().includes(searchString) ||
//       student.Email.toLowerCase().includes(searchString) ||
//       student.Degree.toLowerCase().includes(searchString)
//   );
//   filteredStudents.forEach((student, index) => {
//     let row = tbody.insertRow();
//     row.insertCell().textContent = index + 1;
//     row.insertCell().textContent = student.Name;
//     row.insertCell().textContent = student.Email;
//     row.insertCell().textContent = student.Age;
//     row.insertCell().textContent = student.GPA;
//     // row.insertCell().textContent = student.Degree;
//     let degreeCell = row.insertCell();
//     let degreeText = document.createTextNode(student.Degree + " ");
//     degreeCell.appendChild(degreeText);

//     let pencilIcon = document.createElement("i");
//     pencilIcon.classList.add("fa", "fa-pencil", "edit-icon");
//     pencilIcon.addEventListener("click", () => editData(student.ID));
//     degreeCell.appendChild(pencilIcon);

//     let trashIcon = document.createElement("i");
//     trashIcon.classList.add("fa", "fa-trash", "delete-icon");
//     trashIcon.addEventListener("click", () => deleteData(student.ID));
//     degreeCell.appendChild(trashIcon);
//   });
// });

// let searchBox = document.getElementById("search-box");

// searchBox.addEventListener("input", () => {
//   let searchValue = searchBox.value.toLowerCase();
//   let filteredStudents = [];

//   students.forEach((student) => {
//     if (
//       student.Name.toLowerCase().includes(searchValue) ||
//       student.Email.toLowerCase().includes(searchValue) ||
//       student.Degree.toLowerCase().includes(searchValue)
//     ) {
//       filteredStudents.push(student);
//     }
//   });

//   clearTable();
//   filteredStudents.forEach((student, index) => {
//     let row = tbody.insertRow();
//     row.insertCell().textContent = index + 1;
//     row.insertCell().textContent = student.Name;
//     row.insertCell().textContent = student.Email;
//     row.insertCell().textContent = student.Age;
//     row.insertCell().textContent = student.GPA;
//     // row.insertCell().textContent = student.Degree;
//     let degreeCell = row.insertCell();
//     let degreeText = document.createTextNode(student.Degree + " ");
//     degreeCell.appendChild(degreeText);

//     let pencilIcon = document.createElement("i");
//     pencilIcon.classList.add("fa", "fa-pencil", "edit-icon");
//     pencilIcon.addEventListener("click", () => editData(student.ID));
//     degreeCell.appendChild(pencilIcon);

//     let trashIcon = document.createElement("i");
//     trashIcon.classList.add("fa", "fa-trash", "delete-icon");
//     trashIcon.addEventListener("click", () => deleteData(student.ID));
//     degreeCell.appendChild(trashIcon);
//   });
// });

// function clearTable() {
//   let tableRows = document.querySelectorAll("#student-table tbody tr");
//   tableRows.forEach((row) => row.remove());
// }

// const headings = ["ID", "Name", "Age", "Grade", "Degree", "Email"];
// let students = [
//     { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
//     { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
//     { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' }
//   ];

// headings.forEach((heading) => {
//   const th = document.createElement("th");
//   th.textContent = heading;
//   row.appendChild(th);
// });
// students.forEach((student) => {
//     const row = table.insertRow();

//     for (const key in student) {
//       const cell = row.insertCell();
//       cell.textContent = student[key];
//     }
//   });
