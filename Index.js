var translateY = 0;
var translateX = 0;
var bird = document.querySelector(".bird");
var cage = document.querySelector(".cage_outer");
var CagePos;
var BirdPos;
var tempX = 0;
var tempY = 0;
var cageKey = document.querySelector(".key");
var cageKeyRect;
var keyCount = 0;
var keyLimit = 3;

document.querySelector(".lock_count").textContent = keyLimit;

document.querySelector(".loader").addEventListener("click", function () {
  document.querySelector(".loader").classList.add("remove_loader");
  document
    .querySelector(".background_assets_left")
    .classList.remove("from_left");
  document
    .querySelector(".background_assets_right")
    .classList.remove("from_right");
  document
    .querySelector(".background_assets_down")
    .classList.remove("from_down");
});

window.addEventListener("keyup", function (e) {
  if (e.keyCode == 13)
    document.querySelector(".loader").classList.add("remove_loader");
  document
    .querySelector(".background_assets_left")
    .classList.remove("from_left");
  document
    .querySelector(".background_assets_right")
    .classList.remove("from_right");
  document
    .querySelector(".background_assets_down")
    .classList.remove("from_down");
});

//caging bird
setTimeout(() => {
  document.querySelector(".cage").classList.remove("cage_remove");
}, 10);

//key press event movement
window.addEventListener("keyup", function (event) {
  var key = event.keyCode;
  if (key == 40 || key == 38 || key == 39 || key == 37) {
    if (key == 40) {
      translateY = translateY + 50;
    } else if (key == 38) {
      translateY = translateY - 50;
    } else if (key == 39) {
      translateX = translateX + 50;
      this.document.querySelector(".bird_side").classList.add("turn");
    } else {
      translateX = translateX - 50;
      this.document.querySelector(".bird_side").classList.remove("turn");
    }
    bird.style.transform =
      "translate(" + translateX + "px," + translateY + "px)";
  }

  //check boundaries
  this.setTimeout(() => {
    const CagePos = cage.getBoundingClientRect();
    const BirdPos = bird.getBoundingClientRect();
    if (keyCount == 3) {
    } else if (
      BirdPos.top <= CagePos.top ||
      BirdPos.left <= CagePos.left ||
      BirdPos.right >= CagePos.left + CagePos.width ||
      BirdPos.bottom >= CagePos.top + CagePos.height
    ) {
      event.preventDefault();
      isWait = true;
      translateX = tempX;
      translateY = tempY;
      bird.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
    tempX = translateX;
    tempY = translateY;

    //if got key
    if (
      BirdPos.bottom >= cageKeyRect.top &&
      BirdPos.right >= cageKeyRect.left &&
      BirdPos.left <= cageKeyRect.right &&
      BirdPos.top <= cageKeyRect.bottom
    ) {
      getRandomValue(keyPos);
      keyCount++;
      var bal = keyLimit - keyCount;
      document.querySelector(".lock_count").textContent = bal;
      if (keyCount == 3) {
        cageKey.style.display = "none";
        document.querySelector(".cage").classList.add("cage_remove");
        document.querySelector(".restart_game").style.transform =
          "translateY(0)";
      }
    }
  }, 100);
});

var animations = [
  { ele: "bird-lottie", path: "./animations/bird_8.json" },
  { ele: "bird_one", path: "./animations/bird_5.json" },
  { ele: "parrot", path: "./animations/parrot.json" },
  { ele: "cage_key", path: "./animations/key.json" },
  { ele: "butterfly", path: "./animations/butterfly.json" },
  { ele: "victory", path: "./animations/victory.json" },
];
function loadAnimations() {
  for (let i = 0; i < animations.length; i++) {
    var animation = lottie.loadAnimation({
      container: document.getElementById(animations[i].ele),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: animations[i].path,
    });
  }
}
loadAnimations();

//to get random value of keys
function getRandomValue(key) {
  var posHorz = Math.floor(
    Math.random() * (key.horz.max - key.horz.min + 1) + key.horz.min
  );
  var posVert = Math.floor(
    Math.random() * (key.vert.max - key.vert.min + 1) + key.vert.min
  );
  var translateX = posHorz;
  var translateY = posVert;
  cageKey.style.transform = `translate(${translateX}px, ${translateY}px)`;
  setTimeout(() => {
    cageKeyRect = cageKey.getBoundingClientRect();
  }, 100);
}
const keyPos = {
  horz: { min: 100, max: 600 },
  vert: { min: 100, max: 300 },
};

getRandomValue(keyPos);

//for vertical and horizontal cage lines
var VerticalLine = document.querySelectorAll(".cage_line");
var cageLine = document.querySelector(".cage").getBoundingClientRect();
var cageNoVertical = cageLine.width / 80;
cageNoVertical = Math.round(cageNoVertical);
for (let i = 0; i <= cageNoVertical; i++) {
  var line = document.createElement("span");
  line.classList.add("cage_line");
  if (cageNoVertical == i) {
    line.style.left = "100%";
  } else {
    line.style.left = `${i * 80}px`;
  }
  document.querySelector(".cage").append(line);

  var distance = 80;
}

var cageNoHorizontal = cageLine.height / 80;
cageNoHorizontal = Math.round(cageNoHorizontal);
for (let i = 0; i <= cageNoHorizontal; i++) {
  var line = document.createElement("span");
  line.classList.add("cage_line_hor");
  line.style.top = `${i * 80}px`;
  document.querySelector(".cage").append(line);
  var distance = 80;
}

document.querySelector(".restart_game").addEventListener("click", function () {
  window.location.reload();
});
