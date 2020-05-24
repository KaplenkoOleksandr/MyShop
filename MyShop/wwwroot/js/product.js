const uriP = 'api/Products';
let products = [];

function getProducts(id) {
    fetch(uriP)
        .then(response => response.json())
        .then(data => _displayProducts(data, id))
        .catch(error => console.error('Unable to get categories.', error));
}

function _displayProducts(data, id){
    const div = document.getElementById('products');
    data.forEach(product => {
        if (product.categoryId == id) {
            div.innerHTML += `
                <div class="prod">
                           
                </div>
            `;
        }
    })
}

function displayProductsPage() {

    page.innerHTML = `
        <div id="page-preloader" class="preloader" style="z-index:100000">
            <div class="loader"></div>
            <div class="loader-text">Loading</div>
            <div class="shop-text">Shop</div>
        </div>
<div style="height:100vh; width:100%;"></div>
        <div class="catalog" id="products" >
        </div>
    `;
    hide_preloader();
}