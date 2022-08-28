export class Weather {


    //Getters
    getTemperature()
    {
        return this.temperature;
    }

    getName()
    {
        return this.name;
    }

    getWeather()
    {
        return this.weather;
    }


    getDescription()
    {
        return this.desc;
    }

    getCountry()
    {
        return this.country;
    }

    getMessage(){
        return this.message;
    }

    toString()
    {
        const temperature  = this.getTemperature();
        const name = this.getName();
        const weather = this.getWeather();
        const desc = this.getDescription();
        const country = this.getCountry();
        const message = `**Weather on ${name} ${country} ⛅** \n- Temperature: ${temperature} C \n- Weather: ${weather} \n- Description: ${desc}`;
        this.message = message;
    }

    constructor(data){
        this.JSON = data;
        this.temperature = this.JSON.main.temp;
        this.name = this.JSON.name;;
        this.weather = this.JSON.weather[0].main;
        this.desc = this.JSON.weather[0].description;
        this.country = this.JSON.sys.country;
        this.message = "notworking";
    }
}