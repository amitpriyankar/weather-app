// import { response } from "express";

console.log('Hey there!');




const weatherInfo = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherInfo.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = "Loading...";
    message2.textContent = "";
    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message1.textContent = data.error;
        } else {
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        }
    })
})

})