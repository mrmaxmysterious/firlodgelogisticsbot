const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: 'I mean, self explanitory...',
    async execute(client, message, args) {
        let c2 = client.commands.array()
        let embed = new Discord.MessageEmbed()
        .setTitle(client.user.tag + " || Help")
        .setDescription("**Prefix:** ```-```\n" + c2.map(c => "`" + c.name + "` - **" + c.description + "**").join(`\n`))
        .setColor("#ec3232")
        message.reply(embed)
    }
}