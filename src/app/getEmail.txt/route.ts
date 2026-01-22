import { NextRequest } from "next/server";
import { api } from "../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const download = searchParams.get("dl") === "1" ? true : false;
  const emails = await fetchQuery(api.email.getDBEmailAdderesses);
  return new Response(
    emails.map((email: string) => `${email.sender}\n`),
    {
      headers: {
        "Content-Type": "text/plain",
        ...(download && {
          "Content-Disposition": "attachment; filename=email.txt",
        }),
      },
    },
  );
};
