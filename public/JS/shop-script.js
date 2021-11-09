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
<a>${card.price} </a>
<span style='font-size:20px;color:rgb(0, 0, 0);font-style:normal;font-weight:bold;'>&#36;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<button onclick="findProductById('${card._id}')" class="btn">Shop Now </button>
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

function findProductById(id) {
  axios
    .get(`/findOneProduct/${id}`)
    .then((response) => {
      const cartProduct = response.data;
      console.log(cartProduct);
      AddNewDocToCart(cartProduct);
    })
    .catch((error) => {
      console.log(error);
    });
}

function AddNewDocToCart(product) {
  axios
    .patch(`/addToCartProducts`, product)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
