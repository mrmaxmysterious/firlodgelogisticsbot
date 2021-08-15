const mongoose = require('mongoose');
const guildSchema = mongoose.Schema({
    _Id: mongoose.Schema.Types.ObjectId,
    ID: String,
    Bans: Array,
    AmountOfBans: Number
})
module.exports = mongoose.model('Ban', guildSchema, 'bans');