const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");

const admin = require("firebase-admin");
const app = express();
admin.initializeApp();

async function getUsers(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82264bb71b4ab55b1683e5a905f24d18`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getUsers123(city) {
  let url = `http://api.weatherapi.com/v1/current.json?key=dd2837c2e087427f95671831222606&q=${city}&aqi=no`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

app.get("/", async function (req, res) {
  var city = req.query.city;
  var API = req.query.API;
  var s;
  if (API == "OpenWeather") {
    s = await getUsers123(city);
  } else if (API == "weatherapi") {
    s = await getUsers(city);
  }
  console.log(s);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(s));
});

exports.user = functions.https.onRequest(app);

