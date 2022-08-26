const request = require("postman-request");
const forcastWeatherstack = (
  { Latitude, Longitude, Location } = {},
  callback
) => {
  const url =
    "http://api.weatherstack.com/forecast?access_key=243fa67b54257fe3adcc8ed3d2998c2b&query=" +
    Latitude +
    "," +
    Longitude +
    "&units=f";
  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Can't reach weatherstack at this moment!", undefined);
    } else if (body.error) {
      callback("Please provide proper URL!", undefined);
    } else {
      let temp = body.forecast;
      if (temp) {
        temp.Location = Location;
        delete temp.weather_icons;
      }
      callback(undefined, temp);
    }
  });
};

module.exports = {
  forcastWeatherstack: forcastWeatherstack,
};
