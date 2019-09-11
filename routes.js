const express = require("express");
const router = express.Router();
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyBTZL4n7tQe8N4VMj9UPTTqOmWUGtO-JHw",
  Promise: Promise
});
function geocode(location){
let coordinates = googleMapsClient.geocode({address: location})
  .asPromise()
  .then((response) => {
    return response.json.results[0].geometry.location;

  })
  .catch((err) => {
    console.log(err);
  });
  return coordinates;
};
function getRestaurants(location) {
  let restaurants = googleMapsClient
    .placesNearby({
      location: location,
      radius: 300,
      type: "restaurant"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return restaurants;
}
function getMuseums(location) {
  let museum = googleMapsClient
    .placesNearby({
      location: location,
      radius: 300,
      type: "museum"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return museum;
}
function getAmusementPark(location) {
  let amusement_park = googleMapsClient
    .placesNearby({
      location: location,
      radius: 300,
      type: "amusement_park"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    }) 
     .catch((err) => {
      console.log(err);
    });
  return amusement_park;
}
function getZoo(location) {
  let zoo = googleMapsClient
    .placesNearby({
      location: location,
      radius: 50000,
      type: "zoo"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return zoo;
}

function nightClub(location) {
  let nightClub = googleMapsClient
    .placesNearby({
      location: location,
      radius: 5000,
      type: "night_club"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return nightClub;
}
// let restaurants = getRestaurants();

router.get("/restaurants", (req, res) => {
  (geocode(req.body.location)
  .then( response => {
    getRestaurants(response).then(function(result) {
      res.send(result)
   })
  })
  .catch(e => {
    console.error(e);
    res.error(e);
  })
  )
});

router.get("/visit", (req, res) => {
  (geocode(req.body.location).then( response => {
  Promise.all([
    getMuseums(response),
    getAmusementPark(response),
    getZoo(response),
    nightClub(response)
  ])
    .then(([museums,amusement_parks, zoos, nightClubs]) => {
      res.json({ amusement_parks, zoos, nightClubs, museums });
    })
    .catch(e => {
      console.error(e);
      res.error(e);
    });
  })
  )
});

module.exports = router;
