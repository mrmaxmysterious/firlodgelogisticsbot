const Discord = require('discord.js')

module.exports = {
    name: 'activity',
    description: 'Play a Discord built-in Game!',
    async execute(client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("Please join a voice channel!")
        if (args[0] === "youtube") {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`Click this to enable: ${invite.code}`);
            });
        }
        if (args[0] === "fishing") {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
                return message.channel.send(`Click this to enable: ${invite.code}`);
            });
        }
        if (args[0] === "betrayal") {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
                return message.channel.send(`Click this to enable: ${invite.code}`);
            });
        }
        if (args[0] === "poker") {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                return message.channel.send(`Click this to enable: ${invite.code}`);
            });
        }
        if (args[0] === "chess") {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
                return message.channel.send(`Click this to enable: ${invite.code}`);
            });
        }
    }
}