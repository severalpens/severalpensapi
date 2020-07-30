var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TfrbdsSchema = new Schema({


  // Props populated by the constructor
  user_id: String,
  creationUtc: Number,
  
  // Mongodb IDs
  contract_id: String,
  token_id: String,
  msgSender_id: String,
  sender_id: String,
  recipient_id: String,
  
  //log fields
  desc: String,
  stage: Number,
  status: String,

  
  //native transaction arg options
  senderNetwork: String,
  recipientNetwork: String,
  amount: Number,
  hashSecret: String,
  hashlock: String,
  timelock: Number,
  
  //derived  transaction arg options
  msgSenderAddress: String, 
  msgSenderPrivateKey: String,
  senderAddress: String,
  senderPrivateKey: String,
  recipientAddress: String,
  recipientPrivateKey: String,
  senderContractAddress: String,
  recipientContractAddress: String,
  senderTokenAddress: String,
  recipientTokenAddress: String,
  
  // generated values
  burnAddress: String,
  returnVal: String,
  withdrawn: Boolean,
  refunded: Boolean,
  preimage: String,
  });

  
  var TfrbdsModel = mongoose.model("tfrbds", TfrbdsSchema, "transfers");
  
  module.exports = TfrbdsModel;