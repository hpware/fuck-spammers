"use client";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function DomainSkeleton() {
  return (
    <Card className="w-full max-w-[480px] m-1">
      <CardContent className="pt-4 flex justify-between items-center">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </CardContent>
    </Card>
  );
}

export default function Client() {
  const data = useQuery(api.email.getMostUsedDomains);
  const isLoading = data === undefined;

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <Card className="w-full max-w-[480px] m-1">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Most Used Domains</CardTitle>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Go back
          </Link>
        </CardHeader>
      </Card>

      {isLoading ? (
        <>
          <DomainSkeleton />
          <DomainSkeleton />
          <DomainSkeleton />
        </>
      ) : data?.length === 0 ? (
        <Card className="w-full max-w-[480px] m-1">
          <CardContent className="pt-4 text-center text-muted-foreground text-sm">
            No domains found
          </CardContent>
        </Card>
      ) : (
        data?.map((item) => (
          <Card key={item.domain} className="w-full max-w-[480px] m-1">
            <CardContent className="pt-4 flex justify-between items-center">
              <span className="text-sm font-mono">{item.domain}</span>
              <Badge variant="secondary">{item.count}</Badge>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
