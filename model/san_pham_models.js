var db = require("./db");

const spSchema = new db.mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: String, require: true },
    description: { type: String, require: false },
    image: { type: String, require: false },
    the_loai: { type: db.mongoose.Schema.Types.ObjectId, ref: "theloaiModel" },
  },
  {
    collection: "ASSM",
  }
);
let spModel = db.mongoose.model("spModel", spSchema);

const theloaiSchema = new db.mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    collection: "the_loai",
  }
);
let theloaiModel = db.mongoose.model("theloaiModel", theloaiSchema);
module.exports = { spModel, theloaiModel };
