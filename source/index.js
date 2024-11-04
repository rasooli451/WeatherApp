

import "./style.css";


import City from "./city";
import design from "./design";


let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
let key = "?key=68WH75WEX746CWWTCLVM4QMHM";

let currCity = null;
let outer = document.querySelector(".outer");

let inner = document.querySelector(".inner");

let button = document.querySelector("form button");
let cityname = document.querySelector("form input[type='text']");
let currmode = "C";
let wthrtoday = document.querySelector(".wthrtoday");
let wthrhourly = document.querySelector(".wthrhourly");
let wthrweekly = document.querySelector(".wthrweekly");

const d = new Date();
const localTime = d.getTime();
const localOffset = d.getTimezoneOffset() * 60000;
console.log(localOffset);
const utc = localTime + localOffset;
const offset = 4.5; // UTC of USA Eastern Time Zone is -05.00
const usa = utc + (3600000 * offset);
const usaTimeNow = new Date(usa).toLocaleString();
console.log(usaTimeNow);

button.addEventListener("click", (event)=>{
    event.preventDefault();
    fetch(url + cityname.value + key, {
        mode : "cors"
    }).then(function(response){
        return response.json();
    }).then(function(response){
        currCity = new City(response.resolvedAddress, (currmode === "C" ? (String((response.currentConditions.temp - 32) * 5) / 9).toFixed(2) : response.currentConditions.temp) , response.currentConditions.icon, response.currentConditions.humidity, response.currentConditions.windspeed, response.currentConditions.datetime, (response.currentConditions.tzoffset === undefined ? response.tzoffset : response.currentConditions.tzoffset));
        console.log(response);
        let hours = response.days[0].hours;
        fill("hourly", hours);
        let days = response.days.slice(1, 8);
        fill("weekly", days);
        wthrtoday.innerHTML = "";
        wthrhourly.innerHTML = "";
        wthrweekly.innerHTML = "";
        design(currCity, true);
    }).catch(function(error){
        console.log(error);
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
    let startindex = parseInt(currCity.currtime.substring(0,2));
    for (let i = 0; i < array.length; i++){
        if (what === "hourly"){
            currCity.addhourlydata(array[i].datetime, (currmode === "C" ? (String((array[i].temp - 32) * 5) / 9).toFixed(2) : array[i].temp), array[i].icon, array[i].humidity, array[i].windspeed);
        }
        else{
            currCity.addweeklydata(array[i].datetime, (currmode === "C" ? (String((array[i].temp - 32) * 5) / 9).toFixed(2) : array[i].temp), (currmode === "C" ? (String((array[i].tempmax - 32) * 5) / 9).toFixed(2) : array[i].tempmax), (currmode === "C" ? (String((array[i].tempmin - 32) * 5) / 9).toFixed(2) : array[i].tempmin), array[i].icon, array[i].humidity, array[i].windspeed);
        }
    }
}