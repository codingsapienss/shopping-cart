let cart_amount = document.querySelector('.cart-amount')
let  label = document.getElementById('label')
let  shoppingCart = document.getElementById('shopping-cart')

let cart = JSON.parse(localStorage.getItem("data")) || []  


let calculateAllItems = ()=>{
    let no = 0
    if(cart.length>0){
      cart.forEach((item)=>{
        no += item.item
      })
    }
    cart_amount.innerHTML = no
  }
  
  calculateAllItems()

  let populateCartItems = ()=>{
        if(cart.length!== 0){
            label.innerHTML = ``
            shoppingCart.innerHTML = ``
            cart.map((x)=>{
                let {id, item } = x
                let search = data.find((y) => {return y.id == id} ) || []
                return (shoppingCart.innerHTML += `
                <div class="cart_item">
                <img  src="./shopping data/${search.img}" alt="item-img">
                <div class="otherDetails">
                   <div class="item-info">
                        <p>${search.name}</p>
                        <p class="price">Rs. ${search.price}</p>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                   </div>
                   <div class="button">
                    <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
                    <div id="${id}" class="quant">
                      ${item}
                     </div>
                    <i onclick='increment(${id})' class="bi bi-plus-lg"></i> 
                 </div>
                 <div class="totalPrice">
                    Total : Rs.${item * search.price}
                 </div>
                </div>
            </div>`
                )
            })

        }else{
            shoppingCart.innerHTML = ``
            label.innerHTML =
             `
                <h2> Cart is empty </h2>
                <a href="index.html">
                    <button> Back to home </button>
                </a> `
        }
  }

  populateCartItems()

  let decrement = (id) => {
    selectedItem = document.getElementById(id)
  
    let search = cart.find((item) => {
      return item.id === selectedItem.id
    })

    if (search === undefined ) return
    else if (search.item === 0) return;
    else {
      search.item -= 1
    }
    update(id)
  
    cart = cart.filter((x)=>{
      return x.item !== 0
    })

    populateCartItems()
    total()
    localStorage.setItem('data', JSON.stringify( cart  ))

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
    populateCartItems()
    total()
    localStorage.setItem('data', JSON.stringify(cart))
  }
  

  let update = (id) => {
    let search = cart.find((item) => {
      return selectedItem.id === item.id
    })
    document.getElementById(id).innerHTML = search.item
    calculateAllItems()
  }


  let removeItem = (id)=>{
      cart = cart.filter((x)=>{
        return x.id != id
      })
      localStorage.setItem('data', JSON.stringify(cart))
      populateCartItems()
      total()
      calculateAllItems()
  }

  let total = ()=>{
    if(cart.length > 0){
      let totalAmount = 0
      cart.map((x)=>{
        let {item ,id} = x 
        let search = data.find((y)=>{
          return y.id == id
        })

        let sum = item * search.price
        return totalAmount += sum
      })
      return label.innerHTML = `
      
      <p class="totalBill"> Total Bill : Rs.${totalAmount} </p>
      <div class="btns">
           <button onclick="clearCart()" id="clear">Clear</button>
      </div>
      `
    }else return
  }
total()

  let clearCart =()=>{
    cart = []
    localStorage.setItem('data', JSON.stringify(cart))
    console.log('hell');
    populateCartItems()
    calculateAllItems()
  }
