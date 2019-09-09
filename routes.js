const express = require("express");
const router = express.Router();
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyBTZL4n7tQe8N4VMj9UPTTqOmWUGtO-JHw",
  Promise: Promise
});

router.get("/", (req, res) => {
  googleMapsClient
    .geocode({ address: "1600 Amphitheatre Parkway, Mountain View, CA" })
    .asPromise()
    .then(response => {
      console.log(response.json.results);
    })
    .catch(err => {
      console.log(err);
    });
});

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
