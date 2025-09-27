import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    players: [
      {
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
          required: true,
        },
        role: {
          type: String,
          enum: ["batsman", "bowler", "allrounder", "wicketkeeper"],
          required: true,
        },
        joinedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tournaments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
      },
    ],
    stats: {
      matchesPlayed: { type: Number, default: 0 },
      matchesWon: { type: Number, default: 0 },
      matchesLost: { type: Number, default: 0 },
      totalRuns: { type: Number, default: 0 },
      totalWickets: { type: Number, default: 0 },
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
