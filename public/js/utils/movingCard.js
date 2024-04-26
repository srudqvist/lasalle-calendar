/**
 * Interactive Card Animation
 *
 * This JavaScript code sets up interactive animations for cards when the mouse enters, moves over,
 * or leaves the card elements. It applies transformations to the cards to create a 3D effect.
 *
 * Function:
 * - When the DOM content is loaded, it selects all elements with the class "moving-card" and adds event listeners for mouse enter, move, and leave events.
 * - On mouse enter, it sets a transition effect for the card's transformation.
 * - On mouse move, it calculates the tilt angles based on the mouse position relative to the card's center and applies the corresponding 3D transformation.
 * - On mouse leave, it resets the card's transformation to its original state with a transition effect.
 */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.getElementsByClassName("moving-card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("mouseenter", () => {
      cards[i].style.transition = "transform 0.2s ease";
    });

    cards[i].addEventListener("mousemove", (event) => {
      const rect = cards[i].getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxTilt = 3;
      const tiltX = ((centerX - x) / centerX) * maxTilt;
      const tiltY = ((centerY - y) / centerY) * maxTilt;
      cards[i].style.transition = "transform 0.2s ease";
      cards[i].style.transform =
        `perspective(1000px) rotateX(${tiltY}deg) rotateY(${-tiltX}deg) translateZ(0)`;
    });

    cards[i].addEventListener("mouseleave", () => {
      cards[i].style.transition = "transform 1s ease";
      cards[i].style.transform = "none";
    });
  }
});
