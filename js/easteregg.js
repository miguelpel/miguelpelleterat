function easteregg(nbr) {
    // 
    var modal = document.createElement("div");
    var span = document.createElement("span");
    var img = document.createElement("img");
    var x = document.createTextNode("x");
    modal.classList.add("modal");
    span.classList.add("close");
    img.classList.add("modal-content");
    img.src = "https://res.cloudinary.com/miguel-pelleterat/image/upload/v1525959675/miguel-site/bio/sirene.jpg";
    span.appendChild(x);
    span.addEventListener("click", discardeasteregg);
    modal.appendChild(span);
    modal.appendChild(img);
    document.body.appendChild(modal);
    console.log("easter egg!");
}

function discardeasteregg() {
    var mod = document.querySelectorAll(".modal");
    for (var i = 0; i < mod.length; i++) document.body.removeChild(mod[i]);
    return false;
}