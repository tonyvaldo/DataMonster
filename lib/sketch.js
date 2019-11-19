var tracker
var w = 640,
  h = 480;
let faceCentered = false;

function setup() {
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('capture ready.')
  });
  capture.elt.setAttribute('playsinline', '');
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();

  noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {

      vertex(positions[i][0], positions[i][1]);
    }

    endShape();

    noStroke();
  textSize(20);
    for (var i = 0; i < positions.length; i++) {
      fill(map(i, 0, positions.length, 0, 360), 50, 100);
      ellipse(positions[i][0], positions[i][1], 4, 4);
      text(i, positions[i][0], positions[i][1]);
    }


  //  smiling amount is in distance of corners of mouth
    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var smile = mouthLeft.dist(mouthRight);

        // line shows a bar showing smiling amount
        rect(20, 20, smile * 3, 20);



  for (var i = 0; i < positions.length; i++) {
    if (positions[i][0] > 100 && positions[i][0] < w - 100 && positions[i][1] > 100 && positions[i][1] < h - 100) {
      faceCentered = true;
    } else {
      faceCentered = false;
      // breaks out of for loop and faceCentered stays false
      break;
    }
  }

  if (!faceCentered) {
    textSize(60);
    fill(0, 0, 0, 10);
    // rectMode(CENTER);
    rect(0, h/2 - 70, w, 100)
    fill(255);
    text("CENTER FACE", 100, h/2);
  }



}
