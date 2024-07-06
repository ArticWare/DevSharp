// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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
    auth.currentUser.getIdToken(true);
    document.getElementById("wrongpwd").innerHTML="";
    var etitle = document.getElementById("title");
    var edesc = document.getElementById("desc");
    var writer = document.getElementById("writer");
    var duplicates=false;
    const querySnapshot = await getDocs(collection(db,"posts"));
    querySnapshot.forEach((doc) => {
        if (doc.id==etitle.value){
          duplicates=true;
        }
    });
    if (etitle.value.length>0 && etitle.value.length>0 && writer.value.length>0){
      if (etitle.value.length<150 && edesc.value.length<750){
        if (!duplicates){
          const docData = {
              title: String(etitle.value),
              desc: String(edesc.value),
              writer: String(writer.value),
              author: uid,
              hidden: true
          };
          try {
              await setDoc(doc(db, "posts", String(title.value)), docData);
              alert("Your post is on pending and a moderator will check it soon!");
              window.location.href="../home";
            } catch (error) {
              if (error.code === "permission-denied") {
                if (!auth.currentUser.emailVerified){
                  alert("Your email is not verified yet, redirect you to verify page.");
                  location.href='../verifyemail';
                }else{
                  document.getElementById("wrongpwd").innerHTML="Insufficient permissions to write data";
                }
              } else {
                document.getElementById("wrongpwd").innerHTML="Error writing data: "+ error;
              }
            }
        }else{
          document.getElementById("wrongpwd").innerHTML="A same title is detected, please change your title.";
        }
      }else{
        document.getElementById("wrongpwd").innerHTML="Title must be under 150 words and description must be under 750 words.";
        etitle.value="";
        edesc.value="";
      }
    }else{
      document.getElementById("wrongpwd").innerHTML="Please fill in all the blanks.";
    }
}

document.getElementById("submit").addEventListener("click", addpost);