const tableBody = document.getElementById("tableBody");
const staffForm = document.getElementById("staffForm");
const successAlert = document.querySelector(".successLabel");
const pageSize = 6;
let curPage = 1;
let data;

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
      <td><button class="btn btn-secondary editbtn">Edit</button></td>
      <td><button class="btn btn-danger removebtn" onclick="deleteStaff(${staff.staff_id})">Remove</button></td>
    </tr>`;
    });
};

const getActors = async () => {
  const response = await fetch("/api/staff/get");
  data = await response.json();
  renderTable();
};

const getShops = async () => {
  const response = await fetch("/api/shop/get");
  const data = await response.json();
  data.forEach((shop) => {
    const shopOption = document.createElement("option");
    shopOption.value = shop.store_id;
    shopOption.innerHTML = shop.store_id;
    document.getElementById("store").appendChild(shopOption);
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

getActors();
getShops();
