let cardHolderName = document.getElementById("card-holder-name");
let cardNumber = document.getElementById("card-Number");
let Expiry = document.getElementById("expiry");
let CVV = document.getElementById("cvv");
let errorMsg = document.getElementById("Error-msg");
let paybtn = document.getElementById("pay-btn");
let orders = document.getElementById("Orders");
orders.innerHTML = `<h2 class="text-lg font-bold text-slate-800 mb-4">Order Details</h2> 
<table  id="order-details-table" class="w-full border-separate mt-4">
<tr" > 
<th class="p-2">Product Name</th>
<th class="p-2">Quantity</th>
<th class="p-2">Price</th>
<th class="p-2">Total Price</th>
</tr>
</table>`;
let grandTotal=0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let table = document.getElementById("order-details-table");

cart.forEach((item) => {
  grandTotal+=item.quantity * item.product.price;
  let row = document.createElement("tr");

  row.innerHTML = `
    <td class="p-2"  >${item.product.title}</td>
    <td class="p-2">${item.quantity}</td>
    <td class="p-2">$${item.product.price}</td>
    <td class="p-2">$${item.quantity * item.product.price}</td>
  `;

  table.appendChild(row);
  
});
  let totalRow=document.createElement("tr");
  totalRow.innerHTML=`<td class="p-2" >Grand Total</td>
  <td class="p-2">$${grandTotal.toFixed(2)}</td>`;
table.appendChild(totalRow);
paybtn.addEventListener("click", () => {
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  let orders = JSON.parse(localStorage.getItem("orders"))||[];
orders.push({
  orderId:Date.now(),
  items:cart,
  orderDate:new Date().toLocaleString()
});
localStorage.setItem("orders",JSON.stringify(orders));
localStorage.removeItem("cart");
  if (
    cardHolderName.value == "" ||
    cardNumber.value == "" ||
    Expiry.value == "" ||
    CVV.value == ""
  ) {
    errorMsg.classList.remove("invisible");
    console.log("if details are not filed ");
    setTimeout(() => {
      errorMsg.classList.add("invisible");
    }, 2000);
  } else {
    Swal.fire({
      title: "Payment Done Successfully!",
      icon: "success",
      draggable: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) window.location.href = "index.html";
    });
  }
});

function saveToLocalStorage() {
  localStorage.setItem("order", JSON.stringify(order));
}
function retrieveFromLocalStorage() {
  return JSON.parse(localStorage.getItem("order")) || [];
}
