import { useState } from "react";
import { LoadingContext } from "./LoadingContext";
import Loading from "../../pages/layout/Loading";
import PropTypes from "prop-types";

export const LoadingProvider = ({ children }) => {
  let [isLoading, setIsLoading] = useState(false);

  const attIsLoading = (value) => {
    if (typeof value !== "boolean") {
      console.error("Loading state must be a boolean");
      return;
    }
    console.log(`Setting loading state to: ${value}`);

    // If you want to log the current state before changing it, uncomment the next line
    // console.log(`Current loading state: ${isLoading}`);

    // Update the loading state
    setIsLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, attIsLoading }}>
      <>
        {isLoading && <Loading></Loading>}
        {children}
      </>
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
