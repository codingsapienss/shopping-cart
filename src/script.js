let shop = document.getElementById("shop");
let cart_amount = document.querySelector(".cart-amount");

let cart = JSON.parse(localStorage.getItem("data")) || [];

document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptButton = document.getElementById("acceptCookies");
  const rejectButton = document.getElementById("rejectCookies");

  acceptButton.addEventListener("click", function () {
    console.log("Acceptedd");
    // Set a cookie indicating that the user has accepted cookies
    setCookie("cookiesAccepted", "true", 30); // Cookie expires in 30 days

    // Hide the cookie banner
    cookieBanner.style.display = "none";

    // Execute the GA script
    executeGoogleAnalyticsScript();
  });

  rejectButton.addEventListener("click", function () {
    console.log("Rejected");
    // Hide the cookie banner

    cookieBanner.style.display = "none";

    // Optionally, you may want to prevent certain scripts from executing if cookies are rejected
    // For example:
    // doNotExecuteAnalyticsScripts();
  });

  // Check if the user has previously accepted cookies
  if (getCookie("cookiesAccepted") === "true") {
    // Execute the GA script if cookies are already accepted
    executeGoogleAnalyticsScript();
    cookieBanner.style.display = "none"; // Hide the cookie banner
  }
});

// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    ";expires=" +
    expires.toUTCString() +
    ";path=/";
}

// Function to get the value of a cookie
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

// Function to execute Google Analytics script
function executeGoogleAnalyticsScript() {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-TMNXPN27");
}

let populateItem = () => {
  return (shop.innerHTML = data
    .map((item) => {
      let { id, name, price, desc, img } = item;

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
          </div>`;
    })
    .join(""));
};

populateItem();

let decrement = (id) => {
  selectedItem = document.getElementById(id);

  let search = cart.find((item) => {
    return item.id === selectedItem.id;
  });

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);

  cart = cart.filter((x) => {
    return x.item !== 0;
  });

  localStorage.setItem("data", JSON.stringify(cart));
};

let increment = (id) => {
  selectedItem = document.getElementById(id);
  let search = cart.find((item) => {
    return item.id === selectedItem.id;
  });
  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(id);

  localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
  let search = cart.find((item) => {
    return selectedItem.id === item.id;
  });
  document.getElementById(id).innerHTML = search.item;
  calculateAllItems();
};

let calculateAllItems = () => {
  let no = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      no += item.item;
    });
  }
  cart_amount.innerHTML = no;
};

calculateAllItems();
