//Discord js library
require('dotenv').config();

 
const https = require("https");
const Discord = require("discord.js");
const client = new Discord.Client({intents: 32767});
const prefix = '$';
var variable;
//Ready event, is used to see if the bot is connected to the server
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`);
});


//Respond to a message
client.on("messageCreate", msg => {
    if(msg.content === `${prefix}help`)
    {
        msg.reply(`>>> **These are the commands available:**\n- $help 👍\n- $creator 💻\n- $suggestion 💯 \n- $weather city_name ⛅`)
    }
    if(msg.content === `${prefix}creator`)
    {
        msg.reply(`My creator is <@!272479217118347284>\nGithuh: https://github.com/fva062001`)
    }
    if(msg.content === `${prefix}suggestion`)
    {
        msg.reply(`Send a message to <@!272479217118347284> with the suggestion`)
    }
    if(msg.content === '!play fuin fuan' || msg.content === '!play bizcochito' || msg.content === '!play chicken teriyaki' || msg.content === '!play linda' || msg.content === '!play plan a')
    {
        const response = msg.member;

        msg.author.send(`Refina tus gustos musicales y despues te entramos ${response}`);
        msg.member.kick();
        msg.channel.send("!stop");
    }
    if(msg.content.indexOf(' ')>-1 && msg.content.split(' ')[0] === `${prefix}weather`)
    {
        try {
            const city_name = msg.content.split(' ');
        const city_result = city_name[1].replace('_',' ');
        if(city_name.indexOf("_")>-1)
        {
            https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name[1]}&units=metric&appid=`,function(response){
                response.on("data",function(data){
                    const conversionJSON = JSON.parse(data);
                    const status = conversionJSON.status;
                    const temperature  = conversionJSON.main.temp;
                    const name = conversionJSON.name;
                    const weather = conversionJSON.weather[0].main;
                    const desc = conversionJSON.weather[0].description;
                    const country = conversionJSON.sys.country;
                    msg.reply(`**Weather on ${name} ${country} ⛅** \n- Temperature: ${temperature} C \n- Weather: ${weather} \n- Description: ${desc}`);
                })
            })
        }
        else{
            https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_result}&units=metric&appid=`,function(response){
            response.on("data",function(data){
                const conversionJSON = JSON.parse(data);
                const status = conversionJSON.status;
                const temperature  = conversionJSON.main.temp;
                const name = conversionJSON.name;
                const weather = conversionJSON.weather[0].main;
                const desc = conversionJSON.weather[0].description;
                const country = conversionJSON.sys.country;
                msg.reply(`**Weather on ${name} ${country} ⛅** \n- Temperature: ${temperature} C \n- Weather: ${weather} \n- Description: ${desc}`);
            })
        })
        }
        } catch (error) {
            console.log(error);
        }
        
    }
});

//Logging to the server
client.login(process.env.TOKEN);