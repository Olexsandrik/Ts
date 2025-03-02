"use strict";
function triangle(value1, type1, value2, type2) {
  console.log(`>> triangle(${value1}, "${type1}", ${value2}, "${type2}");`);

  const toRadians = (angle) => (Math.PI / 180) * angle;
  const toDegrees = (radians) => (180 / Math.PI) * radians;
  let a = 0,
    b = 0,
    c = 0;
  let alpha = 0,
    beta = 0;
  if (value1 <= 0 || value2 <= 0) {
    console.log('"Zero or negative input"');
    return "failed";
  }

  const params = new Map([
    [type1, value1],
    [type2, value2],
  ]);
  if (params.has("leg") && params.has("hypotenuse")) {
    a = params.get("leg");
    c = params.get("hypotenuse");
    if (a >= c) {
      console.log(
        "Error: Leg cannot be greater than or equal to the hypotenuse."
      );
      return "failed";
    }
    b = Math.sqrt(c * c - a * a);
    alpha = toDegrees(Math.asin(a / c));
    beta = 90 - alpha;
  } else if (params.has("leg") && params.has("adjacent angle")) {
    a = params.get("leg");
    alpha = params.get("adjacent angle");
    b = a * Math.tan(toRadians(alpha));
    c = Math.sqrt(a * a + b * b);
    beta = 90 - alpha;
  } else if (params.has("leg") && params.has("opposite angle")) {
    a = params.get("leg");
    beta = params.get("opposite angle");
    b = a / Math.tan(toRadians(beta));
    c = Math.sqrt(a * a + b * b);
    alpha = 90 - beta;
  } else if (params.has("hypotenuse") && params.has("angle")) {
    c = params.get("hypotenuse");
    alpha = params.get("angle");
    a = c * Math.sin(toRadians(alpha));
    b = c * Math.cos(toRadians(alpha));
    beta = 90 - alpha;
  } else {
    console.log(
      "Error: Invalid input combination. Please check the instructions."
    );
    return "failed";
  }
  console.log(` a = ${a.toFixed(6)}`);
  console.log(` b = ${b.toFixed(12)}`);
  console.log(` c = ${c.toFixed(6)}`);
  console.log(` alpha = ${alpha.toFixed(12)}`);
  console.log(` beta = ${beta.toFixed(12)}`);
  console.log('"success"');
  return "success";
}

triangle(7, "leg", 18, "hypotenuse");
triangle(60, "opposite angle", 5, "leg");
triangle(43.13, "angle", -2, "hypotenuse");
