const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hospitalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }]
},{
    timestamps:true,
});

var Hospital = mongoose.model("Hospital", hospitalSchema)

module.exports = Hospital;