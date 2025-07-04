import React, { useState } from "react";
import { ContactUs } from "../components/ContactUs.jsx";

const DevHelpDesk = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapse = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 space-y-5">
      
      {/* Developer Info */}
      <div className={`collapse collapse-arrow bg-base-200 rounded-lg transition-all duration-300 ease-in-out ${activeIndex === 0 ? "ring-1 ring-primary" : ""}`}>
        <input
          type="checkbox"
          checked={activeIndex === 0}
          onChange={() => toggleCollapse(0)}
        />
        <div className="collapse-title text-base font-semibold py-3 px-4">
          Meet the Developer
        </div>
        <div className="collapse-content px-4 pb-3 text-sm leading-relaxed text-justify">
          <p className="text-[15px] opacity-80">
            Hi, I'm <span className="font-semibold text-primary">Amit Mondal</span>, a final-year B.Tech Computer Science & Engineering student (graduating in June 2026).
            I'm the developer behind <span className="font-semibold text-primary">DevComm</span> — a real-time communication platform built using the{" "}
            <span className="font-semibold">MERN</span> stack (MongoDB, Express, React, Node.js).<br />
            My aim with this project is to make real-time communication intuitive, efficient, and developer-friendly.
          </p>
        </div>
      </div>

      {/* Feedback */}
      <div className={`collapse collapse-arrow bg-base-200 rounded-lg transition-all duration-300 ease-in-out ${activeIndex === 1 ? "ring-1 ring-primary" : ""}`}>
        <input
          type="checkbox"
          checked={activeIndex === 1}
          onChange={() => toggleCollapse(1)}
        />
        <div className="collapse-title text-base font-semibold py-3 px-4">
          Share Your Feedback
        </div>
        <div className="collapse-content px-4 pb-3 text-sm">
          <div className="max-h-[450px] overflow-y-auto pr-1">
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevHelpDesk;
