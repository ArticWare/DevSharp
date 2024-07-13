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

async function acceptPost(id,content,author,writer){
  const data = {
    author:String(author),
    content:String(content),
    writer:String(writer)
  }
  await setDoc(doc(db, "v_py_posts", id),data);
  await deleteDoc(doc(db, "py_posts", id));
  location.reload();
}

async function deletePost(id){
  await deleteDoc(doc(db, "py_posts", id));
  location.reload()
}

async function openPost(doc_id,content,author,writer){
  const doc_ref = doc(db, "py_posts", doc_id);
  try {
    const docSnap = await getDoc(doc_ref);
    if (docSnap.exists) {
      const doc = docSnap.data();
      document.getElementById("id").innerHTML = "ID : "+doc_id;
      var div=document.getElementById("panel");
      var accept=document.createElement("button");
      accept.className="button7";
      var accepttext=document.createElement("h2");
      accepttext.innerHTML="Accept post";
      accept.appendChild(accepttext);
      accept.onclick=function(){acceptPost(doc_id,content,author,writer)};
      div.appendChild(accept);

      var reject=document.createElement("button");
      reject.className="button4";
      var rejecttext=document.createElement("h2");
      rejecttext.innerHTML="Reject post";
      reject.onclick=function(){deletePost(doc_id)}
      reject.appendChild(rejecttext);
      div.appendChild(reject);
      document.getElementById("main").innerHTML = doc.content;
    } else {
      console.log("Document not found!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }  
}

onAuthStateChanged(auth,async function(user) {
  if (!user) {
    window.location.href=notsignedin;
  }else{
    const admins = await getDocs(collection(db,"admins"));
    var isadmin=false;
    admins.forEach(async (doc) => {
        if (doc.id==user.uid){
          isadmin=true;
          const q = query(collection(db,"py_posts"), limit(1));
          onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                const data=doc.data();
                openPost(doc.id,String(data.content),String(data.author),String(data.writer));
            });
          });
        }
    });
    if (!isadmin){
      window.location.href="/home";
    }
  }
  });