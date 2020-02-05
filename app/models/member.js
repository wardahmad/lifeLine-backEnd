const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const memberSchema = new mongoose.Schema({
    name: {type: String, required:true},
    nationality: {type: String},
    dateOfBirth: {type: Date},
    nationalID: {type: Number},
    bloodType: {type: String},
    type: {type: String}
},{
    timestamps:true,
});

var Member = mongoose.model('Member', memberSchema);

module.exports = Member;