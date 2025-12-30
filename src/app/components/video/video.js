"use client";

import { useEffect, useRef, useState } from "react";

export default function Video() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const target = wrapRef.current;
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => v.play().catch(() => {});

    if (v.readyState >= 2) {
      tryPlay();
      return;
    }

    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [shouldLoad]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto max-w-5xl overflow-hidden bg-gray-100"
    >
      {!shouldLoad ? (
        <div className="w-full aspect-video" />
      ) : (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          autoPlay
          className="w-full aspect-video object-cover"
        >
          <source src="/demo.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
