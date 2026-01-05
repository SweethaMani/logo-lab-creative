import { useEffect, useState } from "react";
import { getDownloadCount } from "@/lib/logoStore";

interface LogoCounterProps {
  refreshTrigger?: number;
}

const LogoCounter = ({ refreshTrigger }: LogoCounterProps) => {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const newCount = getDownloadCount();
    if (newCount !== count) {
      setCount(newCount);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);
    }
  }, [refreshTrigger]);

  useEffect(() => {
    setCount(getDownloadCount());
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`text-6xl md:text-8xl font-display font-bold text-foreground transition-transform ${
          animate ? "animate-counter-pop" : ""
        }`}
      >
        {count.toLocaleString()}
      </div>
      <p className="text-muted-foreground text-lg">logos created</p>
    </div>
  );
};

export default LogoCounter;
