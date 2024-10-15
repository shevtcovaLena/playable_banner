const items = document.querySelectorAll("#shelves .item img");
const cartBox = document.querySelector("#cart-box");
const startSound = document.querySelector("#start-sound");
const failSound = document.querySelector("#fail-sound");
const successSound = document.querySelector("#success-sound");
const completeSound = document.querySelector("#complete-sound");

let draggedItem = null;
let clonedItem = null;
let cartCounter = 0;
let offsetX = 0;
let offsetY = 0;

const playStartSound = () => {
  startSound.play();
};

document.querySelector("aside").addEventListener("mousedown", playStartSound);
document.querySelector("aside").addEventListener("touchstart", playStartSound, { passive: true });
startSound.addEventListener(
  "ended",
  () => {
    document
      .querySelector("aside")
      .removeEventListener("mousedown", playStartSound);
    document
      .querySelector("aside")
      .removeEventListener("touchstart", playStartSound);
  },
  { once: true }
);

items.forEach((item) => {
  item.ondragstart = () => {
    return false;
  };
  item.style.cursor = "grab";
  item.addEventListener("mousedown", dragStart);
  item.addEventListener("touchstart", dragStart, { passive: true });
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      dragByKey(event);
      event.preventDefault();
    }
  });
});
