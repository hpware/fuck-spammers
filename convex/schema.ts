import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  email: defineTable({
    title: v.string(),
    emailText: v.string(),
  }),
});
