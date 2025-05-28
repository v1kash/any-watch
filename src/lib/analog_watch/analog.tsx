import { useState, useEffect } from "react";
import * as styles from "./analog.module.css";

const CENTER_X = 960; // SVG width/2 (assuming 1920px width)
const CENTER_Y = 540; // SVG height/2 (assuming 1080px height)
const CLOCK_RADIUS = 300;

export const AnalogWatch: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate angles
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondAngle = (seconds / 60) * 360 - 90;  
  const minuteAngle = ((minutes + seconds / 60) / 60) * 360 - 90;
  const hourAngle = ((hours % 12 + minutes / 60) / 12) * 360 - 90;

  // Helper to get hand endpoint
  const getHandCoords = (length: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER_X + length * Math.cos(rad),
      y: CENTER_Y + length * Math.sin(rad),
    };
  };

  // Markings
  const markings = [];
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * 2 * Math.PI;
    const isHour = i % 5 === 0;
    const markLength = isHour ? 30 : 15;
    const markWidth = isHour ? 6 : 2;
    const r1 = CLOCK_RADIUS - markLength;
    const r2 = CLOCK_RADIUS;
    const x1 = CENTER_X + r1 * Math.cos(angle - Math.PI / 2);
    const y1 = CENTER_Y + r1 * Math.sin(angle - Math.PI / 2);
    markings.push(
      <rect
        key={i}
        x={x1 - markWidth / 2}
        y={y1 - markLength / 2}
        width={markWidth}
        height={markLength}
        fill="#EDC7AF"
        rx={markWidth / 2}
        transform={`rotate(${(i * 6)}, ${x1}, ${y1})`}
        opacity={isHour ? 1 : 0.5}
      />
    );
  }

  // Hand endpoints
  const hourHand = getHandCoords(CLOCK_RADIUS * 0.5, hourAngle);
  const minuteHand = getHandCoords(CLOCK_RADIUS * 0.75, minuteAngle);
  const secondHand = getHandCoords(CLOCK_RADIUS * 0.85, secondAngle);

  return (
    <div className={styles.analog}>
      <svg
        width="100vw"
        height="100vh"
        viewBox="0 0 1920 1080"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="innerCircle" x1="0" x2="0" y1="0" y2="1">
            <stop offset="25%" stopColor="#446A8D" />
            <stop offset="100%" stopColor="#1B354E" />
          </linearGradient>
          <linearGradient id="outerCircle" x1="0" x2="0" y1="0" y2="1">
            <stop offset="25%" stopColor="#446A8D" />
            <stop offset="100%" stopColor="#1B354E" />
          </linearGradient>
        </defs>

        {/* Outer and inner circles */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="400"
          stroke="#27343E"
          strokeWidth="4"
          fill="url(#outerCircle)"
        />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="404"
          stroke="#908480"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="406"
          stroke="#131313"
          strokeWidth="4"
          fill="none"
        />
        {/* Inner dial area */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="310"
          stroke="#17375A"
          strokeWidth="2"
          fill="url(#innerCircle)"
        />
        {/* Center circles */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="10"
          stroke="#764026"
          strokeWidth="2"
          fill="#EDC7AF"
        />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="5"
          stroke="#392711"
          strokeWidth="2"
          fill="#EDC7AF"
        />

        {/* Markings */}
        <g>{markings}</g>

        {/* Hour hand */}
        <line
          x1={CENTER_X}
          y1={CENTER_Y}
          x2={hourHand.x}
          y2={hourHand.y}
          stroke="#EDC7AF"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Minute hand */}
        <line
          x1={CENTER_X}
          y1={CENTER_Y}
          x2={minuteHand.x}
          y2={minuteHand.y}
          stroke="#EDC7AF"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Second hand */}
        <line
          x1={CENTER_X}
          y1={CENTER_Y}
          x2={secondHand.x}
          y2={secondHand.y}
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
