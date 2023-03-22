let mobileNetClassifier;
let video;
let label = "";
let probability=0.0;
let classifier;
let takeImageButton;
let coasterButton;
let trainButton;

function draw(){
  createCanvas(640, 580);
  background(0);

  image(video,0,-50);

  fill(255, 255, 255);
  textSize(24);
  text(label,10, height-10);

  fill(255, 255, 255);
  textSize(24);
  text(parseFloat(probability * 100)+"%",10, height-50);

}

function setup() {
  video = createCapture(VIDEO);
  video.hide();
  
  /** feature extractor */
  mobileNetClassifier = ml5.featureExtractor("MobileNet", video, modelLoaded);
  classifier = mobileNetClassifier.classification(video, videoReady);

  /** adding buttons to capture images and add to classifier with label */
  takeImageButton = createButton("coding book");
  takeImageButton.mousePressed(function(){
    classifier.addImage("codding book");
  });

  coasterButton = createButton("coaster");
  coasterButton.mousePressed(function(){
    classifier.addImage("coaster");
  });

  /** train on added new images */
  trainButton = createButton("train");
  trainButton.mousePressed(function(){
    classifier.train(whileTraining);
  });
}

function whileTraining(loss){
  if(!loss){
    console.log("Done Training")
    classifier.classify(predictResult);
  }
  console.log(loss);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function videoReady() {
  console.log('video Loaded!');
}

/** classify / predict in a loop after training */
function predictResult(error, result){
  if(error){
    console.error(error)
    return ;
  }
  console.log(result);
  label = result[0].label;
  probability = result[1].confidence;

  setTimeout(function() {
    classifier.classify(predictResult);
  }, 1000);
}
