const tableBody = document.getElementById("tableBody");
const staffForm = document.getElementById("staffForm");
const successAlert = document.querySelector(".successLabel");
const successAlertUpdate = document.querySelector(".successLabelUpdate");
const pageSize = 6;
let curPage = 1;
let data;
let idUpdate;

const previousPage = () => {
  console.log("hola");
  if (curPage > 1) curPage--;
  renderTable();
};

const nextPage = () => {
  if (curPage * pageSize < data.length) curPage++;
  renderTable();
};

document
  .getElementById("nextButton")
  .addEventListener("click", nextPage, false);
document
  .getElementById("prevButton")
  .addEventListener("click", previousPage, false);

const deleteStaff = async (id) => {
  /*  e.target.parentNode.parentNode.children[0].innerHTML */ console.log(id);
  const response = await fetch(`/api/staff/delete/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  /*  location.reload(); */
  getActors();
};

async function getStaffData(id) {
  const response = await fetch(`/api/staff/get/${id}`);
  const data = await response.json();
  return data;
}

const renderStaff = async (id) => {
  idUpdate = id;
  const staff = await getStaffData(id);
  const form = document.getElementById("staffFormUpdate");

  form.querySelector("#firstname-update").value = staff.first_name;
  form.querySelector("#lastname-update").value = staff.last_name;
  form.querySelector("#address-update").value = staff.address;
  form.querySelector("#emailaddress-update").value = staff.email;
  form.querySelector("#store-update").value = staff.store_id;
  form.querySelector("#username-update").value = staff.username;
  form.querySelector("#password-update").value = staff.password;
};

const renderTable = () => {
  tableBody.innerHTML = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((staff) => {
      tableBody.innerHTML += `<tr>
      <td>${staff.staff_id}</td>
      <td>${staff.first_name}</td>
      <td>${staff.last_name}</td>
      <td>${staff.address}</td>
      <td>${staff.email}</td>
      <td><button type="button" class="btn btn-secondary editbtn" data-toggle="modal" data-target="#staticBackdrop2" onclick="renderStaff(${staff.staff_id})">Edit</button></td>
      <td><button class="btn btn-danger removebtn" onclick="deleteStaff(${staff.staff_id})">Remove</button></td>
    </tr>`;
    });
};

const getActors = async () => {
  const response = await fetch("/api/staff/get");
  data = await response.json();
  renderTable();
};

const getShops = async (action) => {
  const response = await fetch("/api/shop/get");
  const data = await response.json();
  data.forEach((shop) => {
    const shopOption = document.createElement("option");
    shopOption.value = shop.store_id;
    shopOption.innerHTML = shop.store_id;
    const shopOption2 = document.createElement("option");
    shopOption2.value = shop.store_id;
    shopOption2.innerHTML = shop.store_id;
    document.getElementById("store").appendChild(shopOption);
    document.getElementById("store-update").appendChild(shopOption2);
  });
};

staffForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("funciona");
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("emailaddress").value;
  const store = document.getElementById("store").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    first_name: firstName,
    last_name: lastName,
    address: address,
    email: email,
    store_id: Number(store),
    username: username,
    password: password,
  };

  fetch("/api/staff/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getActors();
      successAlert.classList.remove("successLabel");
      setTimeout(() => {
        successAlert.classList.add("successLabel");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error:" + error);
    });

  e.target.reset();
});

document.getElementById("staffFormUpdate").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstname-update").value;
  const lastName = document.getElementById("lastname-update").value;
  const address = document.getElementById("address-update").value;
  const email = document.getElementById("emailaddress-update").value;
  const store = document.getElementById("store-update").value;
  const username = document.getElementById("username-update").value;
  const password = document.getElementById("password-update").value;

  const data = {
    first_name: firstName,
    last_name: lastName,
    address: address,
    email: email,
    store_id: Number(store),
    username: username,
    password: password,
  };

  fetch(`/api/staff/update/${idUpdate}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getActors();
      successAlertUpdate.classList.remove("successLabelUpdate");
      setTimeout(() => {
        successAlertUpdate.classList.add("successLabelUpdate");
      }, 3000);
    })
    .catch((error) => {});

  e.target.reset();
});

const toggleVisibility = () => {
  let inpt = document.querySelectorAll(".password-update");
  inpt.forEach((input) => {
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  });
};

getActors();
getShops();
