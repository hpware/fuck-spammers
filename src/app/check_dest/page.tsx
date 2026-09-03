"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// Parse and validate the redirect target. Rejects non-http(s) schemes
// (e.g. javascript:) and URLs with embedded credentials such as
// https://trusted.com@evil.com/.
function parseDestination(value: string): URL | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    if (url.username || url.password) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function CheckDestContent() {
  const [allowLinkToBeClicked, setAllowLinkToBeClicked] = useState(false);
  const [timer, setTimer] = useState(5);
  const params = useSearchParams();

  const goto = params.get("goto");
  const dest = goto ? parseDestination(goto) : null;

  // waiter
  useEffect(() => {
    setTimeout(() => {
      setAllowLinkToBeClicked(true);
    }, 5000);
    const interval = setInterval(() => {
      setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!goto || !dest) {
    return (
      <div className="justify-center flex flex-col items-center">
        <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
          <span className="pt-2 text-stone-400">
            <a href="/">Go back</a>
          </span>
          <span className="text-xl pb-2">Check the destination.</span>
        </div>
        <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
          <span className="text-xl pb-2 text-red-400">
            {goto ? "Invalid destination" : "Destination not found"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="pt-2 text-stone-400">
          <a href="/">Go back</a>
        </span>
        <span className="text-xl pb-2">Check the destination.</span>
      </div>
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="text-lg">You are trying to go to</span>
        <span className="text-md pb-2 break-all">{dest.href}</span>
      </div>
      {allowLinkToBeClicked ? (
        <a
          href={dest.href}
          rel="noopener noreferrer"
          className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700"
        >
          Go to link {"=>"}
        </a>
      ) : (
        <span className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
          Wait {timer} seconds until the link is unblocked.
        </span>
      )}
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
