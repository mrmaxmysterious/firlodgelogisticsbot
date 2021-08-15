const Discord = require('discord.js')
const bans = require("../models/bans")
module.exports = {
    name: 'searchbans',
    description: 'Search all bans a user has had.',
    async execute(client, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        let user = await bans.findOne({
            ID: args[0]
        })
        if(!user) {
            let embed = new Discord.MessageEmbed()
            .setAuthor("User's bans")
            .setDescription("This user does not have any bans!")
            .setColor("#ec3232")
            return message.channel.send(embed)
        }
        let embed = new Discord.MessageEmbed()
            .setDescription("<a:mploading:833380162434367508> Fetching bans...")
            .setColor("#ec3232")
        let m = await message.channel.send(embed)
        let v = 0
        let banlist = []
        user.Bans.forEach(ban => {
            v = v + 1
            banlist.push("**__Ban " + v + "__**\n\n**Ban ID:** " + user.Bans[v - 1].banID + "\n**Ban Reason:** " + user.Bans[v - 1].banReason + "\n**Time Of Ban:** " + user.Bans[v - 1].timeOfBan)
        })
        setTimeout(() => {
            let embed = new Discord.MessageEmbed()
            .setAuthor("User's bans")
            .setDescription(banlist.join("\n\n"))
            .setColor("#ec3232")
            m.edit(embed)
        }, 500);
    }
}