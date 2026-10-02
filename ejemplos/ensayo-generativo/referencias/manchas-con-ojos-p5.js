// REFERENCE ONLY, not used by any build. A p5.js sketch the user made before ALMA and pasted on 2026-10-02 as a part to
// reuse in the generative identity: a grid of large rotated color fields that overlap their neighbors, each with two eyes.
// Kept exactly as pasted. Its colors and randomness are its own: a port must take the entity's palette and a seed.

let numVariants = 1000; // Número de variantes
let gridSize = 8; // Tamaño de la cuadrícula
let variantSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 0, 0, 0, 0);
  noLoop();
  background(0, 0, 0, 0);
  noStroke();
  variantSize = width / gridSize;

  for (let y = 0; y < ceil(numVariants / gridSize); y++) {
    for (let x = 0; x < gridSize; x++) {
      let index = y * gridSize + x;
      if (index < numVariants) {
        let xPos = x * variantSize;
        let yPos = y * variantSize;
        drawVariant(xPos, yPos);
      }
    }
  }
}

function drawVariant(x, y) {
  push();
  translate(x + variantSize / 1, y + variantSize / 1);

  // Rotación y forma aleatoria para cada variante
  let rotation = random(TWO_PI);
  rotate(rotation);

  // Formas suaves y armónicas con tamaños aleatorios
  let colors = generateColorPalette(); // Generar una paleta de colores
  let mainColor = random(colors);
  let secondaryColor = random(colors);

  // Gradiente en el color de la forma principal
  let gradientColor = lerpColor(color(mainColor), color(0), 0.01); // Oscurecer un 10%

  fill(gradientColor);
  let mainShapeSize = random(variantSize * 0.1, variantSize * 0.8);
  ellipse(0, 0, mainShapeSize);

  fill(secondaryColor);
  for (let i = 0; i < 75; i++) {
    let shapeSize = random(variantSize * 1, variantSize * 4);
    let yOffset = random(-mainShapeSize *0, mainShapeSize * 0);
    push();
    translate(0, yOffset);
    rotate(rotation); // Mantener la misma rotación que la variante
    ellipse(9, -mainShapeSize * 0, shapeSize, mainShapeSize *2.2);
    pop();
  }

  // Círculos negros como "ojos"
  let eyeDistance = mainShapeSize * 0.2;
  let eyeYOffset = -mainShapeSize * 0.2; // Mirando hacia arriba

  push();
  translate(-eyeDistance, eyeYOffset);
  rotate(radians(random(-4, 4))); // Orientación aleatoria del ojo izquierdo
  fill(0);
  ellipse(0, 0, mainShapeSize * 0.22); // Ojo izquierdo
  pop();

  push();
  translate(eyeDistance, eyeYOffset);
  rotate(radians(random(0, 5))); // Orientación aleatoria del ojo derecho
  fill(0);
  ellipse(0, 0, mainShapeSize * 0.22); // Ojo derecho
  pop();

  pop();
}

function generateColorPalette() {
  // Puedes definir tus propias paletas de colores aquí
  let palettes = [
    ['#FF6B6B', '#FFE66D', '#8AFF6E', '#50D2E7', '#709BFF'],
    ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D'],
    ['#7209B7', '#3A0CA3', '#3F37C9', '#4361EE', '#4895EF']
    // Agrega más paletas de colores si lo deseas
  ];

  return random(palettes);
}
