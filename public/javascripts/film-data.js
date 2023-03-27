const tableBody = document.getElementById("tableBody");

const getFilms = async () => {
  const response = await fetch("/api/film/get");
  const data = await response.json();
  data.forEach((film) => {
    tableBody.innerHTML += 
    `<tr>
    <td>${film.title}</td>
    <td>${film.description}</td>
    <td>${film.release_year}</td>
    <td>${film.length}</td>
    <td>${film.rating}</td>
    <td><button class="btn btn-secondary">Edit</button></td>
    <td><button class="btn btn-danger">Remove</button></td>
  </tr>`;
  });
};

getFilms();