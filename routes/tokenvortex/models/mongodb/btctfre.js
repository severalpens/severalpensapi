var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BtcTfre = new Schema({
  status: Number,
  logbook: Array,
  contract_id: String,
  token_id: String,
  owner_id: String,
  senderNetwork: String,
  senderAddress: String,
  burnAddress: String,
  recipientNetwork: String,
  recipientAddress: String,
  amount: Number,
  timelock: Number,
  withdrawn: Boolean,
  refunded: Boolean,
  preimage: String,
  hashlock: String,
  hashSecret: String
});
  
  var BtcTfre = mongoose.model("btctfre", BtcTfre,'transfers')
  
  module.exports = BtcTfre;

  