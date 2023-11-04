var canvas = document.getElementById("star-canvas");
var widthAnim = document.getElementsByClassName('outer')[0].offsetWidth;
var heightAnim = document.getElementsByClassName('outer')[0].offsetHeight;
canvas.width = widthAnim;
canvas.height = heightAnim;
var c = canvas.getContext("2d");

function Star(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.closePath();
    c.fillStyle = "white";
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > widthAnim) {
      this.x = 0;
    } else if (this.y + this.radius < 0) {
      this.y = heightAnim;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

function ShootingStar(sx, sy) {
  this.sx = sx;
  this.sy = sy;
  this.sdx = 10;
  this.sdy = -5;
  this.radius = 2;

  this.draw = function() {
    c.beginPath();
    c.moveTo(this.sx, this.sy);
    c.lineTo(this.sx + 50, this.sy + 10);
    c.strokeStyle = "rgba(255,255,255,0.5)";
    c.stroke();
  };

  this.update = function() {
    if (this.sx + this.radius > widthAnim) {
    } else if (this.sy + this.radius > heightAnim) {
    } else {
      this.sx += 50;
      this.sy += 10;

      this.draw();
    }
  };
}

var starsArray = [];
var shootingStarsArray = [];

for (let i = 0; i < widthAnim / 2; i++) {
  var x = Math.random() * widthAnim;
  var y = Math.random() * heightAnim;
  var dy = -Math.random() / 10;
  var dx = -dy * 2;
  var radius = Math.random() * 2;

  starsArray.push(new Star(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, widthAnim, heightAnim);
  for (var i = 0; i < starsArray.length; i++) {
    starsArray[i].update();
  }
  for (var i = 0; i < shootingStarsArray.length; i++) {
    shootingStarsArray[i].update();
  }
}

animate();

var int = setInterval(function() {
  shootingStarsArray = [];
  var sx = Math.random() * (widthAnim / 2);
  var sy = Math.floor(Math.random() * (heightAnim / 2));
  shootingStarsArray.push(new ShootingStar(sx, sy));
}, 3000);
