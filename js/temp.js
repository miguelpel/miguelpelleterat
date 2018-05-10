var currentSliderNbr = 1;
var currentSlideNbr = 1;
var currentSlide = slider["slide_" + currentSliderNbr];
var slideLength = currentSlide.length;
var text = currentSlide['txt_' + currentSlideNbr];
var lineNbr = 0;
var line = text[lineNbr];
var char = 0;
var output = document.getElementById("output_" + currentSlideNbr);
output.style.opacity = 1;
output.innerHTML = "";
var consoleTyper;
// To stock the setTimeOut, and clear them if needed
var waiter;
var lastScrollTop = 0;
var characterDone = false;
var character;
var characterOutputs = document.querySelectorAll(".character");
var characterOutput = characterOutputs[currentSlideNbr - 1];
var aboutbtn = document.getElementById('AboutWork');
// here, load the pictures in the css urls
let sliderImages = document.querySelectorAll('.slide');
var bttns = document.querySelectorAll("li");
bttns[0].addEventListener('click', goTo);
loadPictures(currentSlide);
if (aboutbtn) changeAboutButton(currentSlide);
startSlide();


// the interval of the text reader.
function startText() {
    consoleTyper = setInterval(readText, 80);
}

// Ajouter que le boutton renvoie à la page s'il est cliqué
// tandis que le slider est en train de jouer.
function changeSlider(nbr) {

    let i = 0;
    for (i = 0; i < bttns.length; i++) {
        bttns[i].classList.remove('active');
        bttns[i].removeEventListener('click', goTo);
    }
    bttns[nbr - 1].classList.add('active');
    bttns[nbr - 1].addEventListener('click', goTo);
    if (nbr === currentSliderNbr) return
    else {
        reset();
        currentSliderNbr = nbr;
        currentSlideNbr = 1;
        currentSlide = slider["slide_" + currentSliderNbr];
        slideLength = currentSlide.length;
        loadPictures(currentSlide);
        if (aboutbtn) changeAboutButton(currentSlide);
        startSlide();
    }
};

function loadPictures(slideObj) {
    var i;
    var htmlSlide;
    for (i = 1; i <= slideLength; i++) {
        // get the HTML object
        htmlSlide = document.getElementById('slide' + i);
        // set the url of the image
        var img = slideObj.paths["img_" + i];
        htmlSlide.style.backgroundImage = "url(" + img + ")";
    }
}

function readText() {
    if (character) {
        if (char < character.length) {
            characterOutput.innerHTML += character[char];
            char += 1;
        } else {
            character = "";
            char = 0;
        }
    }
    if (!character) {
        if (char < line.length) {
            output.innerHTML += line[char];
            char += 1;
        } else if (lineNbr < text.length) {
            output.innerHTML += '<br>';
            char = 0;
            lineNbr += 1;
            if (text[lineNbr]) line = text[lineNbr];
            else {
                lineNbr = 0;
                line = "";
                char = 0;
                //output.style.opacity = 0;
                clearInterval(consoleTyper);
                ///here call to change the slide
                //setTimeout(nextSlide, 3000);
                // makes the text stays, and go entirely with the picture change
                // CLEAR setTimeOut if change slide, or change slider!!!
                waiter = setTimeout(function() {
                    nextSlide();
                }, 3000);
            }
        }
    }
};

function reset() {
    // reset the texts
    clearTimeout(waiter);
    clearInterval(consoleTyper);
    characterOutput.innerHTML = "";
    characterOutput.style.opacity = 0;
    character = "";
    output.style.opacity = 0;
    // reset the images
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = 'none';
        sliderImages[i].style.opacity = '0';
    }
    setText();
}

function startSlide() {
    reset();
    sliderImages[0].style.display = 'block';
    sliderImages[0].style.opacity = '1';
    // En attendant de trouver mieux, retarde l'apparition du texte à l'ouverture
    waiter = setTimeout(startText, 500);
}

function nextSlide() {
    if (currentSlideNbr < slideLength) {
        currentSlideNbr++;
    } else {
        currentSlideNbr = 1;
    }
    reset();
    sliderImages[currentSlideNbr - 1].style.display = 'block';
    sliderImages[currentSlideNbr - 1].style.opacity = '1';
    waiter = setTimeout(startText, 500);
}

function setText() {
    text = currentSlide['txt_' + currentSlideNbr];
    output = document.getElementById("output_" + currentSlideNbr);
    characterOutput = characterOutputs[currentSlideNbr - 1];
    if (text.character) {
        console.log('set character: ' + text.character);
        character = text.character;
        text = text.content;
    };
    lineNbr = 0;
    line = text[lineNbr];
    char = 0;
    characterOutput.style.opacity = 1;
    output.style.opacity = 1;
    output.innerHTML = "";
}

function changeAboutButton(currentSlideObj) {
    var pieceName = currentSlideObj.name;
    aboutbtn.innerHTML = 'En savoir plus sur ' + pieceName;
    // a décommenter quand les pages sont prètes.
    aboutbtn.href = currentSlideObj.url;
}

function goTo() {
    document.location.href = currentSlide.url;
}