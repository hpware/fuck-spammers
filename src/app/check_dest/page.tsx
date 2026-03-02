"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function CheckDestContent() {
  const [allowLinkToBeClicked, setAllowLinkToBeClicked] = useState(false);
  const [timer, setTimer] = useState(5);
  const params = useSearchParams();

  const goto = params.get("goto");

  if (!goto) {
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
            Destination not found
          </span>
        </div>
      </div>
    );
  }
  if (!goto.startsWith("http://") && !goto.startsWith("https://")) {
    return (
      <div className="justify-center flex flex-col items-center">
        <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
          <span className="pt-2 text-stone-400">
            <a href="/">Go back</a>
          </span>
          <span className="text-xl pb-2">Check the destination.</span>
        </div>
        <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
          <span className="text-xl pb-2 text-red-400">Invalid destination</span>
        </div>
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
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="pt-2 text-stone-400">
          <a href="/">Go back</a>
        </span>
        <span className="text-xl pb-2">Check the destination.</span>
      </div>
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="text-lg">You are trying to go to</span>
        <span className="text-md pb-2">{goto}</span>
      </div>
      {allowLinkToBeClicked ? (
        <a
          href={goto}
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
