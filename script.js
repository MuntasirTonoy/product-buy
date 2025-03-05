const ringButtons = document.querySelectorAll(".ring-button");

for (const ringButton of ringButtons) {
  ringButton.addEventListener("click", function (event) {
    const color = event.target.id.replace("-ring", "");

    for (const ringButton of ringButtons) {
      ringButton.classList.remove("ring-2", "ring-red-700");
    }
    event.target.classList.add("ring-2", "ring-red-700");
    const productImg = document.getElementById("product-img");
    productImg.src = "./asset/" + color + ".jpg";
  });
}
function selectSize(mySize) {
  const allSizes = ["s", "m", "l", "xl"];
  for (const oneSize of allSizes) {
    const button = document.getElementById("size-" + oneSize);
    if (oneSize === mySize) {
      button.classList.add("ring-2");
    } else {
      button.classList.remove("ring-2");
    }
  }
}

let totalItem = 0;
let cartItems = [];
function quantityCount(number) {
  totalItem = parseInt(document.getElementById("quantity").innerText) + number;
  if (totalItem >= 0) {
    document.getElementById("quantity").innerText = totalItem;
  }
}

document.getElementById("plus-btn").addEventListener("click", function () {
  quantityCount(1);
});
document.getElementById("minus-btn").addEventListener("click", function () {
  quantityCount(-1);
});

document.getElementById("add-cart-btn").addEventListener("click", function () {
  const popUp = document.createElement("p");
  popUp.innerText = totalItem;
});

document.getElementById("add-cart-btn").addEventListener("click", () => {
  if (totalItem !== 0) {
    document.getElementById("checkout-btn").classList.remove("hidden");
    document.getElementById("chkout-number").innerText =
      parseInt(document.getElementById("chkout-number").innerText) + totalItem;
    const selectedColor = document
      .querySelector(".ring-red-700.ring-button ")
      .id.split("-ring")[0];
    const selectedSize = document
      .querySelector("button.ring-2")
      .innerText.split("")[0];
    const selectedPrice = document
      .querySelector("button.ring-2")
      .innerText.split(" ")[1];
    const selectedQuantity = totalItem;
    const selectedImg = selectedColor + ".jpg";
    cartItems.push({
      image: selectedImg,
      size: selectedSize,
      color: selectedColor,
      price: selectedPrice,
      quantity: selectedQuantity,
    });
  } else {
    alert("Please Select  Quantity");
  }
});
let subtotalQuantity = 0;
let subtotalPrice = 0;
let subtotal = parseFloat(document.getElementById("subtotal").innerText);
document.getElementById("checkout-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("hidden");
  const cartContainer = document.getElementById("cart-container");

  for (let cartItem of cartItems) {
    const productTitle = document.getElementById("product-title").innerText;

    const productRow = document.createElement("tr");

    productRow.classList.add(`bg-${cartItem.color}-200`, "text-center");
    let validPrice = parseFloat(cartItem.price.replace("$", ""));
    subtotal = subtotal + validPrice * cartItem.quantity;
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);

    // product adding with template string
    productRow.innerHTML = `
    <td><div class="flex lg:flex-row flex-col
    l items-center justify-center gap-2 text-start px-2"> 
    <img src="asset/${cartItem.image}" class="h-10 rounded-md">
     <p class="leading-tight py-2">${productTitle}</p></div>
      
    </td>
    <td>${cartItem.color}</td>
    <td>${cartItem.size}</td>
    <td>${cartItem.quantity}</td>
    <td>${cartItem.price}</td>
    `;
    cartContainer.appendChild(productRow);
  }
  cartItems = [];
});
document.getElementById("continue-shopping").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.add("hidden");
});

document.getElementById("pay-btn").addEventListener("click", () => {
  window.location.href = "final.html";
});
