import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  email: defineTable({
    messageId: v.string(),
    title: v.string(),
    emailText: v.string(),
    previewText: v.string(),
  }).index("messageId", ["messageId"]),
  /**  syncCheckpoint: defineTable({
  updated_at: v.string(),
}), */
});
