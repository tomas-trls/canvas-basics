let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

// c.fillStyle = "rgba(30, 200, 40, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(100, 100, 200, 0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(200, 10, 10, 0.5)";
// c.fillRect(300, 300, 100, 100);

// //line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// //Circle / Arc
// // c.beginPath();
// // c.arc(300, 300, 30, 0, Math.PI * 2, false);
// // c.strokeStyle = "blue";
// // c.stroke();

// for (let index = 0; index < 50; index++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255},
//   ${Math.random() * 255}, ${Math.random() + 0.5})`;
//   c.stroke();
// }

const mouse = {
  x: undefined,
  y: undefined,
};

const maxRadius = 50;
const minRadius = 10;
const amountOfCircles = 1000;
let colorArr = ["#A4B494", "#BEC5AD", "#3B5249", "#519872", "#34252F"];
const speed = 3;

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

class Circle {
  constructor(x, y, dx, dy, rad) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.minRadius = rad;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)];

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    };

    this.update = () => {
      if (this.x + this.rad > innerWidth || this.x - this.rad < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.rad > innerHeight || this.y - this.rad < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      //interactivity

      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.rad < maxRadius) {
          this.rad += 1;
        }
      } else if (this.rad > this.minRadius) {
        this.rad -= 1;
      }

      this.draw();
    };
  }
}

let circleArr = [];
const init = () => {
  circleArr = [];
  for (let i = 0; i < amountOfCircles; i++) {
    let rad = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - rad * 2) + rad;
    let y = Math.random() * (innerHeight - rad * 2) + rad;
    let dx = (Math.random() - 0.5) * speed;
    let dy = (Math.random() - 0.5) * speed;
    circleArr.push(new Circle(x, y, dx, dy, rad));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerWidth);
  circleArr.forEach((circle) => {
    circle.update();
  });
};
init();
animate();
