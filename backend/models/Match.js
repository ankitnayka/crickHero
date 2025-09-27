import mongoose from "mongoose";

const inningsSchema = new mongoose.Schema({
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  batsmen: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      runs: { type: Number, default: 0 },
      balls: { type: Number, default: 0 },
      fours: { type: Number, default: 0 },
      sixes: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
      howOut: { type: String },
      bowler: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      fielder: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    },
  ],
  bowlers: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      overs: { type: Number, default: 0 },
      maidens: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      economy: { type: Number, default: 0 },
    },
  ],
  extras: {
    byes: { type: Number, default: 0 },
    legByes: { type: Number, default: 0 },
    wides: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    penalties: { type: Number, default: 0 },
  },
});

const matchSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    team1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    team2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    matchNumber: {
      type: Number,
      required: true,
    },
    round: {
      type: String,
    },
    venue: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "live", "completed", "abandoned"],
      default: "scheduled",
    },
    tossWinner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    tossDecision: {
      type: String,
      enum: ["bat", "bowl"],
    },
    overs: {
      type: Number,
      default: 20,
    },
    result: {
      winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
      margin: { type: String },
      playerOfMatch: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    },
    scorecard: {
      team1Innings: { type: inningsSchema },
      team2Innings: { type: inningsSchema },
    },
    commentary: [
      {
        over: { type: Number },
        ball: { type: Number },
        runs: { type: Number },
        description: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
