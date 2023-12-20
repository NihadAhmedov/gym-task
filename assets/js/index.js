const products = document.getElementById("products");
const btn = document.getElementById("btn");
const searchDiv = document.getElementById("searchDiv");
const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("inp");

let page = 1;
let limit = 3;
let pro = [];

async function myFunc() {
  let skip = (page - 1) * limit;
  const response = await axios.get(
    `https://655c84d425b76d9884fd7251.mockapi.io/product?page=${page}&limit=${limit}&skip=${skip}`
  );
  const data = await response.data;
  pro = data;
  pro.map((item) => {
    const newDiv = document.createElement("div");
    newDiv.className = "box col-xl-4 col-md-6 col-12";
    newDiv.innerHTML = `
        <div class = "boxDiv">
        <img src="${item.image}" alt="">
        <h5>${item.name}</h5>
        <p>${item.title}</p>
        <button onclick = "addtobasket(${item.id})">Add to basket</button>
        </div>
        `;
    products.appendChild(newDiv);
  });

  page++;
}

btn.addEventListener("click", myFunc);

function addtobasket(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(pro.find((item) => item.id == id));
  localStorage.setItem("cart", JSON.stringify(cart));
}

myFunc();

function searchProducts() {
  searchDiv.innerHTML = "";
  products.style.display = "none";
  searchDiv.style.display = "block";

  axios
    .get(
      `https://655c84d425b76d9884fd7251.mockapi.io/product?title=${inp.value}`
    )
    .then((res) => {
      pro = res.data;
      console.log(pro);
      pro.map((item) => {
        const div = document.createElement("div");
        div.className = "srchPro col-xl-4 col-md-6 col-12";
        div.innerHTML = `
            <div class="srchImage">
            <img src="${item.image}" alt="">
            <h5>${item.name}</h5>
            <p>${item.title}</p>
            </div>
            `;

        searchDiv.appendChild(div);
      });
    });
}
searchBtn.addEventListener("click", searchProducts);
