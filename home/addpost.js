function addPost(title, desc){
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

    posts.appendChild(document.createElement("p"));
    posts.appendChild(post);
}