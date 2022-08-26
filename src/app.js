const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const currentWeather = require("./utils/currentWeather");

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

// set(setting name, value we wanna set) method allows us to set a value for a given express setting
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ashwin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "This is the about page of website!",
    name: "Revanth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "You can get help here!",
    name: "Vijay",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Need to provide a address!!!",
    });
  }
  geoCode.geoCoding(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    currentWeather.currentWeatherstack(data, (w_error, w_data) => {
      if (w_error) {
        return res.send({
          error: w_error,
        });
      }
      res.send({
        Location: w_data.Location,
        Description: w_data.data,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorPage", {
    title: "Page Note Found!!!",
    data: "The article you are trying to access doesn't exist.",
  });
});

app.get("*", (req, res) => {
  res.render("errorPage", {
    title: "Page Not Found!!!",
    data: "The page you are trying to access does'nt exist.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on Port 3000");
});

// console.log(__dirname);
// console.log(__filename);

// app.get("", (req, res) => {
//   res.send("<h1>Hello Express!</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Ashwin",
//     },
//     {
//       name: "Sachin",
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("Am About Page!");
// });
