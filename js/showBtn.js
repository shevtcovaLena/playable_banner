const showPayButton = () => {
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
      payButton.focus();
    }, 800);
  }