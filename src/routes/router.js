const express = require('express');
const router = express.Router();

function init(entryTable) {

  router.get('/getall', async (req, res) => {
    console.log("get all function")
    const all = await entryTable.getAll();
    console.log("sending", all)
    res.send(all);
  });
  
  return router;
}

module.exports = init;
