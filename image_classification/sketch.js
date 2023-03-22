let mobileNetClassifier;
let puffin;
let inputElement;
let userImage;

function setup() {
  createCanvas(640, 480);
  background(0);

  inputElement = createFileInput(handleFile);
  inputElement.position(0, 500);
  
  /** pre trained model for image classification */
  mobileNetClassifier = ml5.imageClassifier("MobileNet", modelLoaded);

  /** loading image */
  /*puffin = createImg("images/penguin.jpeg", imageReady);
  puffin.hide();*/

}

function handleFile(file){
  print(file);

  if (file.type === 'image') {
    userImage = createImg(file.data, imageReady);
    userImage.hide();
  } else {
    userImage = null;
  }
  /** prediction */
  mobileNetClassifier.predict(userImage, predictResult);
}

function predictResult(error, results){
  if(error){
    console.error(error)
    return ;
  }

  let max = 0;
  let mostProbablePrediction;
  results.forEach(result => {
    if(result.confidence > max){
      mostProbablePrediction = result;
      max = result.confidence
    }
  });

  console.log("Prediction:");
  console.log("label: %c"+mostProbablePrediction.label,"color:yellow");
  console.log("confidence: "+"%c"+parseFloat(mostProbablePrediction.confidence) * 100 + "%","color:green");
}


function imageReady(){
  image(userImage,0,0, width, height);
}

function modelLoaded() {
  console.log('Model Loaded!');
}