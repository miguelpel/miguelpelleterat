function easteregg(nbr) {
    var modal = document.createElement("div");
    var span = document.createElement("span");
    var video = document.createElement("video");
    var source = document.createElement("source");
    var x = document.createTextNode("x");
    modal.classList.add("modal");
    span.classList.add("close");
    video.classList.add("modal-content");
    video.width = "320";
    video.height = "240";
    video.autoplay = true;
    video.controls = true;
    // video.loop = true;
    video.innerHTML = "Your browser does not support the video tag.";
    source.src = "../images/pendus/video-pendus.mp4";
    source.type = "video/mp4";
    span.appendChild(x);
    span.addEventListener("click", discardeasteregg);
    modal.appendChild(span);
    video.appendChild(source);
    modal.appendChild(video);
    document.body.appendChild(modal);
}

function discardeasteregg() {
    var mod = document.querySelectorAll(".modal");
    for (var i = 0; i < mod.length; i++) document.body.removeChild(mod[i]);
    return false;
}