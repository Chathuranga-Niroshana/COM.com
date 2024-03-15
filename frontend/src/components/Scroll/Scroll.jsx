import React, { useEffect, useState } from "react";
import "./Scroll.css";

const Scroll = () => {
  const [scrolledWidth, setScrolledWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      setScrolledWidth(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scrollContent">
      <div
        className="progress"
        style={{
          width: `${scrolledWidth}%`,
          backgroundColor: `var(--progress-color, rgba(33, 212, 253, ${scrolledWidth / 100}))`
        }}
      ></div>
    </div>
  );
};

export default Scroll;
