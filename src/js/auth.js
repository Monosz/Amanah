import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// // // // // CLIENT-SIDE // // // // // //

// add temporary firebaseConfig here for testing...
// const firebaseConfig = {};
// // // // // // // // // // // // // // // // // //

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const database = getDatabase(app);

// // // // // // // // // // // // // // //

// // // // // SERVER-SIDE // // // // // //

var auth;
var database;

fetch("/firebase-config")
  .then((response) => response.json())
  .then((firebaseConfig) => {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
  })
  .catch((error) => {
    console.log("Error fetching firebaseConfig: ", error);
  });

// // // // // // // // // // // // // // //

function registerAuth() {
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (
    !validateField(username) ||
    !validateField(email) ||
    !validateField(password)
  ) {
    alert(
      "Tolong pastikan nama pengguna, alamat email, dan kata sandi telah diisi."
    );
    return;
  }

  if (!validateEmail(email)) {
    alert("Tolong pastikan alamat email benar.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Tolong buat password dengan setidaknya 8 karakter.");
    return;
  }

  // Firebase authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        uid: user.uid,
        username: username,
        email: user.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      window.location.href = "login.html";
      alert(
        "User berhasil didaftarkan, silahkan login dengan akun yang telah dibuat."
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
      return;
    });
}

function loginAuth() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!validateField(email) || !validateField(password)) {
    alert("Tolong pastikan alamat email dan kata sandi telah diisi.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in: ", user);

      alert("Login berhasil.");
      window.location.href = "home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
      return;
    });
}

window.registerAuth = registerAuth;
window.loginAuth = loginAuth;

// Validate email
function validateEmail(email) {
  const regex = /^[^@]+@\w+(\.\w+)+\w$/;
  return regex.test(email);
}

// Validate password (8 characters)
function validatePassword(password) {
  return password.length >= 8;
}

// Validate field is not empty
function validateField(field) {
  return field != null && field.length > 0;
}
