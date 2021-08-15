const Discord = require('discord.js')
module.exports = {
    name: 'radio',
    description: 'Radios: autodj, heart, capital, tfm, tsr, sh, rr',
    async execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send("Please join a VC!")
        if (args[0] === "autodj") {
            client.channels.cache.get("868464428910276608").join().then((connection) => {
                connection.voice.setSelfDeaf(true)
                connection.play("http://azura.itsradiowave.net/radio/8050/radio.mp3")
                message.reply("Now playing the AutoDJ!")
            })
        }
        if (args[0] === "heart") {
            client.channels.cache.get("868464428910276608").join().then((connection) => {
                connection.voice.setSelfDeaf(true)
                connection.play("http://media-ice.musicradio.com/HeartLondonMP3#W")
                message.reply("Now playing Heart!")
            })
        }
        if (args[0] === "capital") {
            client.channels.cache.get("868464428910276608").join().then((connection) => {
                connection.voice.setSelfDeaf(true)
                connection.play("https://media-ssl.musicradio.com/CapitalMP3")
                message.reply("Now playing Capital!")
            })
        }
        if (args[0] === "tfm") {
            client.channels.cache.get("868464428910276608").join().then((connection) => {
                connection.voice.setSelfDeaf(true)
                connection.play("https://radio.truckers.fm/")
                message.reply("Now playing TruckersFM!")
            })
        }
        if (args[0] === "tsr") {
            message.member.voice.channel.join().then((connection) => {
                connection.voice.setSelfDeaf(true)
                connection.play("https://oreo.truckstopradio.co.uk/radio/8000/radio.mp3")
                message.reply("Now playing TruckStopRadio!")
            })
        }
        if (args[0] === "sh") {
            message.member.voice.channel.join().then((connection) => {
                connection.voice.setSelfDeaf(true)
                connection.play("http://stream.simulatorhits.com/radio/8000/stream")
                message.reply("Now playing SimulatorHits!")
            })
        }
        if (args[0] === "rr") {
            message.member.voice.channel.join().then((connection) => {
                connection.voice.setSelfDeaf(true)
                connection.play("https://stream.reachradio.co.uk/")
                message.reply("Now playing ReachRadio!")
            })
        }
        if (args[0] === "leave") {
            message.member.voice.channel.join().then((connection) => connection.disconnect())
            message.channel.send(":wave: See you later!")
        }
    }
}