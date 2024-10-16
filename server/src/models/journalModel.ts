import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  imgUrl: [
    {
      type: String,
    },
  ],
  travelDates: {
    tripStart: {
      type: Date,
    },
    tripEnd: {
      type: Date,
    },
  },
  date: {
    type: Date,
    require: true,
  },
  byUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  tag: {
    enum: [
      "Adventure",
      "Cultural",
      "Food",
      "Family",
      "Solo",
      "Budget",
      "Luxury",
      "Nature",
      "Digital",
      "Themed",
    ],
    require: true,
  },
  public: {
    type: Boolean,
    default: false,
  },
});

const Journal = mongoose.model("Journal", JournalSchema);

export default Journal;
