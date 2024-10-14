const dragEnd = () => {
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
  