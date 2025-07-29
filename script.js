const productData = [
  { name: 'Smartphone', price: 9999, category: 'Smartphone', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Laptop', price: 49999, category: 'Laptop', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
  { name: 'Headphones', price: 1999, category: 'Headphones', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Beatsheadphones.JPG/800px-Beatsheadphones.JPG' },
  { name: 'Smartwatch', price: 3499, category: 'Smartwatch', img: 'https://images.unsplash.com/photo-1600181957600-54f9f43c116b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bluetooth Speaker', price: 2299, category: 'Bluetooth', img: 'https://images.unsplash.com/photo-1611078489935-0cb9645fc943?auto=format&fit=crop&w=400&q=80' },
  { name: 'Wireless Mouse', price: 799, category: 'Mouse', img: 'https://images.unsplash.com/photo-1615639541025-2791a1061fba?auto=format&fit=crop&w=400&q=80' }
];

const productList = document.getElementById('product-list');
let cart = [], total = 0;

function renderProducts() {
  productList.innerHTML = '';
  productData.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = `product ${p.category}`;
    div.innerHTML = \`
      <img src="\${p.img}" alt="\${p.name}">
      <h3>\${p.name}</h3>
      <p>₹\${p.price}</p>
      <button onclick="addToCart('\${p.name}', \${p.price})">Add to Cart</button>
    \`;
    productList.appendChild(div);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
  document.getElementById('cart-count').innerText = '🛒 ' + cart.length;
  alert(name + " added to cart!");
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
  document.getElementById('cart-count').innerText = '🛒 ' + cart.length;
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartList.innerHTML = '';
  cart.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = \`\${item.name} - ₹\${item.price} <button onclick="removeItem(\${i})">Remove</button>\`;
    cartList.appendChild(li);
  });
  cartTotal.innerText = total;
}

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  const rzp = new Razorpay({
    key: "YOUR_RAZORPAY_KEY",
    amount: total * 100,
    currency: "INR",
    name: "Khan Shop",
    description: "Order Payment",
    handler: function (response) {
      alert("Payment successful: " + response.razorpay_payment_id);
      cart = [];
      total = 0;
      updateCart();
      document.getElementById('cart-count').innerText = '🛒 0';
    },
    theme: { color: "#007bff" }
  });
  rzp.open();
}

function filterProducts(category) {
  const items = document.querySelectorAll('.product');
  items.forEach(p => {
    p.style.display = category === 'all' || p.classList.contains(category) ? 'block' : 'none';
  });
}

document.getElementById('searchBar').addEventListener('input', function() {
  const search = this.value.toLowerCase();
  const items = document.querySelectorAll('.product');
  items.forEach(p => {
    const name = p.querySelector('h3').innerText.toLowerCase();
    p.style.display = name.includes(search) ? 'block' : 'none';
  });
});

renderProducts();
