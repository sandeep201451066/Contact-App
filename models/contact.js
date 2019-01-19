const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
    mobile: { type: Number, required: true },
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    date: {type: Date, required: true},
    sms: {type: Array, required: false}
});

// Create collection and add schema
const Chat = mongoose.model('Contacts', ChatSchema);

module.exports = Chat;
