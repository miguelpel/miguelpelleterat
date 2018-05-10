// Main loop:

//run the text reader
// when text reader is done, 
//(wait for one sec?)
// go to next slide

//// READING APP /////
// 1-indexed
var currentSliderNbr = 1;
// 1-indexed
var currentSlideNbr = 1;
// the current slide is slide_1
// Stock the current slide object
var currentSlide = slider["slide_" + currentSliderNbr];
// slideLength will help to keep track of the length of the slide,
// and stop it then
var slideLength = currentSlide.length;
var consoleTyper;

// here, load the pictures in the css urls

let sliderImages = document.querySelectorAll('.slide');
loadPictures(currentSlide);
startSlide();


// Pour l'instant, ça fait tout bugger
// function changeSlider(nbr) {
//     if (nbr != currentSliderNbr) {
//         document.getElementById("output_" + currentSlideNbr).innerHTML = "";
//         reset();
//         currentSliderNbr = nbr;
//         currentSlideNbr = 1;
//         currentSlide = slider["slide_" + currentSliderNbr];
//         slideLength = currentSlide.length;
//         loadPictures(currentSlide);
//         startSlide();
//     }
// };

function loadPictures(slideObj) {
    var i;
    var htmlSlide;
    for (i = 1; i <= slideLength; i++) {
        // get the HTML object
        htmlSlide = document.getElementById('slide' + i);
        // set the url of the image
        var img = slideObj.paths["img_" + i];
        console.log(img);
        htmlSlide.style.backgroundImage = "url(" + img + ")";
    }
}

// get the setInterval out from the function.
// setInterval(txtReader, 50);
// to make it accessible for the changeSlider function

function txtReader() {
    var text = currentSlide['txt_' + currentSlideNbr];
    var lineNbr = 0;
    var line = text[lineNbr];
    var char = 0;
    var output = document.getElementById("output_" + currentSlideNbr);
    output.style.opacity = 1;
    output.innerHTML = "";
    if (!line) {
        output.style.color = text.color;
        text = text.content;
        line = text[lineNbr];
    }
    var consoleTyper = setInterval(function() {
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
                output.style.opacity = 0;
                clearInterval(consoleTyper);
                ///here call to change the slide
                setTimeout(nextSlide, 3000);
            }
        }
    }, 50);
}

function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = 'none';
    }
}

function startSlide() {
    reset();
    sliderImages[0].style.display = 'block';
    // En attendant de trouver mieux, retarde l'apparition du texte à l'ouverture
    setTimeout(txtReader, 1000);
    //txtReader();
}

function nextSlide() {
    if (currentSlideNbr < slideLength) currentSlideNbr++;
    else currentSlideNbr = 1;
    reset();
    sliderImages[currentSlideNbr - 1].style.display = 'block';
    txtReader();
}



// Here is the first version --working-- for the reading app:
//
// var consoleTyper = setInterval(function() {
//     if (char < line.length) {
//         output.innerHTML += line[char];
//         char += 1;
//     } else if (lineNbr < text1.length) {
//         output.innerHTML += '<br>';
//         char = 0;
//         lineNbr += 1;
//         if (text1[lineNbr]) line = text1[lineNbr];
//         else {
//             lineNbr = 0;
//             line = "";
//             char = 0;
//             output.style.opacity = 0;
//             clearInterval(consoleTyper);
//             ///!!! here call to change the slide !!!
//         }
//     }
// }, 50);

//// END READING APP /////

// 5 - aussi, pour les téléphones, déplacer le menu en haut ou en bas.
// ET réduite la typo pour que ça rentre.
// 6 - On Click, load the corresponding slideShow,
// 7 - Create it,
// 8 - Display it (init)