const request = require("postman-request");

const geoCoding = (address, callback) => {
  let geoCoding_url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicGF3YXItYXNod2luIiwiYSI6ImNsNzMweDI4cjEyM28zbnNiNWc3dmZnam4ifQ.LJ2bCIgOmR2PTbEyRcPjVg&limit=1";
  request({ url: geoCoding_url, json: true }, (error, response, body) => {
    if (error) {
      callback("Can't reach weatherstack at this moment!", undefined);
    } else if (body.features.length === 0) {
      callback("Please provide proper URL!", undefined);
    } else {
      callback(undefined, {
        Longitude: body.features[0].center[0],
        Latitude: body.features[0].center[1],
        Location: body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  geoCoding: geoCoding,
};
