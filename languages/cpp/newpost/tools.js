function addh1(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("h1");
    h1.innerHTML="Example h1";
    text.appendChild(h1);
}
function addh2(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("h2");
    h1.innerHTML="Example h2";
    text.appendChild(h1);
}
function addh3(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("h3");
    h1.innerHTML="Example h3";
    text.appendChild(h1);
}
function addh4(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("h4");
    h1.innerHTML="Example h4";
    text.appendChild(h1);
}
function addh5(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("h5");
    h1.innerHTML="Example h5";
    text.appendChild(h1);
}
function addh5(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("h5");
    h1.innerHTML="Example h5";
    text.appendChild(h1);
}
function addp(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("p");
    h1.innerHTML="Example paragraph";
    text.appendChild(h1);
}
function addul(){
    var text=document.getElementById("textcuzwhynot");

    var h1=document.createElement("h1");
    h1.innerHTML="Example list";
    text.appendChild(h1);

    var ul=document.createElement("ul");

    var item=document.createElement("li");
    item.innerHTML="Example list item";
    ul.appendChild(item);

    var item=document.createElement("li");
    item.innerHTML="Example list item";
    ul.appendChild(item);
    
    var item=document.createElement("li");
    item.innerHTML="Example list item";
    ul.appendChild(item);
    
    var item=document.createElement("li");
    item.innerHTML="Example list item";
    ul.appendChild(item);
    
    var item=document.createElement("li");
    item.innerHTML="Example list item";
    ul.appendChild(item);

    text.appendChild(ul);
}
function addvid(){
    var text=document.getElementById("textcuzwhynot");
    
    var width=prompt("Enter Width");
    var height=prompt("Enter Height");
    var source=prompt("Enter Video Code (eg : 4WXs3sKu41I)")
    var vid=document.createElement("iframe")
    vid.width=width;
    vid.height=height;
    vid.src="https://www.youtube.com/embed/"+source;

    text.appendChild(vid);
}
function addimg(){
    var text=document.getElementById("textcuzwhynot");
    
    var width=prompt("Enter Width");
    var height=prompt("Enter Height");
    var source=prompt("Enter Image Link (ends with .png / .jpg / ... )")
    var vid=document.createElement("img")
    vid.width=width;
    vid.height=height;
    vid.src=source;

    text.appendChild(vid);
}
function addita(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("i");
    h1.innerHTML="Example italic text";
    text.appendChild(h1);
}
function addbold(){
    var text=document.getElementById("textcuzwhynot");
    var h1=document.createElement("b");
    h1.innerHTML="Example bold text";
    text.appendChild(h1);
}

window.addEventListener('beforeunload',
    function (e) {
        e.preventDefault();
    }
);