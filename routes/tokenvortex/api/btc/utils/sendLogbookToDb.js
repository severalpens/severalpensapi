
const url = "mongodb+srv://severalpens:7eifbeGo6xtJwhM5@chat-pchk9.mongodb.net/btcethers?retryWrites=true&w=majority";
const connectionString = "mongodb://localhost:27017/btcethers?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const LogbookModel = require('./models/logbook');

module.exports = async (logbook,i,truncateDb) => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (cn) => {
    if(i === 0 && truncateDb){
      await LogbookModel.deleteMany({}).exec();
    }
    await logbook.save();  
  }).catch((err) => {
    console.log(err);
  }).finally(async () => {
    await mongoose.disconnect();    
  })
}
