const mongoose = require('mongoose');
const guildSchema = mongoose.Schema({
    _Id: mongoose.Schema.Types.ObjectId,
    ID: String,
    PreferredName: String
})
module.exports = mongoose.model('User', guildSchema, 'users');