const moveAt = (pageX, pageY) => {
    clonedItem.style.left = `${pageX - offsetX}px`;
    clonedItem.style.top = `${pageY - offsetY}px`;
  }
  
 const onMouseMove = (event) => {
    moveAt(event.pageX, event.pageY);
  }
  
 const onTouchMove = (event) => {
    moveAt(event.touches[0].pageX, event.touches[0].pageY);
    event.preventDefault();
  }