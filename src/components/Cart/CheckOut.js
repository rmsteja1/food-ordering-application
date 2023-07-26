import classes from "./CheckOut.module.css";
import useValidations from "../hooks/useValidation";

const Checkout = (props) => {
  const emptyValueHandler = (value) => {
    return value.trim().length == 0;
  };

  const {
    enteredValue: enteredName,
    changeHandler: nameChangeHandler,
    touchHandler: nameTouchHandler,
    hasError: nameHasError,
    isInValid: nameIsInValid,
    reset: nameResetHandler,
  } = useValidations(emptyValueHandler);

  const {
    enteredValue: enteredStreet,
    changeHandler: streetChangeHandler,
    touchHandler: streetTouchHandler,
    hasError: streetHasError,
    isInValid: streetIsInValid,
    reset: streetResetHandler,
  } = useValidations(emptyValueHandler);

  const {
    enteredValue: enteredZip,
    changeHandler: zipChangeHandler,
    touchHandler: zipTouchHandler,
    hasError: zipHasError,
    isInValid: ZipIsInValid,
    reset: ZipResetHandler,
  } = useValidations(emptyValueHandler);

  const {
    enteredValue: enteredCity,
    changeHandler: cityChangeHandler,
    touchHandler: cityTouchHandler,
    hasError: cityHasError,
    isInValid: cityIsInValid,
    reset: cityResetHandler,
  } = useValidations(emptyValueHandler);

  const formIsInValid =
    nameHasError || cityHasError || zipHasError || streetHasError;
  console.log(formIsInValid);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsInValid) {
      props.onSubmit({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        zip: enteredZip,
      });
    }
    nameResetHandler();
    streetResetHandler();
    cityResetHandler();
    ZipResetHandler();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${nameIsInValid ? classes.invalid : ""}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
          value={enteredName}
        />
        {nameIsInValid ? <p>Name should not be empty</p> : ""}
      </div>
      <div
        className={`${classes.control} ${
          streetIsInValid ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetTouchHandler}
          value={enteredStreet}
        />
        {streetIsInValid ? <p>Street should not be empty</p> : ""}
      </div>
      <div
        className={`${classes.control} ${ZipIsInValid ? classes.invalid : ""}`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={zipChangeHandler}
          onBlur={zipTouchHandler}
          value={enteredZip}
        />
        {ZipIsInValid ? <p>Postal Code should not be empty</p> : ""}
      </div>
      <div
        className={`${classes.control} ${ZipIsInValid ? classes.invalid : ""}`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityTouchHandler}
          value={enteredCity}
        />
      </div>
      {cityIsInValid ? <p>City should not be empty</p> : ""}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={formIsInValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
