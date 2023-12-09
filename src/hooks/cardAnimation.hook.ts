import { RefObject, useEffect, useRef, useState } from "react";

const easeInOut = (k: number) => 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1);

const useCardAnimation = (
  ref: RefObject<HTMLDivElement>,
  hoverRef: RefObject<HTMLDivElement>
) => {
  const TRANSITION_DURATION = 500;

  const TRANSITION_DURATION_INV = 1 / TRANSITION_DURATION;

  const ANIMATION_DURATION = 3000;

  const ANIMATION_DURATION_INV = 1 / ANIMATION_DURATION;

  const [focused, setFocused] = useState<boolean>(false);
  const focusedRef = useRef<boolean>(false);
  const startClock = useRef<number>(0);
  const curFrameAnimation = useRef<number | null>(null);
  const progress = useRef<number>(0);

  const animateRotation = () => {
    startClock.current = performance.now();
    const startProgress = progress.current;
    const frameFunction = (time: number) => {
      progress.current =
        (startProgress + (time - startClock.current) * ANIMATION_DURATION_INV) %
        1;
      if (ref.current) {
        ref.current.style.transform = `rotateY(${progress.current * 360}deg)`;
      }
      if (!focusedRef.current)
        curFrameAnimation.current = requestAnimationFrame(frameFunction);
    };
    curFrameAnimation.current = requestAnimationFrame(frameFunction);
  };

  const animateReturn = () => {
    const startProgress = progress.current;
    const direction: "left" | "right" = startProgress > 0.5 ? "left" : "right";
    const directionFactor = direction === "left" ? 1 : -1;
    startClock.current = performance.now();
    const thisProgress =
      direction === "left" ? 1 - progress.current : progress.current;

    const frameFunction = (time: number) => {
      const timer = easeInOut(
        (time - startClock.current) * TRANSITION_DURATION_INV
      );
      progress.current = startProgress + directionFactor * timer * thisProgress;
      if (ref.current) {
        ref.current.style.transform = `rotateY(${progress.current * 360}deg)`;
      }
      if (
        focusedRef.current &&
        progress.current < 0.99 &&
        progress.current > 0.01
      )
        curFrameAnimation.current = requestAnimationFrame(frameFunction);
      else {
        if (ref.current) ref.current.style.transform = `rotateY(0deg)`;
        cancelAnimationFrame(curFrameAnimation.current as number);
      }
    };
    curFrameAnimation.current = requestAnimationFrame(frameFunction);
  };

  const handleFocus = () => {
    setFocused(true);
    focusedRef.current = true;
  };

  const handleBlur = () => {
    setFocused(false);
    focusedRef.current = false;
  };

  useEffect(() => {
    animateRotation();
    if (hoverRef.current) {
      const hoverDiv = hoverRef.current;
      hoverDiv.addEventListener("mouseover", handleFocus);
      hoverDiv.addEventListener("mouseout", handleBlur);
      return () => {
        hoverDiv.removeEventListener("mouseover", handleFocus);
        hoverDiv.removeEventListener("mouseout", handleBlur);
      };
    }

    return () => cancelAnimationFrame(curFrameAnimation.current as number);
  }, []);

  useEffect(() => {
    cancelAnimationFrame(curFrameAnimation.current as number);
    if (focused) {
      animateReturn();
    } else {
      animateRotation();
    }
  }, [focused]);
};

export default useCardAnimation;
