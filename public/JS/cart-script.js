document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector(".main-menu").classList.toggle("show")
  );

const divTable = document.getElementById("con-row");
function renderCartList() {
axios
  .get("/cartsAPI/")
  .then((response) => {
      console.log(response.data[0].products);
    response.data[0].products.forEach(
      (card) =>
        (divTable.innerHTML += `

        <tr>
        <td data-column="Car Model"><img src=${card.pics[0]} alt=""  style="width: 270px;"></td>
        <td data-column="Name">${card.name}</td>
        <td data-column="Price">${card.price}<button class="btn" onclick="RemoveDocFromCart('${card._id}')">X</button></td>
        <td data-column="Review">${card.description}</td>
      </tr>
`, document.getElementById("total").innerHTML=Number(document.getElementById("total").innerHTML)+Number(card.price))
    );

  })
  .catch((error) => {
    console.log(error);
  });
    
}

renderCartList()

  function RemoveDocFromCart(id) {
    axios
      .patch(`/deleteFromCart/${id}`)
      .then((data) => {
        location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  }

