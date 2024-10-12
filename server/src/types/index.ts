import { Address } from "nodemailer/lib/mailer";

export interface sendEmail {
  from: string | Address | undefined;
  to: string | Address | (string | Address)[] | undefined;
  subject: string;
  text: string;
  html: string;
  cc?: string;
}
