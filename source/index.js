

import "./style.css";


import City from "./city";
import design from "./design";
import { findapropriateIcon } from "./design";


let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
let key = "?key=68WH75WEX746CWWTCLVM4QMHM";

let currCity = null;
let outer = document.querySelector(".outer");

let inner = document.querySelector(".inner");

let button = document.querySelector("form button");
let cityname = document.querySelector("form input[type='text']");
let wthrtoday = document.querySelector(".wthrtoday");
let wthrhourly = document.querySelector(".wthrhourly");
let wthrweekly = document.querySelector(".wthrweekly");



button.addEventListener("click", (event)=>{
    event.preventDefault();
    fetch(url + cityname.value + key, {
        mode : "cors"
    }).then(function(response){
        return response.json();
    }).then(function(response){
        currCity = new City(response.resolvedAddress, (inner.textContent === "°C" ? (String((response.currentConditions.temp - 32) * 5) / 9).toFixed(2) : response.currentConditions.temp) , response.currentConditions.icon, response.currentConditions.humidity, response.currentConditions.windspeed, response.currentConditions.datetime, (response.currentConditions.tzoffset === undefined ? response.tzoffset : response.currentConditions.tzoffset));
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
    if (currCity != null)
         ChangeUnit();
})



function fill(what, array){
    let length = (what === "hourly" ? array.length : 6);
    for (let i = 0; i < length; i++){
        if (what === "hourly"){
            currCity.addhourlydata(array[i].datetime, (inner.textContent === "°C" ? (String((array[i].temp - 32) * 5) / 9).toFixed(2) : array[i].temp), array[i].icon, array[i].humidity, array[i].windspeed);
        }
        else{
            currCity.addweeklydata(array[i].datetime, (inner.textContent === "°C" ? (String((array[i].temp - 32) * 5) / 9).toFixed(2) : array[i].temp), (inner.textContent === "°C" ? (String((array[i].tempmax - 32) * 5) / 9).toFixed(2) : array[i].tempmax), (inner.textContent === "°C" ? (String((array[i].tempmin - 32) * 5) / 9).toFixed(2) : array[i].tempmin), array[i].icon, array[i].humidity, array[i].windspeed);
        }
    }
}




function ChangeUnit(){
    if (inner.textContent === "°F"){
        currCity.temp = toFarenheit(Number(currCity.temp));
    }
    else{
        currCity.temp = toCelsius(Number(currCity.temp));
    }
    UpdateHourly();
    UpdateWeekly();
    UpdateDisplay();
}


function toFarenheit(temp){
    return (((temp * 9) / 5) + 32).toFixed(2);
    //return String(((temp * 9)/5) + 32).toFixed(2);
}


function toCelsius(temp){
    return (((temp - 32) * 5) / 9).toFixed(2);
    
}



function UpdateHourly(){
    let Hourlychildren = document.querySelectorAll(".cardholder .card .imgholder");
    for (let i = 0; i < currCity.hourlydata.length; i++){
        if (inner.textContent === "°F"){
            currCity.hourlydata[i].temp = toFarenheit(currCity.hourlydata[i].temp);
        }
        else{
            currCity.hourlydata[i].temp = toCelsius(currCity.hourlydata[i].temp);
        }
        Hourlychildren[i].lastChild.textContent = currCity.hourlydata[i].temp + inner.textContent;
    }
}


function UpdateWeekly(){
    let weeklytemps = document.querySelectorAll(".weeklydataholder .imgholder");
    for (let i = 0; i < 6; i++){
        if (inner.textContent === "°F"){
            currCity.weeklydata[i].maxtemp = toFarenheit(currCity.weeklydata[i].maxtemp);
            currCity.weeklydata[i].mintemp = toFarenheit(currCity.weeklydata[i].mintemp);
        }
        else{
            currCity.weeklydata[i].maxtemp = toCelsius(currCity.weeklydata[i].maxtemp);
            currCity.weeklydata[i].mintemp = toCelsius(currCity.weeklydata[i].mintemp);
        }
        weeklytemps[i].lastChild.textContent = "H:" + currCity.weeklydata[i].maxtemp + inner.textContent + "/L:" + currCity.weeklydata[i].mintemp + inner.textContent;
    }
}

function UpdateDisplay(){
    let citytemp = document.querySelector(".citytemp");
    let img = findapropriateIcon(currCity.weather);
    citytemp.textContent = currCity.temp + document.querySelector(".inner").textContent + ", " + img[1];
}



