// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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

async function acceptPost(title,desc,writer,author,time){
  const data={
    title: title,
    desc: desc,
    author: author,
    writer: writer,
    date: String(time),
    hidden: false
  };
  await setDoc(doc(db, "posts", title), data);
  location.reload()
}

async function deletePost(title){
  await deleteDoc(doc(db, "posts", title));
  location.reload()
}

function addPost(title, desc, writer, author, time){
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
      var uidtext=document.createElement("h4");
      uidtext.className="posttext"
      uidtext.innerHTML="UID : "+author;
      post.appendChild(uidtext);      

      var div=document.createElement("div");
      div.style.textAlign="center";

      var accept=document.createElement("button");
      accept.className="button2";
      accept.style.backgroundColor='lime';
      var accepttext=document.createElement("h2");
      accepttext.innerHTML="Accept post";
      accept.appendChild(accepttext);
      accept.onclick=function(){acceptPost(title,desc,writer,author,time)};
      div.appendChild(accept);

      var reject=document.createElement("button");
      reject.className="button2";
      var rejecttext=document.createElement("h2");
      rejecttext.innerHTML="Reject post";
      reject.style.backgroundColor='red';
      reject.onclick=function(){deletePost(title)}
      reject.appendChild(rejecttext);
      div.appendChild(reject);

      post.appendChild(div);

      posts.appendChild(document.createElement("p"));
      posts.appendChild(post);
  }
}

onAuthStateChanged(auth,async function(user) {
  if (!user) {
      window.location.href=notsignedin;
  }else{
    const admins = await getDocs(collection(db,"admins"));
    var isadmin=false;
    admins.forEach(async (doc) => {
        var data = doc.data();
        if (data.uid == user.uid){
          isadmin=true;
          const q = query(collection(db,"posts"), orderBy("date"), limit(10));
          onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.hidden){
                  addPost(data.title,data.desc,data.writer,data.author,data.time);
                }
            });
          });
        }
    });
    if (!isadmin){
      window.location.href="../home";
    }
  }
  });