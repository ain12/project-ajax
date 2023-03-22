const tableBody = document.getElementById("tableBody");
const staffForm = document.getElementById("staffForm");

const getActors = async () => {
  const response = await fetch("/api/staff/get");
  const data = await response.json();
  data.forEach((staff) => {
    /* const actor = document.createElement("p");
    actor.innerHTML = element.first_name;
    actors.appendChild(actor); */
    tableBody.innerHTML += `<tr>
    <td>${staff.staff_id}</td>
    <td>${staff.first_name}</td>
    <td>${staff.last_name}</td>
    <td>${staff.address}</td>
    <td>${staff.email}</td>
    <td><button class="btn btn-secondary">Edit</button></td>
    <td><button class="btn btn-danger">Remove</button></td>
  </tr>`;
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

      staffForm.innerHTML += `
      <div class="alert alert-success" role="alert">
        Staff added succesfully!
    </div>
      `;
      // Hacer algo con la respuesta del servidor si es necesario
    })
    .catch((error) => {
      //console.error("Error:" + error);
    });

  staffForm.reset();
});

getActors();
