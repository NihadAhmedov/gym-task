const list = document.getElementById("list");

function getProducts() {
  list.innerHTML = ''
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  cart.map((item, index) => {
    const myDiv = document.createElement("div");
    myDiv.className = "listBox col-xl-4 col-md-6 col-12";
    myDiv.innerHTML = `
    
        <div class = "listMyDiv">
        <img src="${item.image}" alt="">
        <h5>${item.name}</h5>
        <p>${item.title}</p>
        <button onclick = "removeBasket(${index})">Remove form basket</button>
        </div>

    `;
    list.appendChild(myDiv);
  });
}

function removeBasket(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getProducts();
}

getProducts();
