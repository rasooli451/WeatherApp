






class City{
    weeklydata = [];
    hourlydata = [];
    constructor(name, temp, weather){
        this.name = name;
        this.temp = temp;
        this.weather = weather;
    }

    addweeklydata(day, temp, weather) {
        this.weeklydata.push({day, temp, weather})
    }
    addhourlydata(time, temp, weather){
        this.hourlydata.push({time, temp, weather});
    }
}

export default City;