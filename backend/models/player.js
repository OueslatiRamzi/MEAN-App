const mongoose = require('mongoose'); // import mongoose

const playerSchema = mongoose.Schema({
    name: String,
    post: String,
    number: String,
    teamId:{type:String , ref:'team'},
    image: String,

})
const player = mongoose.model('Player', playerSchema)

module.exports = player;