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
        <td data-column="Car Model"><img src=${card.pics[0]} alt=""  style="width: 250px;"></td>
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

  const FormNewCAR = document.getElementById('form-car')
  FormNewCAR.addEventListener("submit",(e)=>{
    e.preventDefault()
  let inputs = document.getElementsByClassName('feedback-input')
  let CarType = document.getElementById("selectID").value
  let NewCarObj = {name:inputs[1].value,price:inputs[2].value,category:CarType,description:inputs[3].value,pics:[inputs[4].value]}
  let id=inputs[0].value
  axios
  .patch(`/updateProduct/${id}`, NewCarObj)
  .then((data) => {
    location.reload()
  })
  .catch((error) => {
    console.log(error);
  });
  
  })