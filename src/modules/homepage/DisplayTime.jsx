import React, { useState, useEffect } from "react";

const DisplayTime = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-stretch gap-5">
      <div className="flex flex-col items-center gap-2">
        <div className="inline-flex items-center justify-center text-3xl font-semibold text-white rounded w-14 h-14 bg-yellowColor">
          {time.hours}
        </div>
        <span className="text-sm text-gray text-opacity-60">hours</span>
      </div>
      <span className="mt-3 text-2xl">:</span>
      <div className="flex flex-col items-center gap-2">
        <div className="inline-flex items-center justify-center text-3xl font-semibold text-white rounded w-14 h-14 bg-yellowColor">
          {time.minutes}
        </div>
        <span className="text-sm text-gray text-opacity-60">mins</span>
      </div>
      <span className="mt-3 text-2xl">:</span>

      <div className="flex flex-col items-center gap-2">
        <div className="inline-flex items-center justify-center text-3xl font-semibold text-white rounded w-14 h-14 bg-yellowColor">
          {time.seconds}
        </div>
        <span className="text-sm text-gray text-opacity-60">secs</span>
      </div>
    </div>
  );
};

export default DisplayTime;
