const mongoose = require('mongoose');
const guildSchema = mongoose.Schema({
    _Id: mongoose.Schema.Types.ObjectId,
    connectionid: String
})
module.exports = mongoose.model('Playing', guildSchema, 'np');