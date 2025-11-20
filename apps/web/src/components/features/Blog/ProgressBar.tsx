"use client";

import { styled } from "next-yak";
import { useEffect, useState } from "react";

const BarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: transparent;
  z-index: 9999;
`;

const Fill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--color-info), var(--color-success));
  transform-origin: 0%;
  width: 100%;
  /* We update the scale via inline style for performance */
`;

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const newProgress = totalHeight > 0 ? currentScroll / totalHeight : 0;
      setProgress(newProgress);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <BarContainer>
      <Fill style={{ transform: `scaleX(${progress})` }} />
    </BarContainer>
  );
};
