import { useEffect, useState } from "react";

const Loader = () => {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 1500);
    const hideTimer = setTimeout(() => setShow(false), 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;
  return (
    <div
      className="loader-wrapper"
      style={{
        opacity: fade ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <div className="theme-loader">
        <div className="loader-p" />
      </div>
    </div>
  );
};

export default Loader;
