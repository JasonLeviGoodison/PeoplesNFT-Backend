class EntryTable {

  constructor(dbEntry) {
    this.dbEntry = dbEntry;
  }

  async getAll() {
    let allEntries = await this.dbEntry.find()
    console.log("allEntries", allEntries)
    return allEntries;
  }
}

module.exports = EntryTable;