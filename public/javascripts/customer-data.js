let table = document.getElementById("table-body")
let cities = document.getElementById("city")
let stores = document.getElementById("store")

const getCustomers = async () => {
  table.innerHTML = "";
  const target = document.getElementById("spinner");
  const spinner = new Spinner().spin(target);
  fetch("/customer")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        table.innerHTML +=
          "<tr>" +
          "<td>" +
          element.customer_id +
          "</td>" +
          "<td>" +
          element.store_id +
          "</td>" +
          "<td>" +
          element.first_name +
          "</td>" +
          "<td>" +
          element.last_name +
          "</td>" +
          "<td>" +
          element.email +
          "</td>" +
          "<td>" +
          element.address +
          "</td>" +
          '<td ><a class="btn" onclick="removeUser(' +
          element.customer_id +
          ')"><i class="fas fa-trash"></i></a> </td>' +
          "</tr>";
      });

      // oculta el spinner
      spinner.stop();
    });
};
const removeUser = async (id) => {
  const url = `/customer/delete/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  getCustomers();
};

const getCities = async () => {
    fetch('/customer/cities')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element)=>{
            const option = document.createElement('option')
            option.value = element.city_id
            option.innerHTML = element.city
            cities.append(option)
        })
    })
}

const getStores = async () => {
    fetch('/customer/stores')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element)=>{
            const option = document.createElement('option')
            option.value = element.store_id
            option.innerHTML = element.store_id
            stores.append(option)
        })
    })
}

const createCustomer = async () => {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const address = document.getElementById('address').value
    const cp = document.getElementById('cp').value
    const city = document.getElementById('city').value
    const emailaddress = document.getElementById('emailaddress').value
    const store = document.getElementById('store').value

    const json = {
        first_name : firstname,
        last_name : lastname,
        address : address,
        postal_code : Number(cp),
        city_id : Number(city),
        email : emailaddress,
        store_id : Number(store)
    }

    fetch('/customer/create', {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:" + error);
    });
}

getCustomers();
