function getRandomColorPair() {
  const result = {
    background: randomColor()
  };
  result.forground = randomAccessibleColor(result.background, 1000000);
  result.contrast = contrast(result.background, result.forground);

  return result;
}

function contrast(rgb1, rgb2) {
  // minimal recommended contrast ratio is 4.5, or 3 for larger font-sizes
  return (
    (luminanace(rgb1.r, rgb1.g, rgb1.b) + 0.05) /
    (luminanace(rgb2.r, rgb2.g, rgb2.b) + 0.05)
  );
}

function luminanace(r, g, b) {
  var a = [r, g, b].map(function(v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function randomAccessibleColor(referenceColor, limit = 100) {
  var color;
  var loop = 0;
  do {
    color = randomColor();
    loop++;
  } while (loop < limit && contrast(referenceColor, color) < 4.5);
  if (loop >= limit) {
    console.log("hit loop limit");
  }
  return color;
}

function randomColor() {
  return {
    r: getRandomInt(0, 255),
    g: getRandomInt(0, 255),
    b: getRandomInt(0, 255)
  };
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(c) {
  return "#" + componentToHex(c.r) + componentToHex(c.g) + componentToHex(c.b);
}

// export { getRandomColorPair };

window.onload = () => {
  const colors = getRandomColorPair();
  console.log(colors);
  document.body.style.background = rgbToHex(colors.background);
  document.body.style.color = rgbToHex(colors.forground);
};
