var images = {};
fetch("Flowers.json") //api for the get request
  .then((response) => response.json())
  .then((data) => {
    images = JSON.parse(JSON.stringify(data));
    data.forEach((key) => {
      let firstDiv = attribute("block", "div"); //div contains image,name,ratings,price

      /* flower image */
      let img = document.createElement("img");
      img.setAttribute("src", key.src);
      firstDiv.appendChild(img);
      var dolor = document.createTextNode(key.price);

      /* inner div */
      var innerDiv = attribute("price", "div", "block-one");

      /*flower name span */
      let name = attribute("", "span");
      name.appendChild(document.createTextNode(key.name));
      innerDiv.appendChild(name);

      /* flower ratings */
      let ratings = addStar();
      innerDiv.appendChild(ratings);

      /* flower price */
      let rate = attribute("", "span");
      rate.appendChild(dolor);
      innerDiv.appendChild(rate);

      /* add button */
      let add = attribute("add-button", "button", key.id);
      add.onclick = function () {
        addToCart(this);
      };
      let value = document.createTextNode("Add");
      add.appendChild(value);
      innerDiv.appendChild(add);

      firstDiv.appendChild(innerDiv);
      let productsGrid = document.getElementById("products-grid");
      productsGrid.appendChild(firstDiv);
    });
  });

function addStar() {
  let ratings = attribute("ratings", "div", "rating-block-one");
  for (let i = 0; i <= 4; i++) {
    let j = attribute("fa fa-star-o", "i", "f");
    j.setAttribute("area-hidden", "true");
    ratings.appendChild(j);
  }
  return ratings;
}

function attribute(className = "", tag = "", id = "") {
  let element = document.createElement(tag);
  element.className = className;
  element.setAttribute("id", id);
  return element;
}

function showCart() {
  let cartBlock = document.getElementById("cart-block");
  if (cartBlock.style.display == "") {
    cartBlock.style.display = "block";
  }
}

function closeCart() {
  let cartBlock = document.getElementById("cart-block");
  if (cartBlock.style.display == "block") {
    cartBlock.style.display = "";
  }
}

let movedItems = [];
var finalPrice = 0;
var totalPrice = document.getElementById("cartTotal");
let cartProductCount = document.getElementById("cart-count");

function addToCart(add) {
  if (add.innerText == "Add") {
    var identity = add.id;
    images.forEach((key) => {
      if (identity === key.id) {
        let newObj = JSON.parse(JSON.stringify(key));
        movedItems.push(newObj);
        insertCart(key);
        cartProductCount.innerText = movedItems.length;
      }
    });
    add.innerText = "Remove";
  } else {
    movedItems.forEach((x, index) => {
      if (x.id === add.id) {
        document.getElementById(add.id).remove();
        movedItems.splice(index, 1);
        cost = parseFloat(x.price.substr(1));
        cartProductCount.innerText = movedItems.length;
        erasedPrice = totalPrice.innerHTML - cost * x.count;
        finalPrice = erasedPrice;
        document.getElementById("cartTotal").innerHTML = finalPrice.toFixed(2);
      }
    });
    add.innerText = "Add";
  }
}

function insertCart() {
  cartProductCount.innerText = movedItems.length;
  movedItems.forEach((x, index) => {
    let li = document.getElementById(x.id);
    let list = document.getElementById("fav");

    if (list.contains(li) == false) {
      let cartList = attribute("list", "li", x.id);

      let imagePriceDiv = attribute("imagePriceDiv", "div");
      cartList.appendChild(imagePriceDiv);

      let image = document.createElement("img");
      let src = image.setAttribute("src", x.src);
      imagePriceDiv.appendChild(image);

      let itemPrice = attribute("cart-price", "span");
      itemPrice.appendChild(document.createTextNode(x.price));
      imagePriceDiv.appendChild(itemPrice);

      let nameQuantity = attribute("nameQuantity", "div");
      cartList.appendChild(nameQuantity);

      let itemName = attribute("cart-item-name", "span");
      itemName.append(document.createTextNode(x.name));
      nameQuantity.appendChild(itemName);

      let priceAdjustment = attribute("price-adjustment", "div");
      nameQuantity.appendChild(priceAdjustment);

      let decrease = attribute("fa fa-minus remove-cart", "i", x.id + "count");
      priceAdjustment.appendChild(decrease);
      decrease.onclick = function () {
        decreaseCount(this, x);
      };

      let quantity = attribute("cart-quantity", "span", "count" + x.id);
      quantity.appendChild(document.createTextNode(x.count));
      priceAdjustment.appendChild(quantity);

      let increase = attribute("fa fa-plus", "i");
      increase.onclick = function () {
        increaseCount(this, x);
      };
      priceAdjustment.appendChild(increase);

      let removeCart = attribute("remove-cart", "span");

      let icon = attribute("fa fa-trash", "i");
      icon.onclick = function () {
        removeItemFromCart(this, x);
      };
      removeCart.appendChild(icon);
      cartList.appendChild(removeCart);
      list.appendChild(cartList);

      let cost = removeDolor(x.price);
      finalPrice += cost;
      var totalCart = document.getElementById("cartTotal");

      totalCart.innerHTML = finalPrice.toFixed(2);
    }
  });
}

function removeItemFromCart(s, deleteId) {
  var row = document.getElementById(deleteId.id);
  var priceNode = deleteId.price;
  let cost = removeDolor(priceNode);
  movedItems.splice(
    movedItems.findIndex((a) => a.id === deleteId.id),
    1
  );
  row.remove();
  document.getElementById(deleteId.id).innerText = "Add";
  erasedPrice = parseFloat(totalPrice.innerHTML) - cost * deleteId.count;
  finalPrice = erasedPrice;
  totalPrice.innerHTML = erasedPrice.toFixed(2);
  insertCart();
}

function increaseCount(y, flower) {
  let target = document.getElementById("count" + flower.id);
  if (target.innerText >= 0) {
    document.getElementById(flower.id + "count").style.display = "block";
  }
  movedItems.forEach((x) => {
    if (x.id === flower.id) {
      let flowerCount = ++x.count;
      target.innerText = flowerCount;
      finalPrice = finalPrice + removeDolor(x.price);
      totalPrice.innerHTML = finalPrice.toFixed(2);
    }
  });
}

function decreaseCount(y, flower) {
  let target = document.getElementById("count" + flower.id);
  movedItems.forEach((x) => {
    if (x.id === flower.id) {
      let flowerCount = --x.count;
      target.innerText = flowerCount;
      finalPrice = finalPrice - removeDolor(x.price);
      totalPrice.innerHTML = finalPrice.toFixed(2);
      if (flowerCount == 0) {
        y.style.display = "none";
      }
    }
  });
}

function removeDolor(price) {
  let currentItemPrice = price;
  return parseFloat(currentItemPrice.substr(1));
}
