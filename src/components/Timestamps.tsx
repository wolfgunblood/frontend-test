import React from "react";

interface Timestamp {
  time: string;
  left: string;
}

interface TimestampProps {
  timestamps: Timestamp[];
}

const Timestamps = ({ timestamps }: TimestampProps) => {
  return (
    <div
      className="flex w-full justify-between text-xs text-zinc-500"
      style={{ position: "relative", bottom: "-50px" }}
    >
      {timestamps.map((timestamp, index) => (
        <span
          key={index}
          style={{
            left: timestamp.left,
          }}
          className={`w-full border-l-2 border-zinc-300 text-center ${index === timestamps.length - 1 ? "border-r-2" : ""}`}
        >
          <span className="font-manrope text-sm font-semibold text-muted-foreground">
            {timestamp.time}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Timestamps;
