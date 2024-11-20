const express = require("express");
const path = require("path");
require("dotenv").config({ path: "./secret/.env" });
const firebase = require("firebase/app");
require("firebase/auth");

const app = express();
const PORT = process.env.PORT || 3000;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

app.get("/firebase-config", (req, res) => {
    res.json(firebaseConfig);
})

app.use(express.static(path.join(__dirname, "src", "pages")));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'src', 'styles')));
app.use('/js', express.static(path.join(__dirname, 'src', 'js')));

// Default page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "pages", "login.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
