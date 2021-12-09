exports.Entry = {
  name: {
    type: String,
    required: true
  },
  image: {
    required: true,
    unique: true,
    type: String
  },
  tokenId: {
    type: Number,
    required: true,
    unique: true
  },

  // Not required as these fields can be updated from the contract
  submittedBy: String,
  votes: {
    type: Number,
    default: 0
  }
};
