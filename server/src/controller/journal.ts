import { _500 } from "../helper/error";
import Journal from "../models/journalModel";
import { Request, Response } from "express";
import { Journal as JournalType } from "../types";
import User from "../models/userModel";

const getUserAndCheckCoins = async (
  userId: string,
  requiredCoins: number,
  res: Response
) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404).json({ message: "User Not Found" });
    return null;
  }
  if (user.Coins < requiredCoins) {
    res.status(401).json({ message: "Insufficient Coins" });
    return null;
  }
  return user;
};

// get all jourals for each User
// get - /api/journal/getAll
// auth true - method- user-jwt token
// access private
const getAllbyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.data as { id: string };
    const getJournals = await Journal.find({ byUser: id });
    if (getJournals.length === 0) {
      res.status(404).json({ message: "No Journal Found" });
      return;
    }
    res.status(200).json({ data: getJournals });
  } catch (error: any) {
    _500("Get All Journals Failed", error.message, res);
  }
};

// create new Journal for User
// post - /api/journal/create
// auth true - method- user-jwt token
// access private
const createJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.data as { id: string };
    const {
      title,
      content,
      imgUrl = [],
      tag,
      travelDates,
      date,
    } = req.body as JournalType;

    if (!title || !content || !tag || !travelDates || !date) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await getUserAndCheckCoins(id, 2, res);
    if (!user) return; // Early return if user not found or coins insufficient

    const newJournal = await Journal.create({
      title,
      content,
      imgUrl,
      tag,
      travelDates,
      date,
      byUser: user._id,
    });

    user.Coins -= 2;
    await user.save();
    res.status(201).json({ data: newJournal });
  } catch (error: any) {
    _500("Create Journal Failed", error.message, res);
  }
};

// update Journal for User
// put - /api/journal/update
// auth true - method- user-jwt token
// access private
const updateJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.data as { id: string };
    const {
      _id,
      title,
      content,
      imgUrl = [],
      travelDates,
      date,
    } = req.body as JournalType;

    const user = await getUserAndCheckCoins(id, 1, res);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const journal = await Journal.findById(_id);
    if (!journal) {
      res.status(404).json({ message: "Journal Not Found" });
      return;
    }

    journal.title = title;
    journal.content = content;
    journal.imgUrl.push(...imgUrl);
    journal.travelDates = travelDates;
    journal.date = date;

    user.Coins -= 1;
    await user.save();
    await journal.save();

    res.status(200).json({ data: journal });
  } catch (error: any) {
    _500("Update Journal Failed", error.message, res);
  }
};

const deleteJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.data as { id: string };
    const { _id } = req.body as { _id: string };

    const user = await getUserAndCheckCoins(id, 1, res);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const journal = await Journal.findById(_id);
    if (!journal) {
      res.status(404).json({ message: "Journal Not Found" });
      return;
    }

    await journal.deleteOne();
    user.Coins -= 1;
    user.save();
    res.status(200).json({ message: "Journal Deleted" });
    return;
  } catch (error) {
    _500("Delete Journal Failed", (error as Error).message, res);
  }
};

export { getAllbyUser, createJournal, updateJournal, deleteJournal };
