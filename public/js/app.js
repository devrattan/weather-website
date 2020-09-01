const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let value = searchElement.value;
   
    console.log('testing');

    messageOne.textContent = "loading";
    messageTwo.textContent = ""


    fetch("http://localhost:3000/weather?address=" + value).then((response) => {
   response.json().then((data)=>{
     if(data.error) messageOne.textContent = data.error;
     else{
         messageOne.textContent = data.location; 
         messageTwo.textContent += data.data; 
     }
   })
})
})