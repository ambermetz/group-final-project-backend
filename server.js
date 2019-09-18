const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const itinerary = require("./itinerary.api");
// const pool = require("./connections"); //added after connection.js set-up
// const googleMapsClient = require("@google/maps").createClient({
//   key: "AIzaSyAD2FKgCts12KdWq0lVY7TJjEcP4e7RkoU",
//   Promise: Promise
// });

// app.use(express.static(__dirname + "/dist"));
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use("/", itinerary);

// const port = process.env.PORT;
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on PORT:  ${port}!`));
