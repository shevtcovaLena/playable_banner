const items = document.querySelectorAll("#shelves .item img");
const cartBox = document.getElementById("cart-box");
const startSound = document.getElementById("start-sound");
const failSound = document.getElementById("fail-sound");
const successSound = document.getElementById("success-sound");
const completeSound = document.getElementById("complete-sound");

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
  item.ondragstart = function () {
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

function dragByKey(event) {
  items.forEach((item) => {
    item.classList.remove("active-img");
  });
  draggedItem = event.target;
  clonedItem = draggedItem.cloneNode(true);

  clonedItem.style.position = "fixed";
  clonedItem.style.pointerEvents = "none";
  clonedItem.style.transition = "none";
  document.body.appendChild(clonedItem);
  moveAt(353, 477);
  draggedItem.style.visibility = "hidden";
  document.body.style.cursor = "grabbing";
  dragEnd();
}

function dragStart(event) {
  items.forEach((item) => {
    item.classList.remove("active-img");
  });
  cartBox.classList.add("active-img");
  draggedItem = event.target;
  clonedItem = draggedItem.cloneNode(true);

  clonedItem.style.position = "fixed";
  clonedItem.style.pointerEvents = "none";
  clonedItem.style.transition = "none";
  document.body.appendChild(clonedItem);

  if (event.type === "touchstart") {
    offsetX = event.touches[0].clientX - draggedItem.getBoundingClientRect().left;
    offsetY = event.touches[0].clientY - draggedItem.getBoundingClientRect().top;
  } else {
    offsetX = event.clientX - draggedItem.getBoundingClientRect().left;
    offsetY = event.clientY - draggedItem.getBoundingClientRect().top;
  }

  moveAt(event.pageX || event.touches[0].pageX, event.pageY || event.touches[0].pageY);
  draggedItem.style.visibility = "hidden";

  // Устанавливаем курсор на grabbing
  document.body.style.cursor = "grabbing";

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", dragEnd);
}

function moveAt(pageX, pageY) {
  clonedItem.style.left = `${pageX - offsetX}px`;
  clonedItem.style.top = `${pageY - offsetY}px`;
}

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

function onTouchMove(event) {
  moveAt(event.touches[0].pageX, event.touches[0].pageY);
  event.preventDefault();
}

function showPayButton() {
  const flexContainer = document.createElement("div");
  flexContainer.classList.add("flex-container");
  
  const payButton = document.createElement("button");
  payButton.textContent = "Оплатить корзину";
  payButton.classList.add("pay-btn");
  payButton.classList.add("active-img");
  payButton.addEventListener("click", () => {
    window.location.href = "https://lavka.yandex.ru/";
  });

  document.querySelector("aside").appendChild(flexContainer);
  setTimeout(() => {
    flexContainer.style.opacity = "1";
    flexContainer.appendChild(payButton);
  }, 800);
  payButton.focus();
}

function dragEnd() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", dragEnd);
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", dragEnd);
  cartBox.classList.remove("active-img");
  document.body.style.cursor = "";

  if (!clonedItem) {
    return;
  }

  const cartBoxRect = cartBox.getBoundingClientRect();
  const itemRect = clonedItem.getBoundingClientRect();

  if (
    itemRect.left < cartBoxRect.right &&
    itemRect.right > cartBoxRect.left &&
    itemRect.top < cartBoxRect.bottom &&
    itemRect.bottom > cartBoxRect.top
  ) {
    clonedItem.style.position = "";
    clonedItem.style.left = "";
    clonedItem.style.top = "";
    clonedItem.classList.add("purchase");
    cartBox.insertBefore(clonedItem, document.getElementById("cart"));
    cartCounter += 1;
    draggedItem = null;
    successSound.play();
  } else {
    const originalPosition = draggedItem.getBoundingClientRect();
    clonedItem.style.position = "absolute";
    clonedItem.style.transition = "left 0.3s ease, top 0.3s ease";
    clonedItem.style.left = `${originalPosition.left}px`;
    clonedItem.style.top = `${originalPosition.top}px`;

    setTimeout(() => {
      if (draggedItem) {
        draggedItem.style.visibility = "visible";
      }
      if (clonedItem && clonedItem.parentNode) {
        clonedItem.parentNode.removeChild(clonedItem);
        clonedItem = null;
      }
    }, 300);

    failSound.play();
  }
  if (cartCounter === 3) {
    items.forEach((item) => {
      item.removeEventListener("mousedown", dragStart);
      item.removeEventListener("touchstart", dragStart);
    });
    completeSound.play();
      showPayButton();
  }
}