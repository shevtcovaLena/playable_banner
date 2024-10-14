const dragStart = (event) => {
    items.forEach((item) => {
      item.classList.remove("active-img");
    });
    cartBox.classList.add("active-img");
    draggedItem = event.target;
    clonedItem = draggedItem.cloneNode(true);
  
    clonedItem.style.position = "fixed";
    clonedItem.style.pointerEvents = "none";
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
  
    document.body.style.cursor = "grabbing";
  
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", dragEnd);
  }