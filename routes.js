const express = require("express");
const router = express.Router();
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyBTZL4n7tQe8N4VMj9UPTTqOmWUGtO-JHw",
  Promise: Promise
});

function getRestaurants() {
  let restaurants = googleMapsClient
    .placesNearby({
      location: [42.351243, -83.061567],
      radius: 300,
      type: "restaurant"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    });
  return restaurants;
}
function getMuseums() {
  let museum = googleMapsClient
    .placesNearby({
      location: [42.351243, -83.061567],
      radius: 300,
      type: "museum"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    });
  return museum;
}
function getAmusementPark() {
  let amusement_park = googleMapsClient
    .placesNearby({
      location: [42.351243, -83.061567],
      radius: 300,
      type: "amusement_park"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    });
  return amusement_park;
}
function getZoo() {
  let zoo = googleMapsClient
    .placesNearby({
      location: [42.351243, -83.061567],
      radius: 50000,
      type: "zoo"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    });
  return zoo;
}

function nightClub() {
  let nightClub = googleMapsClient
    .placesNearby({
      location: [42.351243, -83.061567],
      radius: 5000,
      type: "night_club"
    })
    .asPromise()
    .then(response => {
      return response.json.results;
    });
  return nightClub;
}

router.get("/", (req, res) => {
  Promise.all([
    getMuseums(),
    getRestaurants(),
    getAmusementPark(),
    getZoo(),
    nightClub()
  ])
    .then(([museums,restaurants,amusement_parks, zoos, nightClubs]) => {
      res.json({ amusement_parks, zoos, nightClubs, museums, restaurants });
    })
    .catch(e => {
      console.error(e);
      res.error(e);
    });
});

module.exports = router;
