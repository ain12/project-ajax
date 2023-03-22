const tableBody = document.getElementById("tableBody");

const getActors = async () => {
  const response = await fetch("/api/staff");
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

getActors();
