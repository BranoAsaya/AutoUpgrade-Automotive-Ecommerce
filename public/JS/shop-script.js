document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector(".main-menu").classList.toggle("show")
  );

const divHomeCards = document.getElementById("home-cards-id");
function axiosProducts(page) {
  axios
    .get("/productsAPI")
    .then((resp) => {
      let Products = resp.data;
      console.log(Products);
      let category = Products.filter((arg) => {
        return arg.category === page;
      });

      category.forEach(
        (card) =>
          (divHomeCards.innerHTML += `
<div id="tid"> 
<a  class="flipCard">
   <img src=${card.pics[0]} alt="Card top">
    <img src=${card.pics[1]} alt="Card back">
 </a>
<h3>${card.name}</h3>
    <p>${card.description}</p>
    <a href=>${card.price}</a>
    <span>$</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="" class="btn">Shop Now </a>
</div> 
`)
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {});
}
axiosProducts(page);
