import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "Get Emails from Fastmail in the folder set in the env.",
  {
    hourUTC: 16,
    minuteUTC: 0,
  },
  internal.email.getEmails,
);

export default crons;
