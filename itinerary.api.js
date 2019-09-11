const express = require("express");
const itinerary = express.Router();
const pool = require("./connections");

function selectItinerary(req, res) {
  pool.query("select * from Itinerary").then(result => {
    res.send(result.rows);
  });
}

itinerary.get("/itinerary", selectItinerary);

itinerary.post("/itinerary", (req, res) => {
  pool
    .query(
      "insert into Itinerary (name, opening_hours, rating, vicinity, startdatetime, city) values ($1::text, $2::text, $3::smallint, $4::text, $5::text, $6::text)",
      [
        req.body.name,
        req.body.opening_hours,
        req.body.rating,
        req.body.vicinity,
        req.body.startdatetime,
        req.body.city
      ]
    )
    .then(() => {
      selectItinerary(req, res);
    });
});

module.exports = itinerary;
