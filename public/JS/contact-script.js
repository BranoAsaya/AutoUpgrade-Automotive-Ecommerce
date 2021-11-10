const divMsg = document.getElementById("con-msg");

document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector(".main-menu").classList.toggle("show")
  );


  document.querySelector('.form-msg')?.addEventListener('submit', e => {
    e.preventDefault();
   
    let objValue = e.currentTarget.myText.value
    newMassage(objValue)
  });
  
function newMassage(value) {
    axios
    .post(`/newContactsMassage/${value}`)
    .then((data) => {
      location.reload()
        
    })
    .catch((error) => {
      console.log(error);
    });
    
}
function showMessages() {
    axios
      .get('/contactsAPI')
      .then((sms) => {
        
          sms.data.forEach(
            (arg) =>
              (divMsg.innerHTML += `
              <div class="message">${arg.message}
              <button onclick="deleteOneMessage('${arg._id}')"  style="float: right;">x</button>
              </div>
               `)
          );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  showMessages()

function deleteOneMessage(id) {
  axios
  .delete(`/deleteMassage/${id}`)
  .then((data) => {
    location.reload()

  })
  .catch((error) => {
    console.log(error);
  });
}