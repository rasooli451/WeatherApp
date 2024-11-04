






class City{
    weeklydata = [];
    hourlydata = [];
    constructor(name, temp, weather, humidity, windspeed, currtime, tzoffset){
        this.name = name;
        this.temp = temp;
        this.weather = weather;
        this.humidity = humidity;
        this.windspeed = windspeed;
        this.currtime = currtime;
        this.tzoffset = tzoffset;
    }

    addweeklydata(day, temp, maxtemp, mintemp, weather, humidity, windspeed) {
        this.weeklydata.push({day, temp, maxtemp, mintemp, weather, humidity, windspeed})
    }
    addhourlydata(time, temp, weather, humidity, windspeed){
        this.hourlydata.push({time, temp, weather, humidity, windspeed});
    }
}

export default City;