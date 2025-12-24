import { useLayoutEffect } from "react";

interface useScrollTrackingProps {
  callback: () => void;
  wait: number;
}

export function useScrollTracking({ callback, wait }: useScrollTrackingProps) {
  let throttleTimeout: unknown = null;

  const handleCallback = () => {
    callback();
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(handleCallback, wait);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleCallback);
  }, [callback]);
}
