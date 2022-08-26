const request = require("postman-request");
const currentWeatherstack = ({ Latitude, Longitude, Location }, callback) => {
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
      let temp = {};
      temp.Location = Location;
      // console.log(body.current.weather_descriptions[0]);
      temp.data =
        "The weather is " +
        body.current.weather_descriptions[0] +
        ". It is currently " +
        body.current.temperature +
        " degrees out. There is " +
        body.current.precip +
        "% chance of rain.";
      console.log(temp);
      callback(undefined, temp);
    }
  });
};

module.exports = {
  currentWeatherstack: currentWeatherstack,
};
