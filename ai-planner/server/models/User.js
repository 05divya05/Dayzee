import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  preferences: [String],
  budget: Number,
  travelDates: {
    start: Date,
    end: Date,
  },
  createdTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("hashedPassword")) return next();
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
  next();
});

export default mongoose.model("User", userSchema);

