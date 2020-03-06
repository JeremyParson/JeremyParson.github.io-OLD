var GRADIANT = [];

for (let x = 0; x < 100; x++) {
  GRADIANT[x] = new Array(100);
  for (let y = 0; y < 100; y++) {
    GRADIANT[x][y] = pickForEach([1, -1]);
  }
}

//testing output of perlinfunction
console.log(perlin(12.5 * 0.001, 13.6 * 0.001) * 127 + 128);
console.log(perlin(12.6 * 0.001, 13.7 * 0.001));

function setup() {
  createCanvas(200, 200);
  let cv = (document.getElementById("defaultCanvas0").style =
    "width: 1500px; height: 1500px;");
  background(255, 255, 255);
}

//psudo random number generator
function seedRandon(seed) {
  let _seed = seed;
  return function random() {
    var x = Math.sin(_seed++) * 10000;
    return x - Math.floor(x);
  };
}

let x = 0,
  y = 0;

function draw() {
  console.log(x, y);
  if ((x * 0.01) % 1 == 0 || (y * 0.01) % 1 == 0) {
    stroke(0, 255, 0);
  } else {
    stroke(Math.floor(perlin(x * 0.01, y * 0.01) * 127 + 128));
  }

  point(x, y);
  if (x == 100) {
    x = 0;
    y += 1;
  }
  x += 1;
}

//Generates a value between 1 and -1
function perlin(x, y) {
  //calculate unit square values
  let x0 = x & 255;
  let x1 = x0 + 1;
  let y0 = y & 255;
  let y1 = y0 + 1;

  //calulate interpolation value between all the dot products
  let sx = fade(x - x0);
  let sy = fade(y - y0);

  let n0, n1, ix0, ix1, value;

  //calculate top two corner dot products
  n0 = dotGridGradient(x0, y0, x, y);
  n1 = dotGridGradient(x1, y0, x, y);

  //interpolate dot products
  ix0 = _lerp(n0, n1, sx);

  //calculate bottom two corner dot products
  n0 = dotGridGradient(x0, y1, x, y);
  n1 = dotGridGradient(x1, y1, x, y);

  //interpolate dot products
  ix1 = _lerp(n0, n1, sx);

  //interpolate interpolated values
  value = _lerp(ix0, ix1, sy);

  // console.log("inputs: ", x, y, " ---out---> ", value * 127 + 128);

  //return value of coordinate
  return value;
}

//can be used to calculate interpolation between values
function fade(x) {
  return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
}

//picks a value from an array based off of a seed based random function
function pick(x, seed) {
  return x[Math.floor(seed() * x.length)];
}

//picks value from an array using Math.random()
function _pick(x) {
  return x[Math.floor(Math.random() * x.length)];
}

//maps a callback over an array
function forEach(x, func) {
  return x.map(a => func(x));
}

//returns array with values randomly selected from the inputed array that has the same size as the former
function pickForEach(arr) {
  return forEach(arr, _pick);
}

//calculates the dot product of 2 vectors
function dot(ary1, ary2) {
  if (ary1.length != ary2.length)
    throw "can't find dot product: arrays have different lengths";
  var dotprod = 0;
  for (var i = 0; i < ary1.length; i++) dotprod += ary1[i] * ary2[i];
  return dotprod;
}

//linearly interpolates between two values
function _lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

//takes coordinates and current unit location and returns the dot product of distance vectors and gradient
//vectors for that point
function dotGridGradient(ix, iy, x, y) {
  //Optional directions a gradient vector can point in
  let vs = [1, -1];

  //calculates distance vector's x and y
  let dx = x - ix;
  let dy = y - iy;

  //used to generate psuedo random gradient vectors
  let xSeed = seedRandon(ix * 0.1);
  let ySeed = seedRandon(iy * 0.1);

  // let gradient = [pick(vs, xSeed), pick(vs, ySeed)];

  //Get gradient from pre generated gradient array
  let gradient = GRADIANT[ix][iy];

  //returns dot product of the distance vector and gradient vector
  return dot([dx, dy], gradient);
}
