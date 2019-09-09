const express = require("express");
const router = express.Router();
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyBTZL4n7tQe8N4VMj9UPTTqOmWUGtO-JHw",
  Promise: Promise
});


router.get("/", (req, res) => {
  googleMapsClient
    .placesNearby({ location: [42.351243, -83.061567], radius: 300, type:'restaurant' })
    .asPromise()
    .then(response => {
      console.log(response.json.results);
    })
    .catch(err => {
      console.log(err);
    });
});
router.get("/parks", (req, res) => {
  googleMapsClient
    .placesNearby({ location: [42.351243, -83.061567], radius: 300, type:'park' })
    .asPromise()
    .then(response => {
      console.log(response.json.results);
    })
    .catch(err => {
      console.log(err);
    });
});
// console.log(httpGet('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY'))

// router.get("/", (req, res) => {
//   res.send("GET works");
// });

// router.post("/", (req, res) => {
//   res.send("POST works");
// });

// router.put("//:id", (req, res) => {
//   res.send("PUT works");
// });

// router.delete("//:id", (req, res) => {
//   res.send("DELETE works");
// });

module.exports = router;
