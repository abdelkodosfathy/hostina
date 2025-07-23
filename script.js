// adding random dots
function generateStars() {
  const starsCount = 5;
  const heroSection = document.querySelector(".hero-section");

  const { offsetWidth, offsetHeight } = heroSection;
  const centerX = offsetWidth / 2;
  const centerY = offsetHeight / 2;

  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // random point far from center
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 400 + 800; // from 200 to 600px away
    const startX = centerX + Math.cos(angle) * distance;
    const startY = centerY + Math.sin(angle) * distance;

    // Position the star at the outer point
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    // Compute translation to center
    const dx = centerX - startX;
    const dy = centerY - startY;

    // Set movement with custom props
    star.style.setProperty("--dx", `${dx}px`);
    star.style.setProperty("--dy", `${dy}px`);

    // set animation using translate(dx, dy)
    star.style.transform = `translate(${dx}px, ${dy}px) scale(1.5)`;

    // remove when finished
    star.addEventListener("animationend", () => star.remove());

    heroSection.appendChild(star);
  }
}

// Start loop
setInterval(generateStars, 300);

// nav section
const menuBtn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const currencySelect = document.getElementById("currency-select");
const currencyIcon = document.getElementById("currency-icon");

const iconMap = {
  usd: "public/flags/USD.png",
  eur: "public/flags/EUR.webp",
  egp: "public/flags/EGP.png",
};

currencySelect.addEventListener("change", () => {
  const value = currencySelect.value.toLowerCase();
  currencyIcon.src = iconMap[value] || "public/flags/USD.png";
});

// storeis section
let currentStoryInedx = 1; // i made it for resizing reasons
const nextStory = document.getElementById("prev-story");
const prevStory = document.getElementById("next-story");
const storiesCards = document.querySelectorAll("#stories-slider .story-card");
const cardSelectors = document.querySelectorAll("[data-card-selector]");

const storiesClipedCards = document.querySelectorAll("[data-card-cliped]");

const updateClipPath = (radius = 60, card) => {
  const width = card.offsetWidth;
  const height = card.offsetHeight;

  const mid = width / 2;
  const x1 = mid - radius - 10;
  const x2 = mid;
  const x3 = mid + radius;

  const path = `M 0,0 L ${x1},0 A 10,10 0,0,1 ${
    x1 + 10
  },10 A ${radius},${radius} 0,0,0 ${x2},${radius} A ${radius},${radius} 0,0,0 ${x3},10 A 10,10 0,0,1 ${
    x3 + 10
  },0 L ${width},0 L ${width},${height} L 0,${height} L 0,0 Z`;

  card.style.clipPath = `path("${path}")`;
  console.log(path);
};

storiesClipedCards.forEach((storyCard) => {
  updateClipPath(50, storyCard);
});

function scrollToCardByIndex(index) {
  const container = document.getElementById("stories-slider");
  const targetCard = storiesCards[index];
  if (index >= storiesCards.length || index < 0) return;
  if (!targetCard) return;

  currentStoryInedx = index;

  const cardWidth = targetCard.offsetWidth;
  const gap = 24; // gap-6 = 1.5rem
  const containerWidth = container.parentElement.offsetWidth;

  // عوّض عن الـ padding-left = 50%
  const paddingLeft = containerWidth / 2;

  const translateX = targetCard.offsetLeft - paddingLeft + cardWidth / 2;

  container.style.transform = `translateX(-${translateX}px)`;

  // active classes
  storiesCards.forEach((card) => card.classList.remove("active"));
  cardSelectors.forEach((card) => card.classList.remove("active"));

  targetCard.classList.add("active");
  cardSelectors[index].classList.add("active");
}

// call function onClick
[nextStory, prevStory].forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-scroll-value");

    scrollToCardByIndex(currentStoryInedx + +value);
  });
});
cardSelectors.forEach((cardSelector, index) => {
  cardSelector.addEventListener("click", () => {
    scrollToCardByIndex(index);
  });
});

const faqButtons = document.getElementsByClassName("faq-btn");
const faqContainers = document.getElementsByClassName("faq-container");

Array.from(faqButtons).forEach((faqBtn, index) => {
  faqBtn.addEventListener("click", () => {
    Array.from(faqContainers).forEach((container, i) => {
      const answer = container.querySelector(":scope > p");
      const icon = container.querySelector(".faq-btn i");

      if (i === index) {
        // Toggle the clicked one
        const isHidden = answer.classList.contains("hidden");
        answer.classList.toggle("hidden");
        icon.classList.toggle("fa-angle-up", isHidden); // يظهر السهم لأسفل لو هي كانت مخفية
        icon.classList.toggle("fa-angle-down", !isHidden); // يظهر السهم لأعلى لو كانت ظاهرة
      } else {
        // Close all others
        answer.classList.add("hidden");
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  generateStars();
  scrollToCardByIndex(currentStoryInedx);
});

// adding randm dots to the hero section
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    generateStars;
    scrollToCardByIndex(currentStoryInedx);
    storiesClipedCards.forEach((storyCard) => {
      updateClipPath(50, storyCard);
    });
  }, 200);
});
