// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc, deleteDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("openpost").addEventListener("click", async () => {
  const doc_id = document.getElementById("postid").value;
  const doc_ref = doc(db, "py_posts", doc_id);
  try {
    const docSnap = await getDoc(doc_ref);
    if (docSnap.exists) {
      const doc = docSnap.data();
      document.getElementById("main").innerHTML = doc.content;
    } else {
      console.log("Document not found!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
});