// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
var uid;
onAuthStateChanged(auth,function(user) {
  uid=user.uid;
});
async function addpost(){
    document.getElementById("wrongpwd").innerHTML="";
    var etitle = document.getElementById("title");
    var edesc = document.getElementById("desc");
    if (etitle.value.length<150 && edesc.value.length<750){
      const docData = {
          title: String(etitle.value),
          desc: String(edesc.value),
          author: uid
      };
      document.getElementById("wrongpwd").style.color='red';
      try {
          await setDoc(doc(db, "posts", String(title.value)), docData);
          document.getElementById("wrongpwd").style.color='green';
          document.getElementById("wrongpwd").innerHTML="Post created successfully!";
        } catch (error) {
          if (error.code === "permission-denied") {
            document.getElementById("wrongpwd").innerHTML="Insufficient permissions to write data";
          } else {
            document.getElementById("wrongpwd").innerHTML="Error writing data: "+ error;
          }
        }
    }else{
      document.getElementById("wrongpwd").innerHTML="Title must be under 150 words and description must be under 750 words.";
      etitle.value="";
      edesc.value="";
    }
}

document.getElementById("submit").addEventListener("click", addpost);