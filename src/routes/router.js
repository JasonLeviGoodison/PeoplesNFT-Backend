const express = require('express');
const router = express.Router();

function init(entryTable) {

  router.get('/getall', async (req, res) => {
    console.log("get all function")
    const all = await entryTable.getAll();
    console.log("sending", all)
    res.send(all);
  });

  router.post('/submit', async (req, res) => {
    const { url, title, address } = req.body;
    console.log("got a new submission", url, title, address);
    // verify the data that was sent
    const added = await entryTable.addEntry(title, address, url);
    res.send(added)
  })
  
  return router;
}

module.exports = init;
