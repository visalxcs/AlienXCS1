let products = []
let card = []

let showProduct = document.getElementById('show-product');
let cartItem = document.getElementById('cart-item');
let cartCount = document.getElementById('cart-count');
let searchInput = document.getElementById('input-search');

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        products = data;
        // console.log(data);
        displayProducts(products);
    })
    .catch(err => console.error("Error fetching products:", err));

// ================= DISPLAY PRODUCTS =================
function displayProducts(data) {
    showProduct.innerHTML = "";

    data.forEach(p => {
        showProduct.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm">
                <img src="${p.image}" class="card-img-top p-3" style="height:200px;object-fit:contain;">
                <div class="card-body text-center">
                    <h5>${p.title}</h5>
                    <p class="fw-bold text-warning">$${p.price}</p>
                    <button onclick="addToCart(${p.id})" class="btn btn-dark w-100">
                    Add To Cart
                    </button>
                </div>
                </div>
            </div>
        `;
    });
}
// ================= SEARCH =================
searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );
    displayProducts(filtered);
});

// ================= ADD TO CART =================
function addToCart(id) {
    const exsiting = card.find(item => item.id === id);

    if (exsiting) {
        exsiting.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        card.push({ ...product, quantity: 1 });
    }
    // console.log(card);
    updateCart();
    Swal.fire({
        icon: "success",
        title: "Added to cart ☕",
        confirmButtonText: "OK",

    });
}

function updateCart() {
    cartItem.innerHTML = ""
    let total = 0
    card.forEach((item, index) => {
        total += item.price * item.quantity
        cartItem.innerHTML = `
             <div class="border-bottom pb-3 mb-3">
                <div class="d-flex justify-content-between">
                <h6>${item.title}</h6>
                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>

                <div class="d-flex align-items-center gap-2 mt-2">
                <button onclick="changeQty(${index}, -1)" class="btn btn-sm btn-outline-dark">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)" class="btn btn-sm btn-outline-dark">+</button>
                <button onclick="removeItem(${index})" class="btn btn-sm btn-danger ms-auto">
                    <i class="bi bi-trash"></i>
                </button>
                </div>
            </div>
        `;

    });
    cartItem.innerHTML += `
        <div class="border-top pt-3">
            <h5>Total: $${total.toFixed(2)}</h5>
            <button onclick="checkout()" class="btn btn-success w-100 mt-2">
                Checkout
            </button>
        </div>
        `;

    cartCount.textContent = card.length
}

// ================= CHANGE QTY =================
function changeQty(index, change) {
    card[index].quantity += change

    if (card[index] <= 0) {
        card.slice(index, 1)
    }
    updateCart()
}

// ================= REMOVE ITEM =================
function removeItem(index){
    card.splice(index, 1)
    updateCart()
}

// ================= REMOVE ITEM =================

function checkout(){
    if(card.length === 0){
        Swal.fire("Cart is Empty");
        return;
    }
    Swal.fire({
        icon: "success",
        title: "Order Successful ☕",
        text: "Your items are on the way!"
    });

    card = [];
    updateCart();
}