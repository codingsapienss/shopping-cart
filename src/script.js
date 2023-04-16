let shop = document.getElementById("shop");
let cart_amount = document.querySelector('.cart-amount')

let cart = JSON.parse(localStorage.getItem("data")) || []

let populateItem = () => {
  return (shop.innerHTML = data.map((item) => {
    let { id, name, price, desc, img } = item

    let search = cart.find((items) => parseInt(items.id, 10) === id) || [];

    return `<div id="product-id-${id}" class="item">
              <img width="100" src="./shopping data/${img}" alt="product-img">
              <div class="details">
                  <h3>${name}</h3>
                  <p>${desc}</p>
                  <div class="price-quant">
                      Rs. ${price}
                      <div class="button">
                          <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
                          <div id="${id}" class="quant">
                           ${search.item === undefined ? 0 : search.item}
                           </div>
                          <i onclick='increment(${id})' class="bi bi-plus-lg"></i> 
                      </div>
                  </div>
              </div>
          </div>`
  }
  )
    .join('')
  )
};

populateItem();

let decrement = (id) => {
  selectedItem = document.getElementById(id)

  let search = cart.find((item) => {
    return item.id === selectedItem.id
  })

  if (search === undefined) return
  else if (search.item === 0) return;
  else {
    search.item -= 1
  }
  update(id)

  cart = cart.filter((x) => {
    return x.item !== 0
  })

  localStorage.setItem('data', JSON.stringify(cart))

}


let increment = (id) => {
  selectedItem = document.getElementById(id)
  let search = cart.find((item) => {
    return item.id === selectedItem.id
  })
  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      item: 1,
    })
  } else {
    search.item += 1
  }
  update(id)

  localStorage.setItem('data', JSON.stringify(cart))
}



let update = (id) => {
  let search = cart.find((item) => {
    return selectedItem.id === item.id
  })
  document.getElementById(id).innerHTML = search.item
  calculateAllItems()
}

let calculateAllItems = () => {
  let no = 0
  if (cart.length > 0) {
    cart.forEach((item) => {
      no += item.item
    })
  }
  cart_amount.innerHTML = no
}

calculateAllItems()