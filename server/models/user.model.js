const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,//optimization (api fast)
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
  } catch (err) {
    return;
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
