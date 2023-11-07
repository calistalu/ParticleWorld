let NUM_OF_PARTICLES = 600;
let NUM_OF_PARTICLES2 = 300;

let particles = [];
let particles1 = [];
let particles2 = [];


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(
      map(i, 0, NUM_OF_PARTICLES, 0, width) * 1.5,
      200,
      0
    );
  }

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles1[i] = new Particle(
      map(i, 0, NUM_OF_PARTICLES, 0, width) * 1.5,
      10,
      500
    );
  }

  for (let i = 0; i < NUM_OF_PARTICLES2; i++) {
    particles2[i] = new Particle2(random(0, width * 1.5), 10);
  }
}

function draw() {

  background(0,10);

  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update(particles);
    p.display();
    p.glow()
  }

  if (frameCount > 500) {
    for (let i = 0; i < particles1.length; i++) {
      let p = particles1[i];
      p.update(particles1);
      p.display();
      p.glow()
    }
  }

  if (frameCount > 800) {
    for (let i = 0; i < particles2.length; i++) {
      let p = particles2[i];
      p.update(particles2);
      p.display();
       p.glow()
    }
  }
}

class Particle {
  
  constructor(startX, startY, starttime) {
    this.x = startX;
    this.movex1 = startX;
    this.movex2 = startX;
    this.y1 = 0;
    this.y2 = 0;
    this.y3 = 0;
    this.y = startY;
    this.dia = 3;
    this.ns = 0;
    this.yoff = 0;
    this.ron = 1;
    this.spd = 2;
    this.shouldSlowDown = false;
    this.time = starttime;
    this.a=0
  }

  update() {
    this.y1 = sin(600 * this.movex1) * 10;
    this.y2 = cos(400 * this.movex2) * 30;
    this.movex1 += 0.0001;
    this.movex2 -= 0.0001;
    this.y = this.y1 + this.y2 + this.y3 + 3 * sin(frameCount * 0.1);

    this.ns = noise(this.yoff);
    this.yoff += 0.01;
    this.y3 += this.ns * this.spd;

    if (frameCount % 800 == this.time) {
      this.y3 = 0;
      this.ron += 1;
    }
  }
  
  glow() {
    let a1 = sin(frameCount * random(0.1, 0.5)) *255;
    this.a = a1;
  }

  display() {
    push();
    rotate((3 * PI) / 4);
    translate(this.x - 400, this.y - 850);
    noStroke();
    fill(
      map(this.y, 0, height * 1.5, 80, 160),
      map(this.y, 0, height * 1.5, 80, 210),
      255,this.a
    );
    circle(0, 0, this.dia);

    pop();
  }
}

class Particle2 {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 2;
    this.ns = 0;
    this.yoff = random(0, 1000);
    this.ron = 1;
    this.spd = 2;
    this.shouldSlowDown = false;
    this.a=0
  }

  update(others) {
    this.ns = noise(this.yoff);
    this.yoff += 0.01;
    this.y += this.ns * this.spd + sin(frameCount * 0.1);

    if (frameCount % 800 == 0) {
      this.y = 0;
      this.ron += 1;
    }

//     for (let i = 0; i < others.length; i++) {
//       if (i !== particles.indexOf(this)) {
//         if (this.ron == others[i].ron) {
//           let distance = this.y - others[i].y;
//           if (distance > 100) {
//             this.shouldSlowDown = true;
//             break;
//           } else {
//             this.shouldSlowDown = false;
//           }
//         }
//       }
//     }

//     if (this.shouldSlowDown) {
//       this.spd -= 0.2;
//       this.spd = constrain(this.spd, 1, 2);
//     } else {
//       this.spd = 2;
//     }
  }
  
  glow() {
    let a1 = sin(frameCount * random(0.1, 0.5))*255;
    this.a = a1;
  }

  display() {
    // particle's appearance
    push();
    rotate((7 * PI) / 4);
    translate(this.x - 400, this.y);

    noStroke();
    fill(map(this.y, 0, height*1.5, 150, 100), map(this.y, 0, height*1.5, 200, 100), 255,this.a);
    circle(0, 0, this.dia);

    pop();
  }
}
