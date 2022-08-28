import env from 'dotenv';
import https from "https"
import axios from "axios";
import Discord from "discord.js";
const client = new Discord.Client({intents: 32767});
const prefix = '$';
const content = "";
const music = ["!play bizcochito","!play chicken teriyaki","!play fuin fuan","!play plan a"];
const commands = [`${prefix}help`,`${prefix}weather ${content}`,`${prefix}creator`,`${prefix}suggestion ${content}`];
const keys = env.config();
import {Weather} from './WeatherClass.js'
//Ready event, is used to see if the bot is connected to the server
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}`);
});


//Respond to a message
client.on("messageCreate", msg => {
    if(msg.content === `${prefix}help`)
    {
        msg.reply(`>>> **These are the commands available:**\n- $help 👍\n- $creator 💻\n- $suggestion message 💯 \n- $weather city_name ⛅ \n- $joke 🥳`)
    }
    else if(msg.content === `${prefix}creator`)
    {
        msg.reply(`My creators Github account: \nhttps://github.com/fva062001`)
    }
    else if(msg.content.startsWith(`${prefix}suggestion`))
    {
        const suggestion = msg.content.replace(`${prefix}suggestion `,"");
         try
        {
            client.users.fetch(process.env.OWNER_ID).then(dm => {
                const message = suggestion;
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
        const member = msg.member;

        msg.author.send(`Dude what is that music?? ${member}`);
        msg.member.kick();
        msg.channel.send("!stop");
    }
    else if(msg.content.indexOf(' ')>-1 && msg.content.split(' ')[0] === `${prefix}weather`)
    {
            const city_name = msg.content.replace(`${prefix}weather`,"");
                https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${process.env.WEATHER_KEY}`,function(response){
                    response.on("data",function(data){
                        const information = JSON.parse(data);
                        try{
                            const info = new Weather(information);
                            info.toString();
                            msg.reply(info.getMessage());
                        } 
                        catch(error){
                            msg.reply("Bad Request, try again (It could be a typo)");
                        }
                })
            })
        
    }
    else if(msg.content === `${prefix}joke`)
    {
        const options = {
          method: 'GET',
          url: 'https://dad-jokes.p.rapidapi.com/random/joke',
          headers: {
            'X-RapidAPI-Key': process.env.JOKE_KEY,
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
            msg.reply(`A joke for you: \n${response.data.body[0].setup} \n${response.data.body[0].punchline} `);
        }).catch(function (error) {
            console.error(error);
        });




    }
    //Doing a split on spaces in the main command to see if the command exist
    else if(msg.content.startsWith(prefix) && !commands.includes(msg.content.split(" ")[0]))
    {
        msg.reply("Unknown command, please use $help to see the commands available");
    }

});

//Logging to the server
client.login(process.env.DC_BOT_KEY);