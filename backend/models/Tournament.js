import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tournamentType: {
      type: String,
      enum: ["league", "knockout", "mixed"],
      required: true,
    },
    format: {
      type: String,
      enum: ["T20", "ODI", "Test"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    registrationDeadline: {
      type: Date,
    },
    maxTeams: {
      type: Number,
      required: true,
    },
    minTeams: {
      type: Number,
      default: 2,
    },
    entryFee: {
      type: Number,
      default: 0,
    },
    prizePool: {
      type: Number,
      default: 0,
    },
    venue: {
      type: String,
    },
    rules: {
      type: String,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    teams: [
      {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
          required: true,
        },
        registeredDate: {
          type: Date,
          default: Date.now,
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "paid", "failed"],
          default: "pending",
        },
      },
    ],
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
    standings: [
      {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
        points: { type: Number, default: 0 },
        matchesPlayed: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        netRunRate: { type: Number, default: 0 },
      },
    ],
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;
