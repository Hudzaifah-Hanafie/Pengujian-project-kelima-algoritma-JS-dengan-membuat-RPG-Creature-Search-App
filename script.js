const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const creatureHp = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creatureSpAttack = document.getElementById("special-attack");
const creatureSpDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");

let creatureDataArr = [];

const fetchCreature = (nameId) => {
  fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameId}`)
    .then((res) => res.json())
    .then((data) => {
      creatureDataArr = data;
      console.log(creatureDataArr);
      displayCreature(creatureDataArr);
    })
    .catch((err) => alert("Creature not found"));
};

const displayCreature = (creatureData) => {
  creatureName.innerText = creatureData.name;
  creatureId.innerText = `#${creatureData.id}`;
  creatureWeight.innerText = `Weight: ${creatureData.weight}`;
  creatureHeight.innerText = `Height: ${creatureData.height}`;

  // creatureSpecialName.innerText = creatureData.special.name;
  // creatureSpecialDesc.innerText = creatureData.special.description;

  const statsObj = creatureData.stats.reduce((acc, stat) => {
    acc[stat.name] = stat.base_stat;
    return acc;
  }, {});

  creatureHp.innerText = statsObj.hp;
  creatureAttack.innerText = statsObj.attack;
  creatureDefense.innerText = statsObj.defense;
  creatureSpAttack.innerText = statsObj["special-attack"];
  creatureSpDefense.innerText = statsObj["special-defense"];
  creatureSpeed.innerText = statsObj.speed;

  creatureTypes.innerHTML = creatureData.types.map((type) => `<span>${type.name.toUpperCase()}</span>`).join("");
};

searchBtn.addEventListener("click", () => {
  fetchCreature(searchInput.value);
});
