const express = require('express');
const router = express.Router();

function init(entryTable) {

  router.get('/getall', async (req, res) => {
    console.log("get all function")
    const all = await entryTable.getAll();
    console.log("sending", all)
    res.send(all);
  });

  router.get('/:id', async (req, res) => {
    console.log("Getting entry");
    const { id } = req.params;
    console.log("Entry to get", id)
    let entry;
    
    console.log("about to get it")
    entry = await entryTable.getEntry(id);
    console.log("got it")

    if (entry == null) {
      return res.sendStatus(404)
    }
    console.log("Sending entry", entry)
    res.send(entry);
  })

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
