import React from "react";
import classes from "./Loader.module.css";

interface LoaderI {
  visible: boolean;
}

const Loader = ({ visible }: LoaderI) => {
  return visible ? (
    <>
      <div className={classes["loader--ripple"]}>
        <div></div>
        <div></div>
      </div>
    </>
  ) : null;
};

export default Loader;
