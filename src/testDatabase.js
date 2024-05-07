'use strict';
var mongoose = require('mongoose');

const {  DB_USER, DB_PASSWORD } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ccpbrvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
const connection = mongoose.connect(uri);
connection.then((msg)=>{
  console.log("It's connected")
 

});
connection.catch(
function(err)
{
  if(err)
  {
    console.log('not connected');
	console.log(err);
  }
  else
  {
    console.log(' its in the catch but connected to mongo');
  }
});