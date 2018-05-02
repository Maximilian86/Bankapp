window.addEventListener('beforeunload',function () {
  localStorage.db = JSON.stringify(db);
});

if (localStorage.db) {
  var db = JSON.parse(localStorage.db);
}else {
  var db = [];
}

let tbody = document.querySelector('#main-tbody');
let editTbody = document.querySelector('#edit-tbody');
let accBtn = document.querySelector("#accBtn");
let addBtn = document.querySelector("#addBtn");
let editBtn = document.querySelector("#editBtn");
let mainRow = document.querySelector('.main-row');
let formRow = document.querySelector('.form-row');
let idForm = document.querySelector('#idForm');
let nameForm = document.querySelector('#nameForm');
let depositForm = document.querySelector('#depositForm');
let cCardForm = document.querySelector('#cCardForm');
let addFormBtn = document.querySelector('#addFormBtn');
let editRow = document.querySelector('.edit-row');
let editFormRow = document.querySelector('.edit-form-row');
let editId = document.querySelector('#editId');
let editName = document.querySelector('#editName');
let editDeposit = document.querySelector('#editDeposit');
let editCcard = document.querySelector('#editCcard');
let save = document.querySelector('#save');
let index = null;


// first things to do pozvati funkciju

createTable();

// add Listener
addBtn.addEventListener('click',showForm);
accBtn.addEventListener('click',showMain);
addFormBtn.addEventListener('click',addAccToDb);
editBtn.addEventListener('click',createEditTable);
save.addEventListener('click',saveAccToDb);

function createTable() {
  let text = '';
  mainRow.style.display = 'block';
  formRow.style.display = 'none';
  editRow.style.display = 'none';
  editFormRow.style.display = 'none';
  db.forEach(function (el,index) {
    text += '<tr>';
    text += '<td>'+el.id+'</td>';
    text += '<td>'+el.name+'</td>';
    text += '<td>'+el.deposit+'</td>';
    text += '<td>'+el.cCard+'</td>';
    text += '</tr>';
  })
  tbody.innerHTML = text;
}

function createEditTable() {
  let text = '';
  mainRow.style.display = 'none';
  formRow.style.display = 'none';
  editRow.style.display = 'block';
  editFormRow.style.display = 'none';
  db.forEach(function (el,index) {
    text += '<tr>';
    text += '<td>'+el.id+'</td>';
    text += '<td>'+el.name+'</td>';
    text += '<td>'+el.deposit+'</td>';
    text += '<td>'+el.cCard+'</td>';
    text += '<td><button class="btn btn-sm btn-warning edit '+index+'">Edit</button></td>';
    text += '<td><button id="'+index+'" class="btn btn-sm btn-danger delete">Delete</button></td>';
    text += '</tr>';
  })
  editTbody.innerHTML = text;
  let allDeleteBtns = document.querySelectorAll('.delete');
  let allEditBtns = document.querySelectorAll('.edit');
  for (var i = 0; i < allDeleteBtns.length; i++) {
    allDeleteBtns[i].addEventListener('click',deleteFromDb);
    allEditBtns[i].addEventListener('click',editAccountFromDb);
  }
}

function showForm() {
  formRow.style.display = 'block';
  mainRow.style.display = 'none';
  editRow.style.display = 'none';
  editFormRow.style.display = 'none';
}

function showMain() {
  mainRow.style.display = 'block';
  formRow.style.display = 'none';
  editRow.style.display = 'none';
  editFormRow.style.display = 'none';
}

function addAccToDb() {
  db.push({
    id: idForm.value,
    name: nameForm.value,
    deposit: depositForm.value,
    cCard: cCardForm.value,
  })
  idForm.value = "";
  nameForm.value = "";
  depositForm.value = "";
  cCardForm.value = "";
  createTable();
}

function deleteFromDb() {
  let index = this.id;
  db.splice(index,1);
  createTable();
}

function editAccountFromDb() {
  editFormRow.style.display = 'block';
  formRow.style.display = 'none';
  mainRow.style.display = 'none';
  editRow.style.display = 'none';

  index = this.className.split(" ").pop(); // umesto pop moze i [this.className.split(" ").length-1] i ne treba let;
  console.log(this.className);
  let id = db[index].id;
  let name = db[index].name;
  let deposit = db[index].deposit;
  let cCard = db[index].cCard;

  editId.value = id;
  editName.value = name;
  editDeposit.value = deposit;
  editCcard.value = cCard;
}

function saveAccToDb() {
db[index].id = editId.value;
db[index].name = editName.value;
db[index].deposit = editDeposit.value;
db[index].cCard = editCcard.value;

createEditTable()
}
