import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "Get Emails from Fastmail in 'Shit stuff' folder",
  {
    hourUTC: 16,
    minuteUTC: 00,
  },
  internal.email.getEmails,
);

export default crons;
