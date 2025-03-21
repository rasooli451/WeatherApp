
import sunny from "./assets/clear-day.png";
import rain from "./assets/rain.png";
import cloudy from "./assets/cloudy.png";
import snow from "./assets/snow.png";
import partlycloudyday from "./assets/partly-cloudy-day.png";
import partlycloudynight from "./assets/partly-cloudy-night.png";
import humiditypng from "./assets/humidity.png";
import windspeedpng from "./assets/windspeed.png";
import clearnight from "./assets/clear-night.png";


let wthrtoday = document.querySelector(".wthrtoday");


let wthrhourly = document.querySelector(".wthrhourly");
let wthrweekly = document.querySelector(".wthrweekly");
let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function design(City, success){
    if (success){
        wthrtoday.style.backgroundColor = "#2a272785";
        let name = document.createElement("p");
        name.classList.add("Cityname");
        name.textContent = City.name;
        let contfornameanddate = document.createElement("div");
        contfornameanddate.classList.add("nameanddate");
        contfornameanddate.appendChild(name);
        let date = document.createElement("p");
        date.textContent = FindCurrentTime(City);
        contfornameanddate.appendChild(date);

        wthrtoday.appendChild(contfornameanddate);

        let wthrholder = document.createElement("div");
        wthrholder.classList.add("wthrholder");
        
        let img = findapropriateIcon(City.weather);
        let image = document.createElement("img");
        image.src = img[0];
        image.classList.add("todayimg");
        let imageholder = document.createElement("div");
        imageholder.appendChild(image);
        imageholder.classList.add("imageholder");
        wthrholder.appendChild(imageholder);
        wthrtoday.appendChild(wthrholder);
        
        let infoholder = document.createElement("div");
        infoholder.classList.add("infoholder");
        wthrholder.appendChild(infoholder);
        
        let temp = document.createElement("p");
        temp.classList.add("citytemp");
        temp.textContent = City.temp + document.querySelector(".inner").textContent + ", " + img[1];
        infoholder.appendChild(temp);
        
        let sectionholder = document.createElement("div");
        sectionholder.classList.add("sectionholder");
        infoholder.appendChild(sectionholder);
        toreducerepetion("humidity", sectionholder, City.humidity, City.windspeed);
        toreducerepetion("windspeed", sectionholder, City.humidity, City.windspeed);

        designhourlyforecast(City);
        designweeklyforecast(City);
    }
    else{
        let errormsg = document.createElement("p");
        errormsg.classList.add("errormsg");
        wthrtoday.style.backgroundColor = "transparent";
        wthrhourly.style.backgroundColor = "transparent";
        wthrweekly.style.backgroundColor = "transparent";
        if (City === 400){    
            errormsg.textContent = "No Matching Location Found!";
            wthrtoday.appendChild(errormsg);
        }
        else if(City === 429){
            errormsg.textContent = "Too Many Requests, Try Again Later!";
        }
        else{
            errormsg.textContent = "Error " + City;
        }
    }
}





export default design;

export {findapropriateIcon};





function findapropriateIcon(string){
    if (string.includes("clear", 0)){
        if (string.includes("day")){
                return [sunny, "Sunny"];
        }
        else if(string.includes("night")){
            return [clearnight, "Clear"];
        }
        else{
            return [sunny, "Sunny"];
        }
    }
    else if(string.includes("cloudy")){
        if (string.includes("partly")){
            if (string.includes("day"))
               return [partlycloudyday, "Partly Cloudy"];
            else
               return [partlycloudynight, "Partly Cloudy"]
        }
        else{
            return [cloudy, "Cloudy"];
        }
    }
    else if(string === "rain"){
        return [rain, "Rainy"];
    }
    else{
        return [snow, "Snowy"];
    }

}



function toreducerepetion(what, container, humidity, windspeed){
    let generalcont = document.createElement("div");
    generalcont.classList.add("section");
    container.appendChild(generalcont);
    let icon = document.createElement("img");
    icon.src = (what === "humidity" ? humiditypng : windspeedpng);
    generalcont.appendChild(icon);
    let requiredp = document.createElement("p");
    requiredp.textContent = (what === "humidity" ? humidity + "%": windspeed + "mph");
    generalcont.appendChild(requiredp);
}




function designhourlyforecast(City){
    let title = document.createElement("p");
    title.textContent = "Hourly Forecast";
    title.classList.add("hourlytitle");
    wthrhourly.appendChild(title);
    wthrhourly.style.backgroundColor = "#2a272785";

    let cardholder = document.createElement("div");
    cardholder.classList.add("cardholder");
    wthrhourly.appendChild(cardholder);
    RearrangeArray(City.hourlydata, City);

    for (let i = 0; i < City.hourlydata.length; i++){
        DesignCard(City.hourlydata[i], cardholder);
    }
}


function RearrangeArray(array, City){
    let start = parseInt(City.currtime.substring(0,2)) + 1;
    let newarray = array.slice(start).concat(array.slice(0, start));
    City.hourlydata = newarray;
}



function DesignCard(arraydata, container){
    let card = document.createElement("div");
    card.classList.add("card");

    let time = document.createElement("p");
    time.textContent = (container.classList.contains("cardholder") ? arraydata.time : arraydata.day +", " + weekdays[new Date(arraydata.day).getDay()]);
    card.appendChild(time);
    let image = document.createElement("img");
    let weatherdata = findapropriateIcon(arraydata.weather);
    image.src = weatherdata[0];
    let imgholder = document.createElement("div");
    imgholder.classList.add("imgholder");
    imgholder.appendChild(image);
    let temp = document.createElement("p");
    let mode = document.querySelector(".inner").textContent;
    temp.textContent = (container.classList.contains("cardholder") ? arraydata.temp + mode : "H:" + arraydata.maxtemp + mode + "/L:" + arraydata.mintemp + mode);
    imgholder.appendChild(temp);
    card.appendChild(imgholder);

    let sectionholder = document.createElement("div");
    sectionholder.classList.add("sectionholderforcard");
    toreducerepetion("humidity", sectionholder, arraydata.humidity, arraydata.windspeed);
    toreducerepetion("windspeed", sectionholder, arraydata.humidity, arraydata.windspeed);
    card.appendChild(sectionholder);

    container.appendChild(card);
}



function designweeklyforecast(City){
    let title = document.createElement("p");
    wthrweekly.style.backgroundColor = "#2a272785";
    title.textContent = "Weekly Forecast";
    wthrweekly.appendChild(title);

    let weeklydataholder = document.createElement("div");
    weeklydataholder.classList.add("weeklydataholder");
    wthrweekly.appendChild(weeklydataholder);
    for (let i = 0; i < 6; i++){
        DesignCard(City.weeklydata[i], weeklydataholder);
    }
}





function FindCurrentTime(City){
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = City.tzoffset;
    const currtime = utc + (3600000 * offset);
    const currtimereadable = new Date(currtime).toLocaleString();
    const temp = new Date(currtime);
    return temp.getFullYear() + "-" + Correction(temp.getMonth() + 1) + "-" + Correction(temp.getDate()) + ", " + Correction(temp.getHours()) + ":" + Correction(temp.getMinutes()) + ", " + days[temp.getDay()];
}





function Correction(number){
    return (number > 9 ? number : "0" + number);
}