//Discord js library
require('dotenv').config();

 
const https = require("https");
const Discord = require("discord.js");
const { measureMemory } = require('vm');
const client = new Discord.Client({intents: 32767});
const prefix = '$';
const music = ["!play bizcochito","!play chicken teriyaki","!play fuin fuan","!play plan a"];
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
        msg.reply(`My creators Github account: \nhttps://github.com/fva062001`)
    }
    if(msg.content.startsWith(`${prefix}suggestion`))
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
            msg.reply("My creator is not in this discord, reach out Tyr#5344");
        }

    }
    if(music.includes(msg.content))
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
            const apiKey = process.env.APPID;
        if(city_name.indexOf("_")>-1)
        {
            https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name[1]}&units=metric&appid=${apiKey}`,function(response){
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
            https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_result}&units=metric&appid=${apiKey}`,function(response){
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