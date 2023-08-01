/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";

const Thingstodo = () => {
  const containerStyle = {
    fontFamily: "Palatino",
    color: "#333",
  
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "5px",
  };

  const paragraphStyle = {
    fontSize: "18px",
    lineHeight: "1.5",
  };

  return (
    <div style={containerStyle}>
     

      <div style={{ backgroundColor: "#f5f5f5", padding: "10px" }}>
        <h2 style={headingStyle}>Motivational Line</h2>
        <p style={paragraphStyle}>
          "Believe you can and you're halfway there." - Theodore Roosevelt
        </p>
      </div>

      <div style={{ backgroundColor: "#e0f2f1", padding: "10px" }}>
        <h2 style={headingStyle}>Heading 1</h2>
        <p style={paragraphStyle}>This is the content for heading 1.</p>
      </div>

      <div style={{ backgroundColor: "#fce4ec", padding: "10px" }}>
        <h2 style={headingStyle}>Heading 2</h2>
        <p style={paragraphStyle}>This is the content for heading 2.</p>
      </div>
    </div>
  );
};

export default Thingstodo;