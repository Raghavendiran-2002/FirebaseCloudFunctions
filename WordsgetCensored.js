const functions = require("firebase-functions");
const express = require("express");

const admin = require("firebase-admin");

const app = express();
admin.initializeApp();

const db = admin.firestore();
// STRUCTURE OF CLOUD FIRESTORE
// COLLECTION : users => DOCUMENT : random() => FIELD : (i) username : "value" (ii) censored : "*****"

// POST Request
// {"username" : "ASS"}
app.post("/", async (req, res) => {
  const user = req.body;
  await admin.firestore().collection("users").add(user);
  res.status(201).send();
});

exports.user = functions.https.onRequest(app);

// Firestore Function
// When user creates Doc with field "username" : "ass"
// function creates new field "censored" with value "***"
exports.censorWord = functions.firestore
  .document("/users/{documentId}")
  .onCreate((snap, context) => {
    const words = [
      "FUCK",
      "ASS",
      "MOTHERFUCKER",
      "crap",
      "shit",
      "punda",
      "mavaney",
      "ass",
    ];
    const original = snap.data().username;
    words.forEach((wd) => {
      if (snap.data().username == wd) {
        functions.logger.log("FUCK", context.params.documentId, original);
        const length = wd.length;
        var censored = "";
        for (let i = 0; i < length; i++) {
          censored = censored.concat("*");
        }
        return snap.ref.set({ censored }, { merge: true });
      }
    });
  });

