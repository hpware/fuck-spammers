import { query, mutation, internalAction } from "./_generated/server";
import { v } from "convex/values";

export const getEmails = internalAction({
  args: {},
  handler: async (ctx) => {
    //const getEmails = await
  },
});

export const getDBEmails = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("email").collect();
  },
});

export const getDBEmail = query({
  args: { id: v.id("email") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});
