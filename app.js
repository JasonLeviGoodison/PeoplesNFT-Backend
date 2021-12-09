require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const indexRouter = require('./src/routes/index');

const entryWithRouterInit = require('./src/routes/router');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var schemas = require('./src/schemas/entry')
var EntryTable = require("./src/models/entryTable");

app.use(cors());

var MONGO_URL = process.env.MONGO_URL
MONGO_URL = `${MONGO_URL}`

mongoose.connect(MONGO_URL).then(db => {
  var entrySchema = mongoose.Schema(schemas.Entry);
  var dbEntry = mongoose.model('entry', entrySchema);

  var entryTable = new EntryTable(dbEntry);

  app.use('/', indexRouter);

  app.use('/entries', entryWithRouterInit(entryTable));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({ error: err });
    });
});

module.exports = app;