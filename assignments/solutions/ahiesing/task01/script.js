var pictureIndex = 1;
var pictures = document.getElementsByClassName('picture');
showPicture(pictureIndex);

function plus(num) {
  pictureIndex += num;
  if (pictureIndex > pictures.length) {
    pictureIndex = 1;
  }
  showPicture();
}

function minus(num) {
  pictureIndex -= num;
  if (pictureIndex < 1) {
    pictureIndex = pictures.length;
  }
  showPicture();
}

function showPicture() {
  for (var i = 0; i < pictures.length; i++) {
    pictures[i].style.display = "none";
  }

  pictures[pictureIndex-1].style.display = "block"
  document.getElementById("pictureNum").innerHTML = pictureIndex.toString() + "/" + pictures.length;
}
