import React, { useState } from "react";
import styles from "./error404.module.scss";

const Error404 = () => {
  return (
    <div className={styles.error}>
      <h5>Sorry, we could not find the page you were looking for :( </h5>
    </div>
  );
};

export default Error404;
