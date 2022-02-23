import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pcInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredname = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value;
    const enteredpc = pcInputRef.current.value;
    const enteredcity = cityInputRef.current.value;

    const isNameValid = !isEmpty(enteredname);
    const isStreetValid = !isEmpty(enteredstreet);
    const isCityValid = !isEmpty(enteredcity);
    const isPcValid = isSixChars(enteredpc);

    setFormInputValidity({
      name: isNameValid,
      street: isStreetValid,
      city: isCityValid,
      postalCode: isPcValid,
    });

    const formIsValid =
      isNameValid && isStreetValid && isCityValid && isPcValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name: enteredname,
        street: enteredstreet,
        city: enteredcity,
        postalCode: enteredpc,
      });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;

  const pcControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Invalid Name</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Invalid street</p>}
      </div>

      <div className={pcControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pcInputRef} />
        {!formInputValidity.postalCode && <p>Invalid Postal Code</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Invalid City</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
