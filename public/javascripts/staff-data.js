const tableBody = document.getElementById("tableBody");
const staffForm = document.getElementById("staffForm");
const successAlert = document.querySelector(".successLabel");
const successAlertUpdate = document.querySelector(".successLabelUpdate");
const errorAlert = document.querySelector(".dangerLabel");
const errorAlertUpdate = document.querySelector(".dangerLabelUpdate");
const loader = document.getElementById("loader");
const pageSize = 6;
let curPage = 1;
let data;
let idUpdate;

const toogleEdit = () => {
  const form = document.getElementById("staffFormUpdate");

  let firstname = form.querySelector("#firstname-update");
  let lastname = form.querySelector("#lastname-update");
  let address = form.querySelector("#address-update");
  let email = form.querySelector("#emailaddress-update");
  let store = form.querySelector("#store-update");
  let active = form.querySelector("#active-update");
  let username = form.querySelector("#username-update");
  let password = form.querySelector("#password-update");
  let submitBtn = form.querySelector("#submitUpdate");

  firstname.disabled = !firstname.disabled;
  lastname.disabled = !lastname.disabled;
  address.disabled = !address.disabled;
  email.disabled = !email.disabled;
  store.disabled = !store.disabled;
  active.disabled = !active.disabled;
  username.disabled = !username.disabled;
  password.disabled = !password.disabled;
  submitBtn.disabled = !submitBtn.disabled;
};

closeformupdate.addEventListener("click", () => {
  document.getElementById("staffFormUpdate").querySelector("#firstname-update")
    .disabled
    ? null
    : toogleEdit();
});

closeformupdate2.addEventListener("click", () => {
  document.getElementById("staffFormUpdate").querySelector("#firstname-update")
    .disabled
    ? null
    : toogleEdit();
});

const displayLoading = () => {
  loader.style.display = "block";
};

const hideLoading = () => {
  loader.style.display = "none";
};

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
  getStaff();
};

async function getStaffData(id) {
  displayLoading();
  const response = await fetch(`/api/staff/get/${id}`);
  const data = await response.json();
  hideLoading();
  return data;
}

const renderStaff = async (id) => {
  idUpdate = id;
  displayLoading();
  const staff = await getStaffData(id);
  const form = document.getElementById("staffFormUpdate");
  hideLoading();
  form.querySelector("#firstname-update").value = staff.first_name;
  form.querySelector("#lastname-update").value = staff.last_name;
  form.querySelector("#address-update").value = staff.address;
  form.querySelector("#emailaddress-update").value = staff.email;
  form.querySelector("#store-update").value = staff.store_id;
  form.querySelector("#active-update").checked = staff.active;
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
      <td><button type="button" class="btn btn-secondary editbtn" data-toggle="modal" data-target="#staticBackdrop2" onclick="renderStaff(${staff.staff_id})">View</button></td>
      <td><button class="btn btn-danger removebtn" onclick="deleteStaff(${staff.staff_id})">Remove</button></td>
    </tr>`;
    });
};

const getStaff = async () => {
  displayLoading();
  const response = await fetch("/api/staff/get");
  data = await response.json();
  renderTable();
  setTimeout(() => {
    hideLoading();
  }, 5000);
};

const getShops = async (action) => {
  displayLoading();
  const response = await fetch("/api/shop/get");
  const data = await response.json();
  hideLoading();
  data.forEach((shop) => {
    console.log(shop);
    const shopOption = document.createElement("option");
    shopOption.value = shop.store_id;
    shopOption.innerHTML = shop.address;
    const shopOption2 = document.createElement("option");
    shopOption2.value = shop.store_id;
    shopOption2.innerHTML = shop.address;
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
  const active = document.getElementById("active").checked;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(active);

  const data = {
    first_name: firstName,
    last_name: lastName,
    address: address,
    email: email,
    store_id: Number(store),
    active: active,
    username: username,
    password: password,
  };
  displayLoading();
  fetch("/api/staff/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      console.log(data);
      getStaff();
      successAlert.classList.remove("successLabel");
      setTimeout(() => {
        successAlert.classList.add("successLabel");
      }, 3000);
    })
    .catch((error) => {
      errorAlert.classList.remove("dangerLabel");
      setTimeout(() => {
        errorAlert.classList.add("dangerLabel");
      }, 3000);
      console.log("funciona");
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
  const active = document.getElementById("active-update").checked;
  const username = document.getElementById("username-update").value;
  const password = document.getElementById("password-update").value;

  const data = {
    first_name: firstName,
    last_name: lastName,
    address: address,
    email: email,
    store_id: Number(store),
    active: active,
    username: username,
    password: password,
  };

  displayLoading();

  fetch(`/api/staff/update/${idUpdate}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      console.log(data);
      getStaff();
      successAlertUpdate.classList.remove("successLabelUpdate");
      setTimeout(() => {
        successAlertUpdate.classList.add("successLabelUpdate");
      }, 3000);
    })
    .catch((error) => {
      console.log("funciona");
      errorAlertUpdate.classList.remove("dangerLabelUpdate");
      setTimeout(() => {
        errorAlertUpdate.classList.add("dangerLabelUpdate");
      }, 3000);
    });
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

getStaff();
getShops();
