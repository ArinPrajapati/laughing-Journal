import { Address } from "nodemailer/lib/mailer";

export interface sendEmail {
  from: string | Address | undefined;
  to: string | Address | (string | Address)[] | undefined;
  subject: string;
  text: string;
  html: string;
  cc?: string;
}

export interface User {
  name: string;
  email: string;
  profileImg: string;
  isAdmin: boolean;
  _id: string;
}

export interface Journal {
  title: string;
  content: string;
  imgUrl?: string[];
  travelDates?: {
    tripStart: Date;
    tripEnd: Date;
  };
  date: Date;
  tag: [
    "Adventure",
    "Cultural",
    "Food",
    "Family",
    "Solo",
    "Budget",
    "Luxury",
    "Nature",
    "Digital",
    "Themed"
  ];
  byUser: string;
  _id: string;
  public:boolean
}
