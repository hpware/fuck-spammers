import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const cron = cronJobs();

cron.daily(
  "Get Emails from Fastmail in 'Shit stuff' folder",
  {
    hourUTC: 16,
    minuteUTC: 0,
  },
  internal.email.getEmails,
  {},
);

export default cron;
