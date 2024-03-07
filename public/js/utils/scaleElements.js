function scaleUpElement(element) {
  if (element.tagName === "TD") {
    element.style.transform = "scale(1.2)";
  } else {
    element.style.transform = "scale(1.1)";
  }
  element.style.transition = "transform 0.1s ease";
}
function resetScaleElement(element) {
  element.style.transform = "scale(1)";
  element.style.transition = "transform 0.1s ease";
}

export { scaleUpElement, resetScaleElement };
