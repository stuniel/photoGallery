var containerWidth = document.getElementById('container').clientWidth;
var imageWrapper = document.getElementsByClassName('wrapper');
var mainImage = document.getElementsByClassName('wrapper-child');
var thumbImages = document.getElementsByClassName('thumbnail-wrapper-child');

var startPosition = ((containerWidth / 2) - (mainImage[0].getElementsByTagName("img")[0].width / 2)) + "px";

var mainImagesWidth = [];
var clickedThumbIndex = [];
var thumbnailsIndex = [];
var sliderPosition = [startPosition, startPosition];

for (i=0; i<thumbImages.length; i++) {
  thumbImages[i].addEventListener("click", slideImage);
  thumbnailsIndex.push(thumbImages[i]);
};

// Changes the images src

function changeImage () {
  mainImage[0].getElementsByTagName("img")[0].src = this.getElementsByTagName("img")[0].getAttribute("src");
};

// Slides the main image when the thumbnail is clicked

function slideImage () {
  // Collects the indexes of images before the clicked image
  var beforeImages = 0;
  var previousDistance = mainImage[0].style.left.slice("p", -2);
    for (cur = 0; cur < thisIndex(this); cur++) {
      beforeImages = beforeImages + mainImage[cur].getElementsByTagName("img")[0].width
    };
  var distance = (beforeImages + (mainImage[thisIndex(this)].getElementsByTagName("img")[0].width / 2) - (containerWidth / 2)) * -1;
  if (this == thumbImages[0]) {
    distance = ((containerWidth / 2) - (mainImage[0].getElementsByTagName("img")[0].width / 2));
  };
  var curDistance = distance + "px";
  sliderPosition.push(distance);
  for (i=0; i<thumbImages.length - 1; i++) {
    //mainImage[i].style.left = curDistance;
    animateImage (sliderPosition[sliderPosition.length - 2], distance, 50);
    mainImage[i].style.opacity = 0.3;
    if (mainImage[i] == mainImage[thisIndex(this)])
      mainImage[i].style.opacity = 1;
  };
}

document.onreadystatechange = function () {
  for (i=0; i<mainImage.length; i++) {
    mainImage[i].style.opacity = 0.3;
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
  };
  console.log(start, stop, step, start - stop)
};
