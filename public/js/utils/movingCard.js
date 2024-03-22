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
