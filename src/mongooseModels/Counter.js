var mongoose = require('mongoose');

var CounterSchema = new mongoose.Schema({
    _id: {type: String,required: true, default:''},
    seq: { type: Number, default: 0 }
});
var model = mongoose.model('Counter', CounterSchema);
module.exports = model;

