//const { get } = require("../../routes");

let table = document.getElementById("table-body")
const cities = document.getElementById("city")
const stores = document.getElementById("store")
const citiesUpdate = document.getElementById("update-city")
const storesUpdate = document.getElementById("update-store")

const getCustomers = async () => {
  table.innerHTML = "";
  const target = document.getElementById("spinner");
  const spinner = new Spinner().spin(target);
  fetch("/customer")
    .then((response) => response.json())
    .then((data) => {
      if ($.fn.DataTable.isDataTable($("#data_table"))) {
        $("#data_table").DataTable().destroy()
        table.innerHTML = ""
        $("#data_table").innerHTML = ""
      }
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
          '<td >'+
            '<a class="btn" onclick="removeUser(' + element.customer_id + ')"><i class="fas fa-trash"></i></a>'+
            '<a class="btn" data-toggle="modal" id="updateCustomer" data-target="#staticUpdateBackdrop" onclick="getCustomer('+ element.customer_id +')" "><i class="fas fa-edit"></i></a>'+
          '</td>' +
          "</tr>";
      });

      $("#data_table").DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
          "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
        }
      });
      spinner.stop();
    });
};

const getCustomer = async (id) => {
  const url = `/customer/get/${id}`

  fetch(url)
  .then((response)=> response.json())
  .then((data) => {
    data.forEach((element)=>{
      document.getElementById('update-id').value = element.customer_id
      document.getElementById('update-firstname').value = element.first_name
      document.getElementById('update-lastname').value = element.last_name
      document.getElementById('update-address').value = element.address
      document.getElementById('update-cp').value = element.postal_code
      document.getElementById('update-city').value = element.city_id
      document.getElementById('update-emailaddress').value = element.email
      document.getElementById('update-store').value = element.store_id
    })  
  })
}

const removeUser = async (id) => {
  const url = `/customer/delete/${id}`
  fetch(url, {
    method: "DELETE"
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        toastr.error(data.error, {
          timeOut: 10000,
          extendedTimeOut: 10000
        })
      } else {
        toastr.success(data.message, {
          timeOut: 10000,
          extendedTimeOut: 10000
        })
        getCustomers()
      }
    })
    .catch((error) => {
      console.log("Error:" + error);
  });
}

const getCities = async () => {
    fetch('/customer/cities')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element)=>{
          let option = document.createElement('option')
          let option1 = document.createElement('option')
          option.value = element.city_id
          option.innerHTML = element.city
          option1.value = element.city_id
          option1.innerHTML = element.city
          cities.append(option1)
          citiesUpdate.append(option)
        })
    })
}

const getStores = async () => {
  fetch('/customer/stores')
  .then((response) => response.json())
  .then((data) => {
      data.forEach((element)=>{
        let option = document.createElement('option')
        let option1 = document.createElement('option')
        option.value = element.store_id
        option.innerHTML = element.store_id
        option1.value = element.store_id
        option1.innerHTML = element.store_id
        stores.append(option1)
        storesUpdate.append(option)
      })
  })
}

const createCustomer = async () => {
  $('#staticBackdrop').modal('hide')
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
    if (data.error) {
      toastr.error(data.error, {
        timeOut: 10000,
        extendedTimeOut: 10000
      })
    } else {
      toastr.success(data.message, {
        timeOut: 10000,
        extendedTimeOut: 10000
      })
      getCustomers()
    }
  })
  .catch((error) => {
    console.error("Error:" + error);
  });
}

const updateCustomer = async () => {
  $('#staticUpdateBackdrop').modal('hide')
  const id = document.getElementById('update-id').value
  const firstname = document.getElementById('update-firstname').value
  const lastname = document.getElementById('update-lastname').value
  const address = document.getElementById('update-address').value
  const cp = document.getElementById('update-cp').value
  const city = document.getElementById('update-city').value
  const emailaddress = document.getElementById('update-emailaddress').value
  const store = document.getElementById('update-store').value

  const json = {
    customer_id : id,
    first_name : firstname,
    last_name : lastname,
    address : address,
    postal_code : Number(cp),
    city_id : Number(city),
    email : emailaddress,
    store_id : Number(store)
  }

  fetch('/customer/update', {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      toastr.error(data.error, {
        timeOut: 10000,
        extendedTimeOut: 10000
      })
    } else {
      toastr.success(data.message, {
        timeOut: 10000,
        extendedTimeOut: 10000
      })
      getCustomers()
    }
  })
  .catch((error) => {
    console.error("Error:" + error);
  });
}

function clearForm() {
  document.getElementById('firstname').value = ""
  document.getElementById('lastname').value = ""
  document.getElementById('address').value = ""
  document.getElementById('cp').value = ""
  document.getElementById('emailaddress').value = ""
}

window.onload = getCustomers()

getCities()
getStores()