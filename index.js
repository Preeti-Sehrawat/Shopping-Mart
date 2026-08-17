mainFrame = document.getElementById("main-frame");

let cart = retrieveFromLocalStorage();
let totalPages;
let PageCount = 1;
let myPagelimit = 9;

let nav = document.createElement("div");
nav.className = "flex justify-between items-center bg-white h-17";
let title = document.createElement("h1");
title.innerText = "Shopping Mart";
let backBtn = document.createElement("button");
backBtn.innerText = "Back";
backBtn.classList =
  "bg-black text-white rounded-lg border border-2  w-13 h-10 p-1 hover:opacity-80";
backBtn.style.display = "none";
backBtn.addEventListener("click", frameChange);
title.className = "text-3xl font-bold text-blue-700";
let cartCount = document.createElement("button");
cartCount.innerText = "Cart";
cartCount.className =
  "bg-black text-white font-semibold rounded-lg text-center h-10 px-3 py-1  hover:opacity-80";
cartCount.addEventListener("click", cartFrame);
let myOrders = document.createElement("button");
myOrders.innerText = "Orders";
myOrders.className =
  "bg-black text-white font-semibold rounded-lg text-center h-10 px-3 py-1  hover:opacity-80";
myOrders.addEventListener("click", () => {
  window.location.href = "order.html";
});
nav.append(title, backBtn, myOrders, cartCount);
mainFrame.appendChild(nav);

box = document.createElement("div");
box.classList =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100";
let footer = document.createElement("div");
footer.classList = "flex justify-center items-center gap-4 bg-gray-100";
leftBtn = document.createElement("button");
leftBtn.innerText = "< Previous";
leftBtn.className =
  "bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 px-5 py-2";
leftBtn.addEventListener("click", () => {
  if (PageCount > 1) {
    PageCount--;
    let newSkip = (PageCount - 1) * myPagelimit;
    getData(newSkip);
  }
});
rightBtn = document.createElement("button");
rightBtn.innerText = "Next >";
rightBtn.className =
  "bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 px-5 py-2";
rightBtn.addEventListener("click", () => {
  if (PageCount < totalPages) {
    PageCount++;
    let newSkip = (PageCount - 1) * myPagelimit;
    getData(newSkip);
  }
});
onPage = document.createElement("span");
onPage.innerText = "1/20";
onPage.classList =
  "px-4 py-2 border border-gray-300 bg-gray-300 rouded-lg font-bold shadow-sm";
let searchBox = document.createElement("div");
searchBox.innerHTML = `<input type=text id=searchBar class="h-7 w-50 border-2 bg-gray-300"> <button class=" h-8 p-1 bg-blue-400 border-1 hover:bg-blue-500">Search</button>`;
let categories = document.createElement("div");
let cartContainer = document.createElement("div");
cartContainer.className = "bg-gray-100 p-6";
mainFrame.appendChild(searchBox);
categories.className = "flex flex-wrap gap-2 p-4 bg-gray-100";

async function getCategories(){
  let response=await fetch("https://dummyjson.com/products/categories");
let categoryList=await response.json();
 
categoryList.forEach((category) => {
  let btn = document.createElement("button");
  btn.innerText = category.name;
  btn.className =
    "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600";
   

  btn.addEventListener("click", async () => {
    if (category.name === "All") {
      getData(0);
      return;
    }
    let response = await fetch(
      `https://dummyjson.com/products/category/${category.slug}`
    );
    let result = await response.json();
    box.innerHTML = "";
    result.products.forEach((product) => {
      let detail = document.createElement("div");
    detail.className = "bg-white rounded-xl shadow-lg hover:shadow-2xl";
    let image = document.createElement("img");
    image.src = product.thumbnail;
    image.className = "w-full h-56 object-cover";
    let content = document.createElement("div");
    content.className = "p-4";
    let title = document.createElement("h2");
    title.className = "text-lg font-bold text-gray-800 mb-1";
    title.innerText = product.title;
    let category = document.createElement("p");
    category.className =
      "text-xs text-blue-700 uppercase font-semibold bg-blue-100 px-3 py-1 rounded-full";
    category.innerText = product.category;
    let description = document.createElement("p");
    description.className = "text-sm mt-3 text-grya-600";
    description.innerText =
      product.description.length > 80
        ? product.description.substring(0, 80) + "..."
        : product.description;
    let price = document.createElement("h3");
    price.className = "text-3xl font-bold text-green-600 mt-4";
    price.innerText = `$${product.price}`;
    let rating = document.createElement("p");
    rating.className = "text-yellow-500 mt-2 font-semibold";
    rating.innerHTML = `${product.rating}`;
    let stock = document.createElement("p");
    stock.className =
      "text-green-700 bg-green-100 rounded-full text-sm px-3 py-1 ";
    stock.innerText = `Stock: ${product.stock}`;

    let likeBtn = document.createElement("button");
    whiteLike = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>`;
    redLike = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#f50a0a" stroke="#f50a0a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>`;
    let isLike = false;
    likeBtn.innerHTML = whiteLike;
    let localLikeState = localStorage.getItem(`isLike_${product.id}`);
    if(localLikeState === "true") {
      isLike = true;
      likeBtn.innerHTML = redLike;
    } else {
      likeBtn.innerHTML = whiteLike;
    }
    
    likeBtn.addEventListener("click", () => {
      console.log("like button clicked");
      isLike=!isLike;
   
      if(isLike){
        likeBtn.innerHTML = redLike;
      }
      else{
        likeBtn.innerHTML=whiteLike;
      }
      localStorage.setItem(`isLike_${product.id}`, isLike);
    });

    let button = document.createElement("button");
    button.className =
      "mt-3 ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ";
    button.innerText = "Add to Cart";
    button.addEventListener("click", () => {
      cart.push({ orderId: Date.now(), product: product ,quantity:1});
      saveToLocalStorage();
      cartCount.innerText = "Cart";

      Swal.fire({
        title: "Item Added To Cart!",
        icon: "success",
        draggable: true,
      });
    });
    content.append(
      title,
      category,
      description,
      price,
      rating,
      stock,
      likeBtn,
      button,
    );
    detail.append(image, content);
    box.appendChild(detail);
  });
  
  });
  categories.appendChild(btn);
});
let allBtn=document.createElement("button");
 allBtn.className =
    "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600";
    allBtn.innerText="All";
    allBtn.addEventListener("click",()=>{
      getData(0);
    });
    categories.prepend(allBtn);
}
getCategories();
mainFrame.appendChild(categories);
mainFrame.appendChild(box);
mainFrame.appendChild(cartContainer);
footer.appendChild(leftBtn);
footer.appendChild(onPage);
footer.appendChild(rightBtn);
mainFrame.appendChild(footer);

//get data
async function getData(myskipvalue) {
  let url = `https://dummyjson.com/products/?skip=${myskipvalue}&limit=${myPagelimit}`;
  let response = await fetch(url);
  let result = await response.json();
  console.log(result);
  totalPages = Math.ceil(result.total / myPagelimit);
  onPage.innerText = `${PageCount}/${totalPages}`;
  box.innerHTML = "";

  result.products.forEach((product) => {
    let detail = document.createElement("div");
    detail.className = "bg-white rounded-xl shadow-lg hover:shadow-2xl";
    let image = document.createElement("img");
    image.src = product.thumbnail;
    image.className = "w-full h-56 object-cover";
    let content = document.createElement("div");
    content.className = "p-4";
    let title = document.createElement("h2");
    title.className = "text-lg font-bold text-gray-800 mb-1";
    title.innerText = product.title;
    let category = document.createElement("p");
    category.className =
      "text-xs text-blue-700 uppercase font-semibold bg-blue-100 px-3 py-1 rounded-full";
    category.innerText = product.category;
    let description = document.createElement("p");
    description.className = "text-sm mt-3 text-grya-600";
    description.innerText =
      product.description.length > 80
        ? product.description.substring(0, 80) + "..."
        : product.description;
    let price = document.createElement("h3");
    price.className = "text-3xl font-bold text-green-600 mt-4";
    price.innerText = `$${product.price}`;
    let rating = document.createElement("p");
    rating.className = "text-yellow-500 mt-2 font-semibold";
    rating.innerHTML = `${product.rating}`;
    let stock = document.createElement("p");
    stock.className =
      "text-green-700 bg-green-100 rounded-full text-sm px-3 py-1 ";
    stock.innerText = `Stock: ${product.stock}`;

    let likeBtn = document.createElement("button");
    whiteLike = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>`;
    redLike = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#f50a0a" stroke="#f50a0a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>`;
    let isLike = false;
    likeBtn.innerHTML = whiteLike;
    let localLikeState = localStorage.getItem(`isLike_${product.id}`);
    if(localLikeState === "true") {
      isLike = true;
      likeBtn.innerHTML = redLike;
    } else {
      likeBtn.innerHTML = whiteLike;
    }
    
    likeBtn.addEventListener("click", () => {
      console.log("like button clicked");
      isLike=!isLike;
   
      if(isLike){
        likeBtn.innerHTML = redLike;
      }
      else{
        likeBtn.innerHTML=whiteLike;
      }
      localStorage.setItem(`isLike_${product.id}`, isLike);
    });

    let button = document.createElement("button");
    button.className =
      "mt-3 ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ";
    button.innerText = "Add to Cart";
    button.addEventListener("click", () => {
      cart.push({ orderId: Date.now(), product: product ,quantity:1});
      saveToLocalStorage();
      cartCount.innerText = "Cart";

      Swal.fire({
        title: "Item Added To Cart!",
        icon: "success",
        draggable: true,
      });
    });
    content.append(
      title,
      category,
      description,
      price,
      rating,
      stock,
      likeBtn,
      button,
    );
    detail.append(image, content);
    box.appendChild(detail);
  });
}
getData(0);
function cartFrame() {
  cartContainer.innerHTML = "";
  footer.style.display = "none";
  box.style.display = "none";
  backBtn.style.display = "block";
  cartContainer.style.display = "block";
  if (cart.length == 0) {
    cartContainer.innerText = "No Item Added";
  }
  cart.forEach((item) => {
    let itemQuantity = item.quantity||1;
    let addedItem = document.createElement("div");

    addedItem.classList =
      "bg-white shadow-md rounded-xl p-4 m-3 flex items-center gap-6";
    let cartImage = document.createElement("div");
    cartImage.classList = "h-20 w-20";
    let itemImage = document.createElement("img");
    itemImage.src = item.product.thumbnail;
    itemImage.classList = "object-cover w-full h-full";
    cartImage.appendChild(itemImage);
    let title = document.createElement("h3");
    title.innerText = item.product.title;
    title.classList = "text-semibold text-gray-900";
    let quantityChangBox = document.createElement("div");
    quantityChangBox.classList =
      "border rounded-lg px-3 py-2 flex items-center gap-2 ";
    let subtractBtn = document.createElement("button");

    subtractBtn.innerText = "-";
    subtractBtn.classList = "w-8 h-8 border rounded hover:bg-gray-200";

    subtractBtn.addEventListener("click", () => {
      console.log("subtract btn clicked");

      if (itemQuantity > 1) {
        itemQuantity--;
        item.quantity=itemQuantity;
        quantity.innerText = itemQuantity;
        saveToLocalStorage();
      }
    });
    let quantity = document.createElement("span");
    quantity.innerText = `${itemQuantity}`;
    quantity.classList = "w-8 text-center font-bold";

    let addBtn = document.createElement("button");
    addBtn.innerText = "+";
    addBtn.classList = "w-8 h-8 border rounded hover:bg-gray-200";
    addBtn.addEventListener("click", () => {
      itemQuantity++;
      item.quantity=itemQuantity;
      quantity.innerText = itemQuantity;
      saveToLocalStorage();
      console.log("add btn clicked");
    });
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
    deleteBtn.className = "m-2 p-1 text-gray-500 hover:text-red-600";

    deleteBtn.addEventListener("click", () => {
      let itemIndex = cart.indexOf(item);

      if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        saveToLocalStorage();
        cartFrame();
      }
    });

    quantityChangBox.append(subtractBtn, quantity, addBtn);
    addedItem.append(cartImage, title, quantityChangBox, deleteBtn);
    cartContainer.appendChild(addedItem);
  });
  if (cart.length > 0) {
    let processPaymentBtn = document.createElement("button");
    processPaymentBtn.innerText = "Process Payment";
    processPaymentBtn.classList =
      "bg-yellow-400 border-2 border-yellow-600 p-1 m-2";
    processPaymentBtn.addEventListener("click", () => {
      window.location.href = "payment.html";
    });
    cartContainer.prepend(processPaymentBtn);
  }
}
function frameChange() {
  footer.style.display = "flex";
  box.style.display = "grid";
  backBtn.style.display = "none";
  cartContainer.style.display = "none";
}
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function retrieveFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
