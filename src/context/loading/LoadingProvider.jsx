import { useState } from "react";
import { LoadingContext } from "./LoadingContext";
import PropTypes from "prop-types";

export const LoadingProvider = ({ children }) => {
  let [isLoading, setIsLoading] = useState(false);

  const attIsLoading = (value) => {
    if (typeof value !== "boolean") {
      console.error("Loading state must be a boolean");
      return;
    }
    console.log("page is loading: " + value);
    setIsLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, attIsLoading }}>
      <>
        {children}
      </>
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
