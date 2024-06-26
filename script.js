const searchform = document.querySelector(".search-form");
const searchIcon = document.querySelector(".search-icon");
const inputBox = document.querySelector(".search-input");
const shopSection = document.querySelector(".shop-section");
const showMoreBtn = document.getElementById("showMoreBtn");

var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let page = 1;
let query = "";
async function getData() {
  query = inputBox.value;
  const response = await fetch(
    `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&page=${page}&country=US&category_id=aps`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "35c1f3b1c8msh6c318f5a9cad0acp18cb7bjsnf4e0029b235a",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  if (!data) return;
  // console.log(data);
  if (page === 1) {
    shopSection.innerHTML = "";
  }
  let products = data.data.products;
  showData(products);
}
let showData = (products) => {
  products.forEach((item) => {
    const div1 = document.createElement("div");
    div1.classList.add("box");
    const div2 = document.createElement("div");
    div2.classList.add("box-content");
    const div3 = document.createElement("div");
    div3.classList.add("img-div");
    const image = document.createElement("img");
    image.src = item.product_photo;
    const imageLink = document.createElement("a");
    imageLink.href = item.product_url;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    div3.appendChild(imageLink);
    const h2 = document.createElement("h2");
    h2.innerText = `Up to 50% off | International brands`;
    const p = document.createElement("p");
    p.innerText = `See more`;
    div2.appendChild(h2);
    div2.appendChild(div3);
    div2.appendChild(p);
    div1.appendChild(div2);
    shopSection.appendChild(div1);
  });
  showMoreBtn.style.display = "block";
};
searchform.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  getData();
});
showMoreBtn.addEventListener("click", () => {
  page++;
  getData();
});
