var mainImage = document.getElementById('main').getElementsByTagName('img');
var thumbImages = document.getElementById("thumbnails").getElementsByTagName('img');

for (i=0; i<thumbImages.length; i++) {
  thumbImages[i].addEventListener("click", changeImage);
};

function changeImage () {
  mainImage[0].src = this.getAttribute("src");
};
