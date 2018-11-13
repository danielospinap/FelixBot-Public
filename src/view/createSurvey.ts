import * as Discord from 'discord.js';

let Channel: Discord.TextChannel;
let triggers = [
    {
        text: "New member", 
        emoji:'1⃣',
        event: "guildMemberAdd"
    }
]

function createSurvey(member: Discord.GuildMember, channel: Discord.TextChannel) {
    Channel = channel;
    getTrigger();


    // channel.send('Enter the name of the survey')
    //     .then( (message: Discord.Message) => {
    //         let channelMessage: Discord.TextChannel = <Discord.TextChannel> message.channel;
    //         console.log(`Sent message: "${message.content}" to channel: "${channelMessage.name}"`);
    //     });
}

function getTrigger () {
    //Creating message with options:
    let messageWithOptions = 'Select the trigger for the survey: \n';
    triggers.forEach(trigger => {
        messageWithOptions = messageWithOptions + (`\n${trigger.emoji} ${trigger.text}`);
        
    });
    
    //Sending message to the client
    Channel.send(messageWithOptions)
        .then((message: Discord.Message) => {
            let channelMessage: Discord.TextChannel = <Discord.TextChannel> message.channel;
            console.log(`Sent message: "${message.content}" to channel: "${channelMessage.name}"`);

            //Separating the emojis
            let emojis = [];
            triggers.forEach(trigger => {
                emojis.push(trigger.emoji);
            });
            //Add the reactions to the message
            addReactions(message, emojis, 0);
            
            //Collect the reactions to the message
            //Filter by triggers
            const filter = (reaction, user) => {
                return user.id !== process.env.BOT_ID && triggers.find( (trigger) => {
                    return trigger.emoji === reaction.emoji.name;
                }) !== undefined;
            }
            //Start the collector
            let collector = message.createReactionCollector(filter, { time: 60000 });

            collector.on('collect', (reaction, collector) => {

                //TODO: Continuar aqui
                console.log(reaction.emoji);
                
            });
        });
}

function addReactions(message: Discord.Message, emojis: string[], index: number) {
    if ( emojis[index] ) {
        message.react(emojis[index])
            .then( () => {
                addReactions(message, emojis, index+1);
            });
    }
}

export { createSurvey }