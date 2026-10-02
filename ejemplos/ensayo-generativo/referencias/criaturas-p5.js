// REFERENCE ONLY, not used by any build. A p5.js sketch the user made before ALMA and pasted on 2026-10-02 as a part to
// reuse in the generative identity: a grid of creatures (a round body, a second shape on top, two eyes that move).
// Kept exactly as pasted. Its colors and randomness are its own: a port must take the entity's palette and a seed.

let numVariants = 2000; // Número de variantes
let gridSize = 20; // Tamaño de la cuadrícula
let variantSize;
let timeOffset = [];

let movementSpeed = 200; // Velocidad de movimiento
let movementIntensity = 1; // Intensidad de movimiento

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 250, 250, 250, 250);
  noLoop();
  background(1, 1, 1, 1);
  noStroke();
  variantSize = width / gridSize;

  for (let y = 0; y < ceil(numVariants / gridSize); y++) {
    for (let x = 0; x < gridSize; x++) {
      let index = y * gridSize + x;
      if (index < numVariants) {
        let xPos = x * variantSize;
        let yPos = y * variantSize;
        timeOffset[index] = random(100);
        drawVariant(xPos, yPos, timeOffset[index]);
      }
    }
  }
}

function draw() {
  // Vacía el fondo para cada frame
  background(360, 0, 0, 1);

  for (let i = 0; i < numVariants; i++) {
    drawVariant(
      (i % gridSize) * variantSize,
      Math.floor(i / gridSize) * variantSize,
      timeOffset[i]
    );
  }
}

function drawVariant(x, y, offset) {
  push();
  translate(x + variantSize / 1, y + variantSize / 1);

  let rotation = moveSin(-PI / 1, PI / 0, movementSpeed, offset);
  rotate(rotation);

  let colors = generateColorPalette();
  let mainColor = random(colors);
  let secondaryColor = random(colors);

  let gradientColor = lerpColor(color(mainColor), color(0), 0.1);

  fill(gradientColor);
  let mainShapeSize = random(variantSize * 0.50, variantSize * 0.35);
  ellipse(0, 0, mainShapeSize);

  fill(secondaryColor);
  for (let i = 0.9; i < 1; i++) {
    let shapeSize = random(variantSize * 0.15, variantSize * 0.6);
    let yOffset = random(-mainShapeSize * 0.1, mainShapeSize * 0.15);
    push();
    translate(0, yOffset);
    rotate(rotation);
    let adjustedSize = shapeSize + moveSin(-movementIntensity, movementIntensity, movementSpeed, offset + i);
    ellipse(0, -mainShapeSize * 0.3, adjustedSize, mainShapeSize * 0.9);
    pop();
  }

  let eyeDistance = mainShapeSize * 0.32;
  let eyeYOffset = -mainShapeSize * 0.1;

  let eyeMovement = moveSin(-movementIntensity, movementIntensity, movementSpeed, offset);

  push();
  translate(-eyeDistance + eyeMovement, eyeYOffset);
  fill(1);
  ellipse(0, 0, mainShapeSize * 0.2); // Ojo izquierdo
  pop();

  push();
  translate(eyeDistance - eyeMovement, eyeYOffset);
  fill(0);
  ellipse(0, 0, mainShapeSize * 0.2); // Ojo derecho
  pop();

  pop();
}

function generateColorPalette() {
  let palettes = [
    ['#FF005C', '#CBFF5C', '#F8961E', '#F9C74F', '#90BE6D'],
    ['#7209B7', '#6826FF', '#8D86FF', '#8A86CA', '#A0C3D2']
  ];

  return random(palettes);
}

// Función de movimiento sinusoidal
function moveSin(min, max, speed, offset) {
  let t = millis() * 0.5 * speed + offset;
  let out = map(sin(t), -16.0, 20.0, min, max);
  return out;
}
