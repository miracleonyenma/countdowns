"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function Countdown() {
  const [targetDate] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [error] = useState<string>("");

  const router = useRouter();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateString = formData.get("targetDate") as string;
    const encodedDate = encodeURIComponent(dateString);
    router.push(`/${encodedDate}`);

    // const newTargetDate = new Date(dateString)

    // if (isNaN(newTargetDate.getTime())) {
    //   setError("Please enter a valid date")
    // } else if (newTargetDate <= new Date()) {
    //   setError("Please enter a future date")
    // } else {
    //   setTargetDate(newTargetDate)
    //   setError("")
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Countdown Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="datetime-local"
                name="targetDate"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Start Countdown
            </Button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {timeRemaining && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Time Remaining:</h2>
              <p className="text-3xl font-bold">{timeRemaining}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
