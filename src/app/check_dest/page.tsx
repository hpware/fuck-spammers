"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CheckDestContent() {
  const [allowLinkToBeClicked, setAllowLinkToBeClicked] = useState(false);
  const [timer, setTimer] = useState(5);
  const params = useSearchParams();

  const goto = params.get("goto");

  if (!goto) {
    return (
      <div className="flex flex-col items-center py-4 px-2 gap-2">
        <Card className="w-full max-w-[480px]">
          <CardHeader className="text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Go back
            </Link>
            <CardTitle>Check the destination</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-destructive text-sm pb-4">
            Destination not found
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!goto.startsWith("http://") && !goto.startsWith("https://")) {
    return (
      <div className="flex flex-col items-center py-4 px-2 gap-2">
        <Card className="w-full max-w-[480px]">
          <CardHeader className="text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Go back
            </Link>
            <CardTitle>Check the destination</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-destructive text-sm pb-4">
            Invalid destination
          </CardContent>
        </Card>
      </div>
    );
  }

  // waiter
  useEffect(() => {
    setTimeout(() => {
      setAllowLinkToBeClicked(true);
    }, 5000);
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center py-4 px-2 gap-2">
      <Card className="w-full max-w-[480px]">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Go back
          </Link>
          <CardTitle>Check the destination</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-3 pb-4">
          <p className="text-sm text-muted-foreground">
            You are trying to go to:
          </p>
          <p className="text-sm font-mono break-all bg-muted rounded-md p-2">
            {goto}
          </p>
          {allowLinkToBeClicked ? (
            <Button asChild className="w-full">
              <a href={goto}>Go to link →</a>
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full">
              Wait {timer}s to continue…
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <CheckDestContent />
    </Suspense>
  );
}
