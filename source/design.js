
import sunny from "./sunny.png";
import rainy from "./rainy.png";
import cloudy from "./cloudy.png";
import snowy from "./snowy.png";
import partlycloudy from "./partlycloudy.png";
import humiditypng from "./humidity.png";
import windspeedpng from "./windspeed.png";
import currmode from "./index.js";
let wthrcont = document.querySelector(".wthr");
let wthrtoday = document.querySelector(".wthrtoday");

function design(City, success){
    if (success){
        let name = document.createElement("p");
        name.classList.add("Cityname");
        name.textContent = City.name;
        wthrtoday.appendChild(name);
        wthrtoday.style.backgroundColor = "#2a272785";

        let wthrholder = document.createElement("div");
        wthrholder.classList.add("wthrholder");
        
        let img = findapropriateIcon(City.weather);
        let image = document.createElement("img");
        image.src = img[0];
        image.classList.add("todayimg");
        let imageholder = document.createElement("div");
        imageholder.appendChild(image);
        imageholder.classList.add("imageholder");
        let weatherstatus = document.createElement("p");
        weatherstatus.textContent = img[1];
        imageholder.appendChild(weatherstatus);
        wthrholder.appendChild(imageholder);
        wthrtoday.appendChild(wthrholder);
        
        let infoholder = document.createElement("div");
        infoholder.classList.add("infoholder");
        wthrholder.appendChild(infoholder);
        
        let temp = document.createElement("p");
        temp.classList.add("citytemp");
        temp.textContent = City.temp + document.querySelector(".inner").textContent;
        infoholder.appendChild(temp);
        
        let sectionholder = document.createElement("div");
        sectionholder.classList.add("sectionholder");
        infoholder.appendChild(sectionholder);
        toreducerepetion("humidity", sectionholder, City.humidity, City.windspeed);
        toreducerepetion("windspeed", sectionholder, City.humidity, City.windspeed);
    }
    else{

    }
}





export default design;





function findapropriateIcon(string){
    if (string.includes("clear", 0)){
        if (string.includes("day")){
                return [sunny, "Sunny"];
        }
        else if(string.includes("night")){
            return;
        }
        else{
            return [sunny, "Sunny"];
        }
    }
    else if(string.includes("cloudy")){
        if (string.includes("partly")){
            return [partlycloudy, "Partly Cloudy"];
        }
        else{
            return [cloudy, "Cloudy"];
        }
    }
    else if(string === "rain"){
        return [rainy, "Rainy"];
    }
    else{
        return [snowy, "Snowy"];
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
    requiredp.textContent = (what === "humidity" ? humidity : windspeed);
    generalcont.appendChild(requiredp);
}