"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JournalSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    public: {
        type: Boolean,
        default: false,
    },
});
const Journal = mongoose_1.default.model("Journal", JournalSchema);
exports.default = Journal;
