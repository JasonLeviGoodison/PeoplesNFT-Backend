require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const entryWithRouterInit = require('./routes/router');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var schemas = require('./schemas/entry')
var EntryTable = require("./models/entryTable");

app.use(cors());

var MONGO_URL = process.env.MONGO_URL
MONGO_URL = `${MONGO_URL}`

mongoose.connect(MONGO_URL).then(db => {
  var entrySchema = mongoose.Schema(schemas.Entry);
  var dbEntry = mongoose.model('entry', entrySchema);

  var entryTable = new EntryTable(dbEntry);

  app.use('/entries', entryWithRouterInit(entryTable));

  var port = process.env.PORT
  app.listen(port, () => {console.log('Server Running')});
});
