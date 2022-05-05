//Discord js library
require('dotenv').config();
const https = require("https");
const Discord = require("discord.js");
const client = new Discord.Client({intents: 32767});
const prefix = '$';
const content = "";
const music = ["!play bizcochito","!play chicken teriyaki","!play fuin fuan","!play plan a"];
const commands = [`${prefix}help`,`${prefix}weather ${content}`,`${prefix}creator`,`${prefix}suggestion ${content}`];
//Ready event, is used to see if the bot is connected to the server
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`);
});


//Respond to a message
client.on("messageCreate", msg => {
    if(msg.content === `${prefix}help`)
    {
        msg.reply(`>>> **These are the commands available:**\n- $help 👍\n- $creator 💻\n- $suggestion message 💯 \n- $weather city_name ⛅`)
    }
    else if(msg.content === `${prefix}creator`)
    {
        msg.reply(`My creators Github account: \nhttps://github.com/fva062001`)
    }
    else if(msg.content.startsWith(`${prefix}suggestion`))
    {
        const suggestion = msg.content.split(" ");
        suggestion.splice(0,1);
        try
        {
            client.users.fetch('272479217118347284').then(dm => {
                const message = suggestion.join(" ");
                dm.send("**Suggestion:** \n"+message);
            })
            msg.reply("Suggestion sent 👌")
        }catch(err)
        {
            msg.reply("There was an error, reach out Tyr#5344");
        }

    }
    else if(music.includes(msg.content))
    {
        const response = msg.member;

        msg.author.send(`Refina tus gustos musicales y despues te entramos ${response}`);
        msg.member.kick();
        msg.channel.send("!stop");
    }
    else if(msg.content.indexOf(' ')>-1 && msg.content.split(' ')[0] === `${prefix}weather`)
    {
        try {
            const city_name = msg.content.split(' ');
            const city_result = city_name[1].replace('_',' ');
            const apiKey = process.env.APPID;
            if(city_name.indexOf("_")>-1)
            {
                https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name[1]}&units=metric&appid=${apiKey}`,function(response){
                    response.on("data",function(data){
                        const information = JSON.parse(data);  
                        let info = new Weather(information);
                        info.toString();
                        msg.reply(info.getMessage());
                        
                    })
                })
            }
            else{
                https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_result}&units=metric&appid=${apiKey}`,function(response){
                    response.on("data",function(data){
                        const information = JSON.parse(data);  
                        let info = new Weather(information);
                        info.toString();
                        msg.reply(info.getMessage());
                })
            })
            }
        } catch (error) {
            msg.reply("There was an error, please try again");
        }
        
    }
    //Doing a split on spaces in the main command to see if the command exist
    else if(msg.content.startsWith(prefix) && !commands.includes(msg.content.split(" ")[0]))
    {
        msg.reply("Unknown command, please use $help to see the commands available");
    }

});


class Weather {


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
//Logging to the server
client.login(process.env.TOKEN);