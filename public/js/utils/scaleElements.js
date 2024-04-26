/**
 * Element Scaling Utility Functions
 *
 * This JavaScript file provides utility functions for scaling DOM elements.
 * The functions allow for scaling up and resetting the scale of elements.
 * They are designed to enhance user interface interactions, such as hover effects.
 *
 * Functions:
 * - scaleUpElement(element, scaleFactor): Scales up a specified DOM element.
 *   - Parameters:
 *     - element: The DOM element to be scaled.
 *     - scaleFactor: Optional. The scaling factor to be applied. Default is 1.1.
 *
 * - resetScaleElement(element, scaleFactor): Resets the scale of a specified DOM element.
 *   - Parameters:
 *     - element: The DOM element whose scale is to be reset.
 *     - scaleFactor: Optional. The scale factor to reset the element to. Default is 1.0.
 *
 * Exported Functions:
 * - scaleUpElement: Function for scaling up DOM elements.
 * - resetScaleElement: Function for resetting the scale of DOM elements.
 */

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
