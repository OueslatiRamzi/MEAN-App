const mongoose = require('mongoose'); // import mongoose

const teamSchema = mongoose.Schema({
    teamName: String,
    teamCountry: String
})
const team = mongoose.model('team', teamSchema)

module.exports = team;