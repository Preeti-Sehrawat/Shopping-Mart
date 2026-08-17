let mainFrame = document.getElementById("main-frame");
let heading=document.createElement("h1");

heading.innerText="My Orders";
mainFrame.appendChild(heading);
heading.classList="font-bold text-3xl text-gray-900 p-2 m-3";
let orders = JSON.parse(localStorage.getItem("orders")) || [];
if (orders.length === 0) {
  mainFrame.innerText = "No Orders Found";
} else {
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    let orderBox = document.createElement("div");
    orderBox.className = "border p-3 m-3 bg-blue-300 ";
    orderDate=document.createElement("h3");
    orderDate.classList="font-bold border p-3 m-3 bg-red-400";
    orderDate.innerText=`Order Date: ${order.orderDate}`;
    orderBox.appendChild(orderDate);
    for (let j = 0; j < order.items.length; j++) {
      let item = document.createElement("p");
      item.classList="font-semibold text-green-800";
      item.innerText =
        order.items[j].product.title + " - $" +order.items[j].product.price;
      orderBox.appendChild(item);
    }
    mainFrame.appendChild(orderBox);
  }
}