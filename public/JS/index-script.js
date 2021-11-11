

document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector(".main-menu").classList.toggle("show")
  );

const HomeCards = [
  {
    img: "https://i.ibb.co/ws0SQgX/toyota-corolla.jpg",
    name: "Lightweight body",
    details:
      "vehicle that will definitely get through the tight corners and nooks",
    link: "./Sedan.html",
  },
  {
    img: "https://i.ibb.co/w75Cp9T/FJ-Cruiser.jpg",
    name: "Off-road performance SUV",
    details: "This car will definitely bring in the thrills!",
    link: "./SUV.html",
  },
  {
    img: "https://i.ibb.co/tPgnbjf/Toyota-Hilux.jpg",
    name: "Reliable and smooth driving",
    details:
      "Attesting to its reputation as a reliable ride (even as early as the distant ‘70s!)",
    link: "./Truck.html",
  },
  {
    img: "https://i.ibb.co/XZ1tM0D/Toyota-wigo.jpg",
    name: "Great for Urban Trips",
    details:
      " Getting around the city is now fun and exciting with the Toyota yaris. ",
    link: "./Hatchback.html",
  },
];

const divHomeCards = document.getElementById("home-cards-id");
HomeCards.forEach(
  (card) =>
    (divHomeCards.innerHTML += `
<div>
<img src=${card.img} alt="" />
<h3>${card.name} </h3>
<p>${card.details} </p>
<a href=${card.link} class="btn">Shop Now </a>

</div>
`)
);

const FormNewCAR = document.getElementById('form-car')
FormNewCAR.addEventListener("submit",(e)=>{
  e.preventDefault()
let inputs = document.getElementsByClassName('feedback-input')
let CarType = document.getElementById("selectID").value
let NewCarObj = {name:inputs[0].value,price:inputs[1].value,category:CarType,description:inputs[2].value,pics:[inputs[3].value]}
axios
.post(`/AddProduct`, NewCarObj)
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.log(error);
});

})
