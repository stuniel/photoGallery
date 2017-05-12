var imageWrapper = document.getElementsByClassName('wrapper');
var mainImage = document.getElementsByClassName('wrapper-child');
var thumbImages = document.getElementsByClassName('thumbnail-wrapper-child');

for (i=0; i<thumbImages.length; i++) {
  thumbImages[i].addEventListener("click", slideImage);
};

// Changes the images src

function changeImage () {
  mainImage[0].getElementsByTagName("img")[0].src = this.getElementsByTagName("img")[0].getAttribute("src");
};

// Slides the main image when the thumbnail is clicked

function slideImage () {
  var index = mainImage.indexOf(this);
  var distance = mainImage[index].clientWidth;
    for (i=0; i<thumbImages.length; i++) {
      mainImage[i].style.left = "-" + distance + "px";
    };
}

mainImage[0].addEventListener("drag", scrollImage);

function scrollImage () {
  this.style.marginLeft = (100 * event.pageX)/window.innerWidth + "%"
}

document.onreadystatechange = function () {
  for (i=0; i<mainImage.length; i++) {
  mainImage[i].style.left =  ((window.innerWidth / 2) - (mainImage[0].getElementsByTagName("img")[0].width / 2)) + "px";
};
};
