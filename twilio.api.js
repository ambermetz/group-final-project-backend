let twilio = require("twilio");

// Find your account sid and auth token in your Twilio account Console.
let client = new twilio(
  "AC53f78bc1cff0c3326681bdba537862b5",
  "42d3f1163f99775bf98166b404e45aa4"
);

// Send the text message.
client.messages.create({
  to: "12483084327",
  from: "17343994190",
  body: "Heyyyyyy Dean!"
});
