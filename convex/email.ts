import {
  query,
  mutation,
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { v } from "convex/values";
import * as FM from "@/components/fastmail";
import * as parser from "@/components/parser";
import { internal } from "./_generated/api";

export const getEmails = internalAction({
  args: {},
  handler: async (ctx) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    const getUserInfo = await FM.getSession(process.env.FASTMAIL_TOKEN!);
    const accountId = getUserInfo.primaryAccounts["urn:ietf:params:jmap:mail"];
    const getShitStuffEmailInboxId = await FM.masterApi(
      process.env.FASTMAIL_TOKEN!,
      JSON.stringify({
        using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
        methodCalls: [
          [
            "Mailbox/query",
            {
              accountId,
              filter: { name: "shitstuff" },
              limit: 1,
            },
            "getShitStuffMailBoxInfo",
          ],
        ],
      }),
    );
    const getEmails = await FM.masterApi(
      process.env.FASTMAIL_TOKEN!,
      JSON.stringify({
        using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
        methodCalls: [
          [
            "Email/query",
            {
              accountId,
              filter: {
                inMailbox:
                  getShitStuffEmailInboxId.methodResponses[0][1].ids[0],
              },
              sort: [{ property: "receivedAt", isAscending: false }],
              position: 0,
              calculateTotal: true,
            },
            "queryEmails",
          ],
          [
            "Email/get",
            {
              accountId,
              "#ids": {
                name: "Email/query",
                path: "/ids",
                resultOf: "queryEmails",
              },
              fetchHTMLBodyValues: true,
              properties: [
                "messageId",
                "htmlBody",
                "subject",
                "bodyValues",
                "threadId",
                "preview",
                "from",
              ],
            },
            "getEmailInfo",
          ],
        ],
      }),
    );
    const emails = getEmails.methodResponses[1][1].list.map((i: any) => ({
      messageId: i.threadId,
      subject: i.subject,
      emailText: parser
        .htmlToPlainText(
          String(i.bodyValues?.[1]?.value || i.bodyValues?.[2]?.value),
        )
        .replace(emailRegex, "[REDACTED]"),
      previewText: i.preview.replace(emailRegex, "[REDACTED]"),
      sender: i.from[0].email,
    }));

    await ctx.runMutation(internal.email.upsertEmails, { emails });
  },
});

export const upsertEmails = internalMutation({
  args: {
    emails: v.array(
      v.object({
        messageId: v.string(),
        subject: v.string(),
        emailText: v.string(),
        previewText: v.string(),
        sender: v.string(),
      }),
    ),
  },
  handler: async (ctx, { emails }) => {
    for (const i of emails) {
      const existing = await ctx.db
        .query("email")
        .withIndex("messageId", (q) => q.eq("messageId", i.messageId))
        .unique();

      if (!existing) {
        await ctx.db.insert("email", {
          messageId: i.messageId,
          title: i.subject,
          emailText: i.emailText,
          previewText: i.previewText,
          sender: i.sender,
        });
      }
    }
  },
});

export const getDBEmails = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("email").collect();
  },
});

export const getDBEmail = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("email")
      .filter((q) => q.eq(q.field("messageId"), args.id))
      .collect();
  },
});

export const getDBEmailAdderesses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("email").collect();
  },
});
