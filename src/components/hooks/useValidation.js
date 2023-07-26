import React, { useState } from "react";

const useValidations = (validationFunction) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const hasError = validationFunction(enteredValue);
  const isInValid = hasError && isTouched;

  const changeHandler = (event) => {
    setEnteredValue((prevValue) => (prevValue = event.target.value));
  };

  const touchHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setEnteredValue("");
  };

  return {
    enteredValue,
    changeHandler,
    touchHandler,
    hasError,
    isInValid,
    reset
  };
};

export default useValidations;
