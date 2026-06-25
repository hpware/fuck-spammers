"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function SenderName({ sender }: { sender: string }) {
  const name = sender.split("@")[0] ?? sender;
  return (
    <span className="text-xs text-muted-foreground truncate flex items-center gap-1">
      <span className="inline-flex items-center justify-center w-4 h-4 border border-border text-[8px] shrink-0">
        @
      </span>
      {name}
    </span>
  );
}

export function Sidebar({
  showBack = false,
  showViewMore = false,
}: {
  showBack?: boolean;
  showViewMore?: boolean;
}) {
  const router = useRouter();
  const { results } = usePaginatedQuery(
    api.email.getDBEmailsPaginated,
    showViewMore ? {} : "skip",
    { initialNumItems: 10 },
  );

  return (
    <aside className="w-56 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-border bg-card flex flex-col">
      <div className="flex flex-col p-3 gap-1">
        {showBack && (
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-1"
            onMouseEnter={() => router.prefetch("/")}
          >
            &lt;= Back
          </Link>
        )}
        <Link
          href="/"
          className="text-sm text-foreground hover:text-muted-foreground transition-colors"
          onMouseEnter={() => router.prefetch("/")}
        >
          Home
        </Link>
        <Link
          href="/rss.xml"
          className="text-sm text-foreground hover:text-muted-foreground transition-colors"
        >
          RSS Feed
        </Link>
        <Link
          href="/about"
          className="text-sm text-foreground hover:text-muted-foreground transition-colors"
          onMouseEnter={() => router.prefetch("/about")}
        >
          About
        </Link>
      </div>

      {showViewMore && (
        <div className="border-t border-border px-3 py-2 flex-1 overflow-y-auto">
          <span className="text-xs text-muted-foreground">View more:</span>
          <div className="flex flex-col gap-1 mt-1">
            {results?.map((email: any) => (
              <Link
                key={email._id}
                href={`/email/${email.messageId}`}
                prefetch={false}
                onMouseEnter={() =>
                  router.prefetch(`/email/${email.messageId}`)
                }
              >
                <Card className="hover:border-ring transition-colors duration-150">
                  <CardHeader className="p-2 space-y-0.5">
                    <CardTitle className="text-xs font-medium truncate">
                      {email.title}
                    </CardTitle>
                    <SenderName sender={email.sender} />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export { SenderName };
