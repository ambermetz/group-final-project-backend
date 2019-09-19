const express = require("express");
const router = express.Router();
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyBTZL4n7tQe8N4VMj9UPTTqOmWUGtO-JHw",
  Promise: Promise
});
function getDirections(location, destination) {
  return googleMapsClient
    .directions({ origin: location, destination: destination })
    .asPromise()
    .then(response => {
      console.log(response.json.routes[0].legs[0].steps);
      return response.json.routes[0].legs[0].steps;
    });
}
// function geocode(location) {
//   console.log(location)
//   let coordinates = googleMapsClient
//     .geocode({ address: location })
//     .asPromise()
//     .then(response => {
//       return response.json.results[0].geometry.location;
//     })
//     .catch(err => {
//       //console.log(err);
//       res.error(err);
//     });
//   return coordinates;
//}
function geocode(location) {
  console.log(location);
  let coordinates = googleMapsClient
    .geocode({ address: location })
    .asPromise()
    .then(response => {
      return response.json.results[0].geometry.location;
    })
    .catch(err => {
      console.log(err);
    });
  return coordinates;
}
function getPhotos(ref) {
  return googleMapsClient
    .placesPhoto({ photoreference: ref, maxwidth: 400, maxheight: 400 })
    .asPromise()
    .then(response => {
      return {
        photoreference: response.query.photoreference,
        photoUrl: `https://${response.req.socket._host}${response.req.path}`
      };
    })
    .catch(e => {
      console.log(e);
      return ref;
    });
}
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
    .catch(err => {
      //console.log(err);
      res.error(err);
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
    .catch(err => {
      //console.log(err);
      res.error(err);
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
    .catch(err => {
      //console.log(err);
      res.error(err);
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
    .catch(err => {
      //console.log(err);
      res.error(err);
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
    .catch(err => {
      //console.log(err);
      res.error(err);
    });
  return nightClub;
}
// let restaurants = getRestaurants();

// persists data across our application.
router.get("/restaurants", (req, res) => {
  console.log(req);
  geocode(req.query.location)
    .then(response => getRestaurants(response))
    .then(result => {
      const photoPromises = [];
      result.forEach(event => {
        photoPromises.push(getPhotos(event.photos[0].photo_reference));
        //  console.log(photoPromises);
      });

      //  return Promise.all([Promise.resolve(result)
      //   , ...photoPromises
      return Promise.all([Promise.resolve(result), ...photoPromises]);
    })
    .then(([result, ...photos]) => {
      res.json({ result, photos });
    })
    .catch(e => {
      //console.error(e);
      res.status(500);
      res.send(e.message);
    });
});
router.get("/directions", (req, res) => {
  getDirections(req.query.location, req.query.destination)
    .then(response => {
      return Promise.resolve(response);
    })
    .then(response => {
      res.json(response);
    });
});
router.get("/visit", (req, res) => {
  geocode(req.query.location).then(response => {
    Promise.all([
      getMuseums(response),
      getAmusementPark(response),
      getZoo(response),
      nightClub(response)
    ])
      .then(([museums, amusement_parks, zoos, nightClubs]) => {
        res.json({ amusement_parks, zoos, nightClubs, museums });
      })
      .catch(e => {
        console.error(e);
        res.error(e);
      });
  });
});

module.exports = router;
