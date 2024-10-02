"use client";

import { useEffect, useState } from "react";

const TimePage = ({ time, text }: { time: string; text?: string }) => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!targetDate) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining("Countdown finished!");
        clearInterval(intervalId);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  useEffect(() => {
    console.log({ error });
  }, [error]);

  useEffect(() => {
    console.log({ time });
    const decodedTime = decodeURIComponent(time);

    const newTargetDate = new Date(decodedTime);

    if (isNaN(newTargetDate.getTime())) {
      setError("Please enter a valid date");
    } else if (newTargetDate <= new Date()) {
      setError("Please enter a future date");
    } else {
      setTargetDate(newTargetDate);
      setError("");
    }
  }, [time]);

  return (
    <section className="site-section py-32">
      <div className="wrapper min-h-[calc(100vh-16rem)] flex flex-col justify-center items-center">
        {timeRemaining && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">
              {text ? text : "Launching in:"}
            </h2>
            <p className="text-5xl font-bold xl:text-8xl">{timeRemaining}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TimePage;
