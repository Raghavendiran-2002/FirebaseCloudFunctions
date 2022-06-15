const functions = require("firebase-functions");
const express = require("express");

const admin = require("firebase-admin");
const app = express();
admin.initializeApp();

// GET Request
// Fetches all the DOC in Collection with DocId
app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("users").get();
  let users = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    users.push({ id, data });
  });
  res.status(200).send(JSON.stringify(users));
});

// POST Request
// BODY : {"Name" : "qwerty"}
app.post("/", async (req, res) => {
  const user = req.body;
  await admin.firestore().collection("users").add(user);
  res.status(201).send();
});

exports.user = functions.https.onRequest(app);

