console.log("This is Client Side JS Output!");

// url = "http://localhost:3000/weather?address=Boston";

// fetch(url).then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data["Current Weather"]);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const para1 = document.querySelector("#message-1");
const para2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  para1.textContent = "Loading...";
  para2.textContent = "";
  //   console.log(location);
  let url = "/weather?address=" + location;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        para1.textContent = data.error;
        para2.textContent = "";
      } else {
        para1.textContent = data.Location;
        para2.textContent = data.Description;
        // console.log(data.Location);
        // console.log(data.Description);
      }
    });
  });
});
