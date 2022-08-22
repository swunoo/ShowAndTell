// Zoom Annotations (Basic)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/157-zoom-annotations.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/EaioB_iJs
// Final: https://editor.p5js.org/codingtrain/sketches/ELpl_VAqs

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './model/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

let question;
let questionFade = 0;


let conti = true;
document.querySelector('#stopBtn').addEventListener('click', e => {
    conti = false;
})



// Load the model first
function preload() {
    classifier = ml5.imageClassifier('./model/model.json');
    console.dir(classifier);
    classifier.then(res => {
        console.log(res);
        classifier = res;
        classifyVideo();

    })
    question = loadImage('question.png');
}

function setup() {
    createCanvas(1000, 500);
    // Create the video
    video = createCapture(VIDEO);
    video.size(160, 100);
    video.hide();

    // Start classifying
}

function draw() {
    background(0, 255, 0);
    imageMode(CORNER);

    // Draw the video
      tint(255);
    flippedVideo = ml5.flipImage(video);

    // image(flippedVideo, 0, 0);


    if (label == 'Question') {
        questionFade = 255;
    }
    if (questionFade > 0) {
        tint(255, questionFade);
        image(question, 0, 0, 100, 70);
        questionFade -= 10;
    }
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    if(conti){
        document.querySelector('#resultText').textContent = label;
        // Classifiy again!
        classifyVideo();
    }
}
