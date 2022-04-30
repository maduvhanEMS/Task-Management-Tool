import React from "react";

const ProgressBar = ({ bgcolor, progress, height, font, margin }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "lightgrey",
    borderRadius: "5px",
    margin: " 0px",
    justifyContent: "center",
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const progresstext = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: `${font}`,
  };

  const stylep = {
    marginTop: `${margin}`,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>
          <p style={stylep}>{`${progress}%`}</p>
        </span>{" "}
      </div>
    </div>
  );
};

export default ProgressBar;
