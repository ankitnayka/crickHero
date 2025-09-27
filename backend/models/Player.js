import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["batsman", "bowler", "allrounder", "wicketkeeper"],
      required: true,
    },
    battingStyle: {
      type: String,
      enum: ["right-hand", "left-hand"],
    },
    bowlingStyle: {
      type: String,
    },
    currentTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    stats: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      catches: { type: Number, default: 0 },
      stumpings: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      economy: { type: Number, default: 0 },
      bestBowling: { type: String, default: "" },
      highestScore: { type: Number, default: 0 },
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
