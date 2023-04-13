const tableBody = document.getElementById("tableBody");
let data;
const filmForm = document.getElementById("filmForm");
const successAlert = document.querySelector(".successLabel");
const successAlertUpdate = document.querySelector(".successLabelUpdate");
const errorAlert = document.querySelector(".dangerLabel");
const errorAlertUpdate = document.querySelector(".dangerLabelUpdate");
const successLabelDelete = document.querySelector(".successLabelDelete");
const dangerLabelDelete = document.querySelector(".dangerLabelDelete");
const loader = document.getElementById("loader");
const pageSize = 6;
let curPage = 1;
let idUpdate;

const toogleEdit = () => {
  const form = document.getElementById("staffFormUpdate");

  let title = form.querySelector("#title-update");
  let description = form.querySelector("#description-update");
  let release_year = form.querySelector("#release_year-update");
  let length = form.querySelector("#length-update");
  let rating = form.querySelector("#rating-update");
  let replacement_cost = form.querySelector("#replacement_cost-update");
  let submitBtn = form.querySelector("#submitUpdate");

  title.disabled = !title.disabled;
  description.disabled = !description.disabled;
  release_year.disabled = !release_year.disabled;
  length.disabled = !length.disabled;
  rating.disabled = !rating.disabled;
  replacement_cost.disabled = !replacement_cost.disabled;
  submitBtn.disabled = !submitBtn.disabled;
};

closeformupdate.addEventListener("click", () => {
  document.getElementById("filmFormUpdate").querySelector("#title-update")
    .disabled
    ? null
    : toogleEdit();
});

closeformupdate2.addEventListener("click", () => {
  document.getElementById("filmFormUpdate").querySelector("#title-update")
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
  console.log("furula");
  if (curPage > 1) curPage--;
  showTable();
};

const nextPage = () => {
  if (curPage * pageSize < data.length) curPage++;
  showTable();
};

function goToFirstPage() {
  curPage = 1;
  showTable();
}

function goToLastPage() {
  curPage = Math.ceil(data.length / pageSize);
  showTable();
}

document
  .getElementById("firstButton")
  .addEventListener("click", goToFirstPage, false);
document
  .getElementById("lastButton")
  .addEventListener("click", goToLastPage, false);

document
  .getElementById("nextButton")
  .addEventListener("click", nextPage, false);
document
  .getElementById("prevButton")
  .addEventListener("click", previousPage, false);


const deleteFilm = async (id) => {
  console.log(id);
  const response = await fetch(`/api/film/delete/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  if (response.status === 500) {
    dangerLabelDelete.classList.remove("dangerLabelDelete");
    setTimeout(() => {
      dangerLabelDelete.classList.add("dangerLabelDelete");
    }, 3000);
  } else {
    successLabelDelete.classList.remove("successLabelDelete");
    setTimeout(() => {
      successLabelDelete.classList.add("successLabelDelete");
    }, 3000);
    getFilm();
  }
  getFilm();
};

async function getFilmData(id) {
  displayLoading();
  const response = await fetch(`/api/film/get/${id}`);
  const data = await response.json();
  hideLoading();
  return data;
}

const renderFilm = async (id) => {
  idUpdate = id;
  displayLoading();
  const film = await getFilmData(id);
  const form = document.getElementById("filmFormUpdate");
  hideLoading();
  form.querySelector("#title-update").value = film.first_name;
  form.querySelector("#description-update").value = film.last_name;
  form.querySelector("#release_year-update").value = film.address;
  form.querySelector("#length-update").value = film.email;
  form.querySelector("#rating-update").value = film.store_id;
  form.querySelector("#replacement_cost-update").checked = film.active;
};

const showTable = () => {
  tableBody.innerHTML = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((film) => {
    console.log(film.title);
    console.log(film.description);
    console.log(film.release_year);
    console.log(film.length);
    tableBody.innerHTML += 
    `<tr>
    <td>${film.title}</td>
    <td>${film.description}</td>
    <td>${film.release_year}</td>
    <td>${film.length}</td>
    <td>${film.rating}</td>
    <td>${film.replacement_cost}</td>
    <td>${film.film_id}</td>
    <td><button class="btn btn-secondary">Edit</button></td>
    <td><button class="btn btn-danger">Remove</button></td>
  </tr>`;
  });
}

const getFilm = async () => {
  const response = await fetch("/api/film/get");
  data = await response.json();
  showTable();
  setTimeout(() => {
    hideLoading();
  }, 5000);
};

filmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("furula");
  const firstName = document.getElementById("title").value;
  const lastName = document.getElementById("description").value;
  const address = document.getElementById("release_year").value;
  const email = document.getElementById("length").value;
  const store = document.getElementById("rating").value;
  const active = document.getElementById("replacement_cost").checked;
  // console.log(active);

  const data = {
    title: title,
    description: description,
    release_year: release_year,
    length: length,
    rating: Number(rating),
    replacement_cost: replacement_cost,
  };
  displayLoading();
  fetch("/api/film/create", {
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
      getFilm();
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
      console.log("va bien");
    });

  e.target.reset();
});

document.getElementById("filmFormUpdate").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title-update").value;
  const description = document.getElementById("description-update").value;
  const release_year = document.getElementById("release_year-update").value;
  const length = document.getElementById("length-update").value;
  const rating = document.getElementById("rating-update").value;
  const replacement_cost = document.getElementById("replacement_cost-update").checked;

  const data = {
    title: title,
    description: description,
    release_year: release_year,
    length: length,
    rating: Number(rating),
    replacement_cost: replacement_cost,
  };

  displayLoading();

  fetch(`/api/film/update/${idUpdate}`, {
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
      console.log("ta bien");
      errorAlertUpdate.classList.remove("dangerLabelUpdate");
      setTimeout(() => {
        errorAlertUpdate.classList.add("dangerLabelUpdate");
      }, 3000);
    });
});

getFilm();