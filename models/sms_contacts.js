const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SmsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sms: {
    type: String,
    required: true
  },
  mobile: { type: Number, required: true },
  date: {type: Date, required: true}
});

// Create collection and add schema
const Sms = mongoose.model('SmsContacts', SmsSchema);

module.exports = Sms;
