var imageWrapper = document.getElementsByClassName('wrapper');
var mainImage = document.getElementsByClassName('wrapper-child');
var thumbImages = document.getElementsByClassName('thumbnail-wrapper-child');
var mainImagesWidth = [];
var clickedThumbIndex = [];
var thumbnailsIndex = [];

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
    for (cur = 0; cur < thisIndex(this); cur++) {
      beforeImages = beforeImages + mainImage[cur].getElementsByTagName("img")[0].width
    };
  var distance = (beforeImages + (mainImage[thisIndex(this)].getElementsByTagName("img")[0].width / 2) - (window.innerWidth / 2)) * -1;
  if (this == thumbImages[0]) {
    distance = ((window.innerWidth / 2) - (mainImage[0].getElementsByTagName("img")[0].width / 2));
  };
  for (i=0; i<thumbImages.length - 1; i++) {
    mainImage[i].style.left = distance + "px";
    mainImage[i].style.opacity = 0.3;
    if (mainImage[i] == mainImage[thisIndex(this)])
      mainImage[i].style.opacity = 1;
  };
}

document.onreadystatechange = function () {
  for (i=0; i<mainImage.length; i++) {
    mainImage[i].style.opacity = 0.3;
    mainImage[0].style.opacity = 1;
    mainImage[i].style.left =  ((window.innerWidth / 2) - (mainImage[0].getElementsByTagName("img")[0].width / 2)) + "px";
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
