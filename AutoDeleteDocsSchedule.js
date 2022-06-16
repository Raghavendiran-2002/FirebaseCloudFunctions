const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
admin.initializeApp();
// Deletes DOC when it get older than 2 mins
// removeExpiredDocuments get triggers every min
exports.removeExpiredDocuments = functions.pubsub
  .schedule("* * * * *") // https://crontab.guru/#*_*_*_*_*
  .onRun(async (context) => {
    const db = admin.firestore();
    const now = firestore.Timestamp.now();
    const ts = firestore.Timestamp.fromMillis(now.toMillis() - 120000); // 24 hours in milliseconds = 86400000 ; 2 mins in 
milliseconds = 120000
    functions.logger.log(`Started ${ts.toString()} Now : ${now.toString()}`);
    const snap = await db
      .collection("Scheduled")
      .where("DateTime", "<", ts)
      .get();
    let promises = [];
    snap.forEach((snap) => {
      promises.push(snap.ref.delete());
    });
    functions.logger.log(`Completed`); // Debug
    return Promise.all(promises);
  });

