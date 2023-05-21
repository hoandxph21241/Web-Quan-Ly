var db = require("./db");

const spSchema = new db.mongoose.Schema(
  {
    username: { type: String, require: true },
    fullname: { type: String, require: false },
    passwd: { type: Number, require: true },
    email: { type: String, require: false },
    action: { type: db.mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  {
    collection: "User",
  }
);
let UsModel = db.mongoose.model("UsModel", spSchema);

const UserSchema = new db.mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    collection: "action",
  }
);
let UserModel = db.mongoose.model("UserModel", UserSchema);
module.exports = { UsModel, UserModel };
