import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    interestTag: {
      type: String,
      default: "🔇😶 Introvert Mode: ON",
    },
    location: {
      type: String,
      default: "",
    },
    isOnBoarded: {
      type: Boolean,
      default: false,
    },
    friend: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timeseries: true }
);
//createdAt,updatedAt

//using pre-hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
};

export const User = mongoose.model("User", userSchema);
