class EntryTable {

  constructor(dbEntry) {
    this.dbEntry = dbEntry;
  }

  async getAll() {
    let allEntries = await this.dbEntry.find()
    console.log("allEntries", allEntries)
    return allEntries;
  }

  async getEntry(tokenId) {
    let entry = await this.dbEntry.findOne({ tokenId });
    return entry;
  }

  async addEntry(name, address, url) {
    if (name.length > 34) {
      throw "Name too long";
    }
    
    var that = this;
    var result = this.dbEntry
      .find({})
      .sort('-tokenId')  // give me the max
      .limit(1)
      .exec(async function (err, entryList) {
        console.log("entrylist", entryList)
        var lastTokenId = 0;
        if (entryList.length != 0) lastTokenId = entryList[0].tokenId;
        var tokenId = lastTokenId + 1;
        console.log("Adding new entry with tokenId", tokenId)
        let entry = await that.dbEntry({
          address,
          image: url,
          name,
          tokenId
        });

        await entry.save()
      });

    console.log("result from create new entry", result)
    return result;
  }
}

module.exports = EntryTable;