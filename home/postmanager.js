// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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
const auth = getAuth(app);
var uid;
onAuthStateChanged(auth,async function(user) {
  if (user){
    uid=user.uid;
  }
});
async function deletePost(title){
  await deleteDoc(doc(db, "posts", title));
  location.reload()
}
function addPost(title, desc, writer,author){
  if (title.length<=150 && desc.length<=750){
      var posts = document.getElementById("posts");

      let post = document.createElement("div");
      post.className="post";

      let titlepost = document.createElement("div");
      titlepost.className="titlepost";
      post.appendChild(titlepost);
      let titletext = document.createElement("h1");
      titletext.className="titleposttext";
      titletext.innerHTML=title;
      titlepost.appendChild(titletext);
      
      let desctext = document.createElement("h2");
      desctext.className="posttext";
      desctext.innerHTML=desc;
      post.appendChild(desctext);
      var authort=document.createElement("h4");
      authort.className="posttext"
      authort.innerHTML="Author : "+writer;
      post.appendChild(authort);

      posts.appendChild(document.createElement("p"));
      posts.appendChild(post);
      var delpost=document.createElement("button");
      delpost.className="button4";
      var rejecttext=document.createElement("h4");
      rejecttext.innerHTML="Delete";
      delpost.onclick=function(){deletePost(title)}
      delpost.appendChild(rejecttext);
      if (author==uid){
        posts.append(delpost);
      }
  }
}
const q = query(collection(db,"posts"), orderBy("date"), limit(10));
onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
      var data = doc.data();
      if (!data.hidden){
        addPost(data.title,data.desc,data.writer,data.author);
      }
  });
});