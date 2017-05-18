var containerWidth = document.getElementById('container').clientWidth;
var imageWrapper = document.getElementsByClassName('wrapper');
var mainImage = document.getElementsByClassName('wrapper-child');
var thumbnailWrapper = document.getElementsByClassName('thumbnail-wrapper');
var thumbImages = document.getElementsByClassName('thumbnail-wrapper-child');
var leftArrow = document.getElementById('left-arrow');
var rightArrow = document.getElementById('right-arrow');

var startThumsbLeft = thumbImages[0].style.left
var startPosition = ((containerWidth / 2) - ((mainImage[0].getElementsByTagName("img")[0].width + 20) / 2)) + "px";

var currentThumbsLeft = [startThumsbLeft];
var mainImagesWidth = [];
var clickedThumbIndex = [];
var thumbnailsIndex = [];
var sliderPosition = [startPosition, startPosition];

// Event listeners

leftArrow.addEventListener("click", slideThumbsLeft);
rightArrow.addEventListener("click", slideThumbsRight);

for (i=0; i<thumbImages.length; i++) {
  thumbImages[i].addEventListener("click", slideImage);
  thumbnailsIndex.push(thumbImages[i]);
};

// Slides thumbnails left

function slideThumbsLeft () {
  var y = currentThumbsLeft[currentThumbsLeft.length - 1].slice("p", -2);
  for (i=0; i<thumbImages.length; i++) {
    thumbImages[i].style.left = y - containerWidth / 4 + "px";
  }
  currentThumbsLeft.push(thumbImages[0].style.left);
};

// Slides thumbnails right

function slideThumbsRight () {
  var y = currentThumbsLeft[currentThumbsLeft.length - 1].slice("p", -2);
  for (i=0; i<thumbImages.length; i++) {
    thumbImages[i].style.left = y + containerWidth / 4 + "px";
  }
  currentThumbsLeft.push(thumbImages[0].style.left);
};

// Changes the images src

function changeImage () {
  mainImage[0].getElementsByTagName("img")[0].src = this.getElementsByTagName("img")[0].getAttribute("src");
};

// Slides the main image when the thumbnail is clicked

function slideImage () {
  // Collects the indexes of images before the clicked image
  var beforeImages = 0;
    for (cur = 0; cur < thisIndex(this); cur++) {
      beforeImages = beforeImages + (mainImage[cur].getElementsByTagName("img")[0].width + 20)
    };
  var distance = (beforeImages + ((mainImage[thisIndex(this)].getElementsByTagName("img")[0].width + 20) / 2) - (containerWidth / 2)) * -1;
  if (this == thumbImages[0]) {
    distance = ((containerWidth / 2) - ((mainImage[0].getElementsByTagName("img")[0].width + 20) / 2));
  };
  var curDistance = distance + "px";
  sliderPosition.push(distance);
  for (i=0; i<thumbImages.length - 1; i++) {
    //mainImage[i].style.left = curDistance;
    animateImage (sliderPosition[sliderPosition.length - 2], distance, 50);
    //mainImage[i].style.opacity = 0.2;
    if (mainImage[i] == mainImage[thisIndex(this)])
      mainImage[i].style.opacity = 1;
  };
}

document.onreadystatechange = function () {
  for (i=0; i<mainImage.length; i++) {
    //mainImage[i].style.opacity = 0.2;
    mainImage[0].style.opacity = 1;
    mainImage[i].style.left =  startPosition;
  };
};

// Collects main images widths in mainImagesWidth array

for (i = 0; i < mainImage.length; i++) {
  mainImagesWidth.push(mainImage[i].getElementsByTagName("img")[0].width);
}

// Returns clicked index

function thisIndex(elm) {
  for (x = 0; x < mainImage.length; x++) {
    if (thumbImages[x] == elm)
    clickedThumbIndex.push(x);
    // When the clicked element is found in the array its index is returned
      if (elm == thumbnailsIndex[x])
      return clickedThumbIndex.pop();
    //  return i;
  }
};

function animateImage (start, stop, step) {
  var y = start;
  var id = setInterval(frame, 1);
  function frame() {
    if (start > stop) {
      if (y < stop + step) {
        for (i=0; i<thumbImages.length - 1; i++) {
          mainImage[i].style.left = stop + "px";
        }
        clearInterval(id);
      }
      else {
        y = y - step;
        for (i=0; i<thumbImages.length - 1; i++) {
          mainImage[i].style.left = y + "px";
        }
      }
    }
    else {
      if (y > stop - step) {
        for (i=0; i<thumbImages.length - 1; i++) {
          mainImage[i].style.left = stop + "px";
        }
        clearInterval(id);
      }
      else {
        y = y + step;
        for (i=0; i<thumbImages.length - 1; i++) {
          mainImage[i].style.left = y + "px";
        }
      }
    }
  }
};
