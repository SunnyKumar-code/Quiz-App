import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import styles from "./Loading.module.css";

const Loader = () => {
  return (
    <div className={styles.loading}>
      <PacmanLoader color="#36d7b7" size={50} />
      <h2>Loading...</h2>
    </div>
  );
};

export default Loader;
