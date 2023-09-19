//close button for hidden menu button
function HideShow() {
    var x = document.getElementById("hoverMenu");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


//cart check out js

if (document.readyState == 'loading') {  //check the page is done loading to run js file
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {// khi page đã load xong

    //add function when click "remove" button
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //add function when change the quantity
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    //add function when click "add to cart" button
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

        //add function when click "purchase" button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

//button "purchase"
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {  //remove all items when the button is clicked
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


//remove the div of the div of the button (div id="cart-row")
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() 
    updateCartTotal()
}

//only accept quantity >=1
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) { //check if input is a number or not, and if it's >=1
        input.value = 1  //trả về 1
    }
    updateCartTotal()
}

//khi button "add to cart" được clicked
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement //get the div of the div of button (div id="shop item")

    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}


//create a row when items are added to cart with title, price, img
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')

    cartRow.classList.add('cart-row')

    var cartItems = document.getElementsByClassName('cart-items')[0]

    //ko lặp lại item nếu đã có trong cart
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents

    cartItems.append(cartRow)//add items vào div khi click 
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)//able to remove in cart
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)//able to change quantity in cart
}


//update the cart with the quantity and price when the "remove" button is clicked or the product is added to cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText) //ko include kí hiệu "đ" khi calculate price 

        var quantity = quantityElement.value
        total = total + (price * quantity) //tổng giá tiền khi add hay remove item
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = total + 'đ'
}