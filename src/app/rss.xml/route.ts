import { NextRequest } from "next/server";
import { api } from "../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const emails = await fetchQuery(api.email.getDBEmailAdderesses);
  if (!emails) {
    return new Response("No emails found", { status: 404 });
  }

  const baseUrl = new URL(req.url).origin;

  const items = emails
    .map(
      (email) => `    <item>
      <title><![CDATA[${email.title}]]></title>
      <link>${baseUrl}/email/${email.messageId}</link>
      <guid isPermaLink="true">${baseUrl}/email/${email.messageId}</guid>
      <description><![CDATA[${email.previewText}]]></description>
      <pubDate>${new Date(email._creationTime).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>fuck email spam &amp; cold emails</title>
    <link>${baseUrl}</link>
    <description>Cold emails suck, wastes my inbox &amp; time. So, this website displays them.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
