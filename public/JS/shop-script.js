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

      category.forEach((card) =>
          (divHomeCards.innerHTML += `
<div id="tid"> 
<a  class="flipCard">
   <img src=${card.pics[0]} alt="Card top">
    <img src=${card.pics[1]} alt="Card back">
 </a>
<h3>${card.name}</h3>
    <p>${card.description}</p>
    <a>${card.price} </a>
    <span style='font-size:20px;color:rgb(0, 0, 0);font-style:normal;font-weight:bold;'>&#36;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
      <button onclick="AddProductToCart('${card._id}')" class="btn">Shop Now </button>
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


function AddProductToCart(id) {
  axios.patch('/addToCartProducts/',{id:id})
  .then( (response)=> {
    console.log(response);
  })
  .catch( (error)=> {
    console.log(error);
  });
  
}