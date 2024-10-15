function dragByKey(event) {
    items.forEach((item) => {
      item.classList.remove("active-img");
    });
    draggedItem = event.target;
    clonedItem = draggedItem.cloneNode(true);
  
    clonedItem.style.position = "fixed";
    document.body.appendChild(clonedItem);
    moveAt(353, 477);
    draggedItem.style.visibility = "hidden";
    document.body.style.cursor = "grabbing";
    dragEnd();
  }