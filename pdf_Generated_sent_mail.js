// Importing modules
const PDFDocument = require("pdfkit");
const docs = new PDFDocument();
const fs = require("fs");
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");

app.use(express.json());
var admin = require("firebase-admin");
var serviceAccount = require("./iot-smart-home-automatio-399f1-firebase-adminsdk-452ox-399709ffd4.json");
// Create a document
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const data = "Started";
docs.pipe(fs.createWriteStream("reciept.pdf"));

var completed = 0;
async function getMultiple(db) {
  const citiesRef = db.collection("Kc");
  const snapshot = await citiesRef.get();
  snapshot.forEach((doc) => {
    const myJSON = JSON.stringify(doc.data());
    console.log(myJSON);
    data.concat(myJSON);
    completed = 1;
    docs.fontSize(15).text(myJSON, 100, 100);
  });
  generateTableRow(docs, 2, "gfdh", "piou9", "cl3;guer", "h5yij", "jkiumy");
  docs.end();

  transporter
    .sendMail({
      from: '"qwerty" raghavendiran222222@gmail.com', // sender address
      to: "124158084@sastra.ac.in", // list of receivers
      subject: "ifhjdflogh lsgh oi  gosdhg ourhwqo ", // Subject line
      text: "There is a dsfgfdgnew afsdghdfrticle. It's about sending emails,vsfdg check it out!", // plain text body
      html: "<b>There is xgfsdgerwa new article. It's about sending emails, check it out!</b>",
      attachments: [
        {
          filename: "reciept.pdf", // <= Here: made sure file name match
          path: "/Users/raghavendiran/Development/KC/PdfGenerator/reciept.pdf",
          contentType: "application/pdf",
        },
      ], // html body
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "raghavendiran222222@gmail.com",
    pass: "nikgkgvjjzlnwkrs",
  },
});

function generateTableRow(docs, y, c1, c2, c3, c4, c5) {
  docs
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: "right" })
    .text(c4, 370, y, { width: 90, align: "right" })
    .text(c5, 0, y, { align: "right" });
}

app.get("/", (req, res) => {
  getMultiple(db);
  res.send("Hello World!! Mail sent");
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listenting on port ${port}`));
