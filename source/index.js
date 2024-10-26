

import "./style.css";

import sunny from "./sunny.png";
import rainy from "./rainy.png";
import cloudy from "./cloudy.png";
import snowy from "./snowy.png";
import City from "./city";

let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
let key = "?key=68WH75WEX746CWWTCLVM4QMHM";

let currCity = null;
let outer = document.querySelector(".outer");

let inner = document.querySelector(".inner");

let button = document.querySelector("form button");
let cityname = document.querySelector("form input[type='text']")


button.addEventListener("click", (event)=>{
    event.preventDefault();
    fetch(url + cityname.value + key, {
        mode : "cors"
    }).then(function(response){
        return response.json();
    }).then(function(response){
        currCity = new City(response.resolvedAddress, [response.currentConditions.temp, ((response.currentConditions.temp - 32) * 5) / 9], response.currentConditions.icon);
        console.log(response);
        let hours = response.days[0].hours;

    })
})





outer.addEventListener("click", ()=>{
    if (inner.textContent === "°C"){
        inner.style.left = "50%";
        inner.style.top = "3px";
        inner.textContent = "°F";
    }
    else{
        inner.style.left = "5%";
        inner.style.top = "3px";
        inner.textContent = "°C";
    }
})



function fill(what, array){
    
}