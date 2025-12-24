"use client";

import { useEffect, useRef, useState } from "react";

export default function Video() {
  const videoRef = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (load) {
      videoRef.current?.play().catch(() => {});
    }
  }, [load]);

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden bg-gray-100">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        loop
        preload="none"
        className="h-[calc(100%-80px)] w-full object-cover"
      >
        {load && <source src="/demo.mp4" type="video/mp4" />}
      </video>
    </div>
  );
}
