"use client";

import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\";
const FONT_SIZE = 14;
const FADE_ALPHA = 0.05;
const DROP_SPEED_MIN = 0.4;
const DROP_SPEED_MAX = 1.2;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const columns = Math.floor(canvas.width / FONT_SIZE);

    const drops: number[] = Array.from({ length: columns }, () =>
      Math.random() * -100
    );
    const speeds: number[] = Array.from({ length: columns }, () =>
      DROP_SPEED_MIN + Math.random() * (DROP_SPEED_MAX - DROP_SPEED_MIN)
    );

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = `rgba(10, 10, 15, ${FADE_ALPHA})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Head character — bright white-green
        ctx.font = `${FONT_SIZE}px monospace`;
        ctx.fillStyle = "rgba(180, 255, 180, 0.9)";
        ctx.fillText(char, x, y);

        // Trail character one step behind — full green
        if (drops[i] > 1) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = "rgba(0, 255, 65, 0.6)";
          ctx.fillText(trailChar, x, y - FONT_SIZE);
        }

        drops[i] += speeds[i];

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] =
            DROP_SPEED_MIN + Math.random() * (DROP_SPEED_MAX - DROP_SPEED_MIN);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20"
      aria-hidden="true"
    />
  );
}
