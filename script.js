const heartsContainer = document.querySelector("#hearts-container");
const controlsContainer = document.querySelector("#controls-container");
const hitButton = controlsContainer.querySelector("#hit-button");
const hitDamageInput = controlsContainer.querySelector("#hit-damage-input");
const healButton = controlsContainer.querySelector("#heal-button");
const healInput = controlsContainer.querySelector("#heal-amount-input");
const addHeart = controlsContainer.querySelector("#add-heart-container-button");
let health = 35;
let maxHealth = 44;
let overHealth = 2;

function randint(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}

function updateHeartsDisplay() {
  let quartersToFill = health;
  // if (overHealth > 0) {
  //   let newHeart = heartsContainer.querySelector(".heart").cloneNode(true);
  //   newHeart.classList.add(".heart.extra")
  //   heartsContainer.appendChild(newHeart);
  // }
  for (const heart of heartsContainer.querySelectorAll(".heart")) {
    if (quartersToFill) {
      let quarters = Math.min(quartersToFill, 4);
      heart.dataset.quarters = quarters;
      quartersToFill -= quarters;
    } else {
      heart.dataset.quarters = 0;
    }
  }
}

hitButton.addEventListener("click", function () {
  let damage = Number(hitDamageInput.value);
  health = Math.max(0, health - damage);
  updateHeartsDisplay();
});

healButton.addEventListener("click", function () {
  let bonus = Number(healInput.value) * 4;
  if (health <= maxHealth) {
    health = Math.min(maxHealth, health+bonus);
  }
  updateHeartsDisplay();
});

addHeart.addEventListener("click", function () {
  let newHeart = heartsContainer.querySelector(".heart").cloneNode(true);
  heartsContainer.appendChild(newHeart);
  maxHealth += 4;
  updateHeartsDisplay();
});