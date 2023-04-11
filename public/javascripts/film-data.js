const tableBody = document.getElementById("tableBody");

const getFilms = async () => {
  const response = await fetch("/api/film/get");
  const data = await response.json();
  data.forEach((film) => {
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
    <td><button class="btn btn-secondary">Edit</button></td>
    <td><button class="btn btn-danger">Remove</button></td>
  </tr>`;
  });
};

// const data = {
//   title: title,
//   description: description,
//   release_year: release_year,
//   length: length,
//   rating: rating,
//   replacement_cost: replacement_cost,
// }

// fetch("/api/film/create", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// })
// .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       getFilms();
//       successAlert.classList.remove("successLabel");
//       setTimeout(() => {
//         successAlert.classList.add("successLabel");
//       }, 3000);
//     })
//     .catch((error) => {
//       console.error("Error:" + error);
//     });

getFilms();