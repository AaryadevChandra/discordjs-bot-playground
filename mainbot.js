const { log } = require('console')
const {Client, Intents, MessageFlags, GuildMemberRoleManager} = require('discord.js')
const {token} = require('./config.json')
const BOT_CMD = '.'
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})


client.once('ready', ()=>{
    console.log('client ready');
})


// extracting command from entire bot command 
const getWord = (message, len) => {
    
    let command = ''
    // for every character in bot command
    for(let i =1;i<len;i++){

        // add a char to our empty string
        command += message[i]

        // if any char is ' ', our bot command ends there 
        if(message[i+1] == ' '){
            break
        }
    }
    return command
}

// event -> on message sent on guild
client.on('messageCreate', (message)=>{


    //MUTE USER

    // message starts with our bot command
    // message has at least another character after bot command
    // command doesn't start with ' '
    // message has at least one mention
    if(message.content.startsWith(".") && message.content.charAt(1) != ' ' && message.content.length > 1 && message.mentions.members.at(0) != undefined){
        
        // extracting command from message for bot        
        let command = getWord(message.content, message.content.length);
        console.log('command: ' + command);
        if(command == 'sm'){
            for(let i=0;i<message.mentions.members.size;i++){
                try{
                    message.mentions.members.at(i).voice.setMute();
                }catch(e){
                    console.log(e);
                    console.log('Error while muting member: ', message.mentions.members.at(i));
                }
            }
        }
        else if(command == 'sd'){
            for(let i=0;i<message.mentions.members.size;i++){
                try{
                    message.mentions.members.at(i).voice.setDeaf();
                }catch(e){
                    console.log(e);
                    console.log('Error while deafening member: ', message.mentions.members.at(i));
                }
                
            }
        }
        else if(command == 'sum'){
            for(let i=0;i<message.mentions.members.size;i++){
                try{
                    message.mentions.members.at(i).voice.setMute(false);
                }catch(e){
                    console.log(e);
                    console.log('Error while unmuting member: ', message.mentions.members.at(i));
                }
            }
        }
        else if(command == 'sud'){
            for(let i=0;i<message.mentions.members.size;i++){
                try{
                    message.mentions.members.at(i).voice.setDeaf(false);
                }catch(e){
                    console.log(e);
                    console.log('Error while undeafening member: ', message.mentions.members.at(i));
                }
            }
        }
        else if(command == 'kick'){
            for(let i=0;i<message.mentions.members.size;i++){
                try{
                    message.mentions.members.at(i).kick()
                }catch(e){
                    console.log(e);
                    console.log('Error while kicking member: ', message.mentions.members.at(i));
                }
            }
        }
        else if(command == 'ban'){
            for(let i=0;i<message.mentions.members.size;i++){
                try{
                    message.mentions.members.at(i).ban();
                }catch(e){
                    console.log(e);
                    console.log('Error while banning member: ', message.mentions.members.at(i));
                }
            }
        }
    }
    // console.log(message.content.charAt(4));
})


client.login(token)