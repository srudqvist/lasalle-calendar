function scaleUpElement(element, scaleFactor = 1.1) {
  if (element.tagName == "BUTTON" && element.disabled) {
  } else if (element.tagName === "TD") {
    element.style.transform = "scale(1.2)";
  } else {
    element.style.transform = `scale(${scaleFactor})`;
  }
  element.style.transition = "transform 0.1s ease";
}

function resetScaleElement(element, scaleFactor = 1.0) {
  if (!(element.tagName == "BUTTON" && element.disabled)) {
    element.style.transform = `scale(${scaleFactor})`;
    element.style.transition = "transform 0.1s ease";
  }
}

export { scaleUpElement, resetScaleElement };
