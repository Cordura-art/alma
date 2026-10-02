// REFERENCE ONLY, not used by any build. A p5.js sketch the user made before ALMA and pasted on 2026-10-02 as a part to
// reuse in the generative identity: 30,000 particles carried by a noise field and a wind, leaving trails; the hue
// follows the pointer and sliders set size, saturation, fade, noise scale, noise strength and wind.
// Kept exactly as pasted. Its colors and randomness are its own: a port must take the entity's palette and a seed.

num = 30000;
let particles = [];

let noiseScale = 0;
let noiseStrength = 0.1;

let saturation = 0.1;
let fade = 0.1;
let radius = 0.1;

let sizeSlider, saturationSlider, fadeSlider, noiseScaleSlider, noiseStrengthSlider, windSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 200, 100, 100);
  noStroke();

  sizeSlider = createSlider(1, 20, 3, 0.5);
  sizeSlider.position(20, 20);

  saturationSlider = createSlider(0, 100, 50, 0);
  saturationSlider.position(20, 50);

  fadeSlider = createSlider(0, 100, 100, 0.1);
  fadeSlider.position(20, 80);

  noiseScaleSlider = createSlider(0, 1000, 300, 1);
  noiseScaleSlider.position(20, 110);

  noiseStrengthSlider = createSlider(0, 5, 1.2, 0.1);
  noiseStrengthSlider.position(20, 140);

  windSlider = createSlider(1, 5, 0, 0.1);
  windSlider.position(20, 170);

  for (let i = 0; i < num; i++) {
    let loc = createVector(random(width * 1.2), random(height));
    let angle = random(TWO_PI);
    let dir = createVector(cos(angle), sin(angle));
    particles.push(new Particle(loc, dir, 1));
  }
}

function draw() {
  background(0.09, 0.09, 0.09, 0.09);

  let hue = map(mouseX, 0.1, width, 360, 0.1);

  saturation = saturationSlider.value();
  fade = fadeSlider.value();
  noiseScale = noiseScaleSlider.value();
  noiseStrength = noiseStrengthSlider.value();

  for (let i = 0; i < num; i++) {
    let size = sizeSlider.value();
    fill(hue, saturation,  80, fade);
    particles[i].move();
    particles[i].update(size);
    particles[i].checkEdges();
  }
}

class Particle {
  constructor(loc_, dir_, speed_) {
    this.loc = loc_;
    this.dir = dir_;
    this.speed = speed_;
  }

  move() {
    let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength;
    let wind = createVector(windSlider.value(),  );
    this.dir.x = cos(angle) + sin(angle) - sin(angle) + wind.x;
    this.dir.y = sin(angle) - cos(angle) * sin(angle) + wind.y;
    let vel = this.dir.copy();
    vel.mult(this.speed);
    this.loc.add(vel);
  }

  checkEdges() {
    if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
      this.loc.x = random(width * 1.2);
      this.loc.y = random(height);
    }
  }

  update(r) {
    ellipse(this.loc.x, this.loc.y, r, r);
  }
}
