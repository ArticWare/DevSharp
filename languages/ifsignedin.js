const notsignedin = '/getstarted';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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
const db = getFirestore(app);

document.getElementById("logout").addEventListener("click",function(){signOut(auth).then(function() {
  window.location.href="/getstarted";
}).catch(function(error) {
  console.error("Error occoured");
});});

onAuthStateChanged(auth,async function(user) {
if (!user) {
    window.location.href=notsignedin;
}else{
  if (user.emailVerified){
    const querySnapshot = await getDocs(collection(db,"admins"));
    querySnapshot.forEach((doc) => {
        var data = doc.data();
        if (data.uid==user.uid){
          var moderation = document.createElement("a");
          moderation.href="../moderation";
          moderation.className="navitems";
          var mh1 = document.createElement("h1");
          mh1.innerHTML="Moderation";
          moderation.appendChild(mh1)
          document.getElementById("header").appendChild(moderation);
        }
    });
  }
}
});