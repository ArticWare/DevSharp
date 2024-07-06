// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6lx-kvf6kkTbSTuFywBGVCs8a0B_ZV-A",
  authDomain: "devsharp-15542.firebaseapp.com",
  projectId: "devsharp-15542",
  storageBucket: "devsharp-15542.appspot.com",
  messagingSenderId: "329676502356",
  appId: "1:329676502356:web:5a97ed37c16b74d462c4c1",
  measurementId: "G-D8H3TC9PMP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pwd");
const repasswordInput = document.getElementById("repwd");
const signupbut = document.getElementById("signupbut");

var email, password;

signupbut.addEventListener("click", function() {
  document.getElementById('wrongpwd').innerHTML='';
  email = emailInput.value;
  password = passwordInput.value;
  var isVerified = true;
  if (emailInput.value==null || passwordInput.value==null || repasswordInput.value==null){
    document.getElementById('wrongpwd').innerHTML='Please fill in all the blanks.';
    isVerified=false;
  }else if (passwordInput.value!=repasswordInput.value){
    document.getElementById('wrongpwd').innerHTML='Password do not match.';
    isVerified=false;
  }
  if(isVerified) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
      if (user!=null){
        window.location.href="../login"
      }
    })
    .catch((error) => {
      console.log(error)
      switch (error.code) {
        case 'auth/email-already-in-use':
          document.getElementById('wrongpwd').innerHTML='Email already in use.';
          break;
        case 'auth/invalid-email':
          document.getElementById('wrongpwd').innerHTML='Please enter a valid Email.';
          break;
        case 'auth/operation-not-allowed':
          document.getElementById('wrongpwd').innerHTML='Error occurred.';
          break;
        case 'auth/weak-password':
          document.getElementById('wrongpwd').innerHTML='Please enter a stronger password.';
          break;
        default:
          document.getElementById('wrongpwd').innerHTML='Error occurred.';
          break;
      }
    });
  }    
});