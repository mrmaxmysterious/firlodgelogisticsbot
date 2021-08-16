const Discord = require("discord.js");
const client = new Discord.Client()
const fetch = require("node-fetch")
const prefix = "-"
const fs = require("fs")
const { DiscordTogether } = require("discord-together")
const bans = require("./models/bans")
const users = require("./models/users")
const webhook = new Discord.WebhookClient("868111919221997568", "iNhKTtSuCjez8zAyxYn3nmqe9veSbQlOusWWnNZ2N44hzerWjCNLn2gg_BsCz2AYeu__")
const currentlyplaying = require("./models/currentlyplaying");

client.commands = new Discord.Collection()
client.discordTogether = new DiscordTogether(client);
client.mongoose = require("./utils/mongoose")

const commandFiles = fs
    .readdirSync('./commands/')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", async () => {
    let guild = client.guilds.cache.get("809561669856264192")
    let ready = new Discord.MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription("Bot has logged into client.")
        .setColor("#ec3232")
    /*let verify = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**Welcome To Firelodge Logistics**

        __How to Verify__
        
        > Please press the button below to verify that you are human and unlock all channels.`)
        .setColor("#ec3232")*/
    webhook.send(ready)
    /*client.api.channels("838028189962993674").messages.post({
        data: {
            embeds: [verify],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: "Verify!",
                            style: 4,
                            custom_id: "verify",
                            emoji: {
                                name: '🔓'
                            }
                        }
                    ]

                }
            ]
        }
    })*/
    console.log("Online!")
    /*
    let embed = new Discord.MessageEmbed()
        .setDescription(`
    > **Choose your Role you would like**
VTC partner - If you would like to be a partner please Speak to Chief Executive Officer ,Chief Operating Officer or Our General Manager
<:TruckersMP:847761001758720000> - Are you a TMP Staff Then pick this role - Please Note The TMP Role is Only Meant for These Who work on or at TruckersMP
<:TruckersFM:857328514499870720> - Are you a TFM Staff Then pick this role- These role for Only for those that Work or Present at TruckersFM
<:SH1:868135243540996107> - Are you a SimHits Staff Then pick this role- These role for Only for those that Work or Present at SimulatorHits

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

* <:convoys:868133358041972787> ｜Convoy Ping! - You can get Notified when we post a new weekly Convoy
* :newspaper:｜News - Get Notified when we go live on twitch Or post a New YouTube Video
* :loudspeaker: ｜Announcements - Get Notified when we make a New Announcement

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

:tada: - To Get the Associate Role - Not a member, doesn't use our tags or colours, But they do get to join convoys and meet with drivers or just chat, This role can be period or can be a way for you to decide if you would like to become a driver with
Our Community
If you are wanting to choose more than one role then your more than welcome to
Choose a Role to Open more Channels In the Firelodge Logistics Server

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**Truck Simulator Roles:**
<:ets2:868131681834516530> | Hauling Truckers

**Minecraft Members Role:**
<:Minecraft:868131864249004082> | Crafty Members

**Farming Simulator 19 Role:**
:farmer: | Farming Sim Members

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**Twitch Notified**
Get Notified when I go live on Twitch in <#820616654773682177>

<:twitch:868132236275363870>｜Twitch Notified
    `)
        .setColor("#ec3232")
    client.api.channels("809779693271515186").messages.post({
        data: {
            embed: embed,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: "class_select_1",
                            options: [
                                {
                                    label: "TruckersMP",
                                    value: "tmp",
                                    description: "TruckersMP Role",
                                    emoji: {
                                        name: "TruckersMP",
                                        id: "847761001758720000"
                                    }
                                },
                                {
                                    label: "TruckersFM",
                                    value: "tfm",
                                    description: "TruckersFM Role",
                                    emoji: {
                                        name: "TruckersFM",
                                        id: "857328514499870720"
                                    }
                                },
                                {
                                    label: "SimHits",
                                    value: "sh",
                                    description: "SimulatorHits Role",
                                    emoji: {
                                        name: "SH1",
                                        id: "868135243540996107"
                                    }
                                },

                            ],
                            placeholder: "Choose a Staff role..."
                        },
                    ]
                }
            ]
        }
    })
    client.api.channels("809779693271515186").messages.post({
        data: {
            embed: embed,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: "class_select_1",
                            options: [
                                {
                                    label: "Convoy Ping",
                                    value: "cp",
                                    description: "You can get Notified about Convoys",
                                    emoji: {
                                        name: "convoys",
                                        id: "868133358041972787"
                                    }
                                },
                                {
                                    label: "News Ping",
                                    value: "np",
                                    description: "Get notified from Social Medias",
                                    emoji: {
                                        name: "📰"
                                    }
                                },
                                {
                                    label: "Announcements Ping",
                                    value: "ap",
                                    description: "Get Notifed about New Announcements",
                                    emoji: {
                                        name: "📢",
                                    }
                                },

                            ],
                            placeholder: "Choose a Ping Role..."
                        },
                    ]
                }
            ]
        }
    })
    client.api.channels("809779693271515186").messages.post({
        data: {
            embed: embed,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: "class_select_1",
                            options: [
                                {
                                    label: "Associate Role",
                                    value: "ar",
                                    description: "Join convoys without being staff",
                                    emoji: {
                                        name: "🎉",
                                    }
                                },
                            ],
                            placeholder: "Associate Role"
                        },
                    ]
                }
            ]
        }
    })
    client.api.channels("809779693271515186").messages.post({
        data: {
            embed: embed,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: "class_select_1",
                            options: [
                                {
                                    label: "Hauling Truckers",
                                    value: "ht",
                                    description: "Truck Simulator Role",
                                    emoji: {
                                        name: "ets2",
                                        id: "868131681834516530"
                                    }
                                },
                                {
                                    label: "Crafty Members",
                                    value: "cm",
                                    description: "Minecraft Role",
                                    emoji: {
                                        name: "Minecraft",
                                        id: "868131864249004082"
                                    }
                                },
                                {
                                    label: "Farming Sim Members",
                                    value: "fsm",
                                    description: "Farming Simulator 19 Role",
                                    emoji: {
                                        name: "👨‍🌾",
                                    }
                                },
                            ],
                            placeholder: "Choose a Game Role..."
                        }
                    ]
                },
            ]
        }
    })
    client.api.channels("809779693271515186").messages.post({
        data: {
            embed: embed,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: "class_select_1",
                            options: [
                                {
                                    label: "Twitch Notified",
                                    value: "tn",
                                    description: "Get notified when I go live!",
                                    emoji: {
                                        name: "twitch",
                                        id: "868132236275363870"
                                    }
                                },
                            ],
                            placeholder: "Twitch Notified Role"
                        }
                    ]
                },
            ]
        }
    })
    */
    setInterval(() => {
        let statuses = ['Apply for the VTC Today!', 'firelodgelogistics.co.uk', 'Need support? Email: support@firelodgelogistics.co.uk', 'For enquiries email: enquiries@firelodgelogistics.co.uk'];
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: "PLAYING" })
    }, 5000)
})

client.ws.on("INTERACTION_CREATE", async (data) => {
    if (data.data.custom_id === "verify") {
        let embed = new Discord.MessageEmbed()
            .setTitle("Verified!")
            .setDescription(`
        Please Head to <#838028189962993674>
        Next Feel free to Head to <#809779693271515186> to choose Your roles 
        Want to Join the Logistics Team <#810542965121613864> and Apply Today!
        ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        For More Information on our VTC head on over to <#809774287317762090>
        Do you want to Invite us to a convoy Then feel free to contact eventmanagement@firelodgelogistics.co.uk
        Or are you looking for a partnership Then please contact our Upper Management Team
        ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        Before you continue please make sure to Read Our <#816684011468226601>
        
        **Hope to drive with you soon**
        `)
            .setColor("#ec3232")
        client.api.interactions(data.id, data.token).callback.post({
            data: {
                type: 4,
                data: {
                    flags: 1 << 6,
                    embeds: [embed],
                    allowed_mentions: { parse: [] }
                }
            }
        });
        let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
        user.roles.add("838020988993667093")
        user.roles.remove("834803780075388948")
    }
    if (data.data.custom_id === "class_select_1") {
        if (data.data.values[0] === "tmp") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("809767624099495966")) {
                user.roles.remove("809767624099495966")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("809767624099495966")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "tfm") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("830530119672004640")) {
                user.roles.remove("830530119672004640")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("830530119672004640")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "sh") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("860661705498427403")) {
                user.roles.remove("860661705498427403")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("860661705498427403")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "cp") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("859166506246996038")) {
                user.roles.remove("859166506246996038")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("859166506246996038")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "np") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("859166522248658964")) {
                user.roles.remove("859166522248658964")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("859166522248658964")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "ap") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("809770832825810984")) {
                user.roles.remove("809770832825810984")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("809770832825810984")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "ar") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("809561847786111028")) {
                user.roles.remove("809561847786111028")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("809561847786111028")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "ht") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("832936339720634429")) {
                user.roles.remove("832936339720634429")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("832936339720634429")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "cm") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("833064084857421884")) {
                user.roles.remove("833064084857421884")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("833064084857421884")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "fsm") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("832927693094912011")) {
                user.roles.remove("832927693094912011")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("832927693094912011")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
        if (data.data.values[0] === "tn") {
            let user = client.guilds.cache.get("809561669856264192").members.cache.get(data.member.user.id)
            if (user.roles.cache.has("855709536793919488")) {
                user.roles.remove("855709536793919488")
                client.api.interactions(data.id, data.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            flags: 1 << 6,
                            content: "Removed the role, to add it, re-select this option.",
                            allowed_mentions: { parse: [] }
                        }
                    }
                });
                return
            }
            user.roles.add("855709536793919488")
            client.api.interactions(data.id, data.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        flags: 1 << 6,
                        content: "Added the role, to remove it, re-select this option.",
                        allowed_mentions: { parse: [] }
                    }
                }
            });
        }
    }
})

client.on("guildMemberAdd", async (member) => {
    let ping = "<@" + member.user.id + ">"
    let server = member.guild.name
    client.channels.cache.get("809598744680726578").send(`
    **Welcome ${ping}!, welcome to **${server}**!**

    Please Head to <#838028189962993674>
    Next Feel free to Head to <#809779693271515186> to choose Your roles 
    Want to Join the Logistics Team <#810542965121613864> and Apply Today!
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    For More Information on our VTC head on over to <#809774287317762090>
    Do you want to Invite us to a convoy Then feel free to contact eventmanagement@firelodgelogistics.co.uk
    Or are you looking for a partnership Then please contact our Upper Management Team
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    Before you continue please make sure to Read Our <#816684011468226601>
    
    **Hope to drive with you soon**
    `)
    member.roles.add("834803780075388948")
})

client.on("message", async (message) => {
    if (message.author.bot) return null;
    if (message.channel.type === "dm" && message.content.includes("hello")) {
        return message.channel.send("Hello, my name is Firelodge Test. I am max!#6911's testing bot.")
    }
    if (message.channel.type === "dm") {
        return message.channel.send("Hello, my commands don't work in DM's...")
    }
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command) {
        let cmd = client.commands.get(command)
        if (!cmd) return null;
        cmd.execute(client, message, args);
    }
})

client.on("message", async (message) => {
    if (message.content.includes("discord.gg") || message.content.includes("discord.io")) {
        if (message.member.roles.cache.has("859187633501241366") || message.member.roles.cache.has("827848082158911528")) return;
        message.delete()
        let embed = new Discord.MessageEmbed()
            .setTitle("Discord Invite Links are not allowed here.")
            .setDescription("Please don't post Discord Invites, unless if you are allowed to do so.")
            .setColor("#ec3232")
        message.channel.send(embed)
        return
    }
})

client.on("channelCreate", async (channel) => {
    let channelName = await client.channels.cache.get(channel.id).name
    let logEmbed = new Discord.MessageEmbed()
        .setTitle("Channel Created")
        .setDescription("New channel created.\n\n**ID:** " + channel.id + "\n**Name:** " + channelName + "\n**Channel Type:** " + channel.type)
        .setColor("#ec3232")
    webhook.send(logEmbed)
})

client.on("messageDelete", async (message) => {
    if (message.author.bot) return;
    if (message.channel.id === "828421967597797396") return;
    let logEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle("Message Deleted")
        .setDescription("A message was deleted.\n\n**Content:** " + message.content + "\n**Message ID:** " + message.id + "\n**Message URL:** " + message.url)
        .setColor("#ec3232")
    webhook.send(logEmbed)
})

client.on("messageUpdate", async (old, now) => {
    if (now.author.bot) return;
    if (now.channel.id === "828421967597797396") return;
    let logEmbed = new Discord.MessageEmbed()
        .setAuthor(now.author.tag, now.author.displayAvatarURL({ dynamic: true }))
        .setTitle("Message Updated")
        .setDescription("A message was updated.\n\n**Old:** " + old.content + "\n**New:** " + now.content)
        .setColor("#ec3232")
    webhook.send(logEmbed)
})

client.on("guildBanAdd", async (guild, user) => {
    let db = await bans.findOne({ ID: user.id })
    if (!db) { db = await new bans({ ID: user.id, AmountOfBans: 0 }).save() }
    let banidr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let banid = banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)] + "" + banidr[Math.floor(Math.random() * banidr.length)]
    let arr = [{
        "banReason": (await guild.fetchBan(user.id)).reason,
        "banID": banid,
        "timeOfBan": new Date()
    }]
    await db.updateOne(
        { $push: { Bans: arr } }
    )
    await db.updateOne({ AmountOfBans: AmountOfBans + 1 })
    let logEmbed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setTitle("User Banned")
        .setDescription("A user was banned.\n\n**Reason:** " + (await guild.fetchBan(user.id)).reason + "\n**User ID:** " + (await guild.fetchBan(user.id)).user + "\n**Ban ID:** " + banid)
        .setColor("#ec3232")
    webhook.send(logEmbed)
})

client.on("guildBanRemove", async (guild, user) => {
    let db = await bans.findOne({ ID: user.id })
    let lastBan = db.Bans[db.AmountOfBans - 1]
    let logEmbed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setTitle("User Unbanned")
        .setDescription("A user was unbanned.\n\n **User ID:** " + user.id + "\n**Existing Ban Reason:** " + lastBan.banReason)
        .setColor("#ec3232")
    webhook.send(logEmbed)
})

client.on("voiceStateUpdate", async (old, neww) => {
    if (neww.member.bot) return;
    if (!neww.channel.id) return;
    if (neww.channel.id === "868464428910276608") {
        neww.channel.members.forEach(async member => {
            member.voice.setChannel("868440100349026394")
            member.roles.add("868476914648616960")
            client.channels.cache.get("868462275286143026").send("<@" + neww.member.id + "> | Use all commands here. Do `-help` to see all available radio stations.")
        })
    }
})
client.on("voiceStateUpdate", async (old, neww) => {
    if (old.member.bot) return;
    if (!old.channel.id) return;
    if (old.channel.id === "868440100349026394") {
        old.member.roles.remove("868476914648616960")
    }
})

client.mongoose.init()
client.login("ODY3ODc1MzAwNTQwMTUzODk2.YPnd2w.FOs_PN4JlXuuvDSSZGlmbxXl3Z8");