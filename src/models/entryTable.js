class EntryTable {

  constructor(dbEntry) {
    this.dbEntry = dbEntry;
  }

  async getAll() {
    let allEntries = await this.dbEntry.find()
    console.log("allEntries", allEntries)
    return allEntries;
  }

  async addEntry(title, address, url) {
    let result = await this.dbEntry({
      address,
      url,
      properties: {
        name: {
            type: "string",
            description: title
        },
        description: {
            "type": "string",
            description: "Entry in the CommunityFT"
        },
        image: {
            type: "string",
            description: url
        }
      }
    });

    await result.save()

    console.log("result from create new entry", result)
    return result;
  }
}

module.exports = EntryTable;