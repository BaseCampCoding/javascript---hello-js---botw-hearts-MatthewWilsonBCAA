const heartsContainer = document.querySelector("#hearts-container");
const controlsContainer = document.querySelector("#controls-container");
const hitButton = controlsContainer.querySelector("#hit-button");
const hitDamageInput = controlsContainer.querySelector("#hit-damage-input");
const healButton = controlsContainer.querySelector("#heal-button");
const healInput = controlsContainer.querySelector("#heal-amount-input");
const addHeart = controlsContainer.querySelector("#add-heart-container-button");
const overHealButton = controlsContainer.querySelector("#overheal-button");
const overHealInput = controlsContainer.querySelector("#overheal-amount-input");
let health = 35;
let maxHealth = 44;
let overHealCount = 0;

function randint(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}

function updateHeartsDisplay() {
  let quartersToFill = health;
  heartsContainer.querySelectorAll('.heartextra').forEach(e => e.remove());
  if (overHealCount > 0 && heartsContainer.querySelector(".heartextra") == null) {
    for (let i = 0; i < overHealCount; i++) {
      let newHeart = heartsContainer.querySelector(".heart").cloneNode(true);
      newHeart.classList.add("heartextra")
      heartsContainer.appendChild(newHeart);
    }
  }
  else if (overHealCount == 0) {
    heartsContainer.querySelectorAll('.heartextra').forEach(e => e.remove());
  }
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
  if (health <= maxHealth && overHealCount > 0) {
    overHealCount = 0;
  }
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
  if (health < maxHealth) {
    health = maxHealth;
  }
  if (health > maxHealth) {
    health += 4;
  }
  maxHealth += 4;
  updateHeartsDisplay();
});

overHealButton.addEventListener("click", function () {
  //overHealCount = Math.max(overHealCount, overHealInput.value);
  if (overHealInput.value > overHealCount) {
    overHealCount = overHealInput.value
    health = maxHealth;
    health += overHealCount * 4;
  }

  updateHeartsDisplay();
})