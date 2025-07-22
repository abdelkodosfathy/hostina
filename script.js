function generateStars() {
  const starsCount = 30;
  const heroSection = document.querySelector(".hero-section");

  // امسح النجوم القديمة
  document.querySelectorAll(".star").forEach((star) => star.remove());

  const { offsetWidth, offsetHeight } = heroSection;

  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = Math.random() * offsetHeight + "px";
    star.style.left = Math.random() * offsetWidth + "px";
    heroSection.appendChild(star);
  }
}

document.addEventListener("DOMContentLoaded", generateStars);

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(generateStars, 200);
});
