const express = require("express");
const itinerary = express.Router();
const pool = require("./connections");

function selectItinerary(req, res) {
  pool
    .query("select * from Itinerary order by startdatetime ASC")
    .then(result => {
      res.send(result.rows);
    });
}

//
itinerary.get("/itinerary", selectItinerary);

itinerary.delete("/itinerary/:id", (req, res) => {
  pool.query(`delete from Itinerary where id = ${req.params.id}`).then(() => {
    selectItinerary(req, res);
  });
});

itinerary.post("/itinerary", (req, res) => {
  pool
    .query(
      "insert into Itinerary (name, opening_hours, rating, vicinity, startdatetime) values ($1::text, $2::text, $3::numeric, $4::text, $5::text)",
      [
        req.body.name,
        req.body.opening_hours,
        req.body.rating,
        req.body.vicinity,
        req.body.startdatetime,
      ]
    )
    .then(() => {
      selectItinerary(req, res);
    });
});

module.exports = itinerary;
