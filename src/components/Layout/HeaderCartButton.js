import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCntx = useContext(CartContext);
  const [isButtonHighlighted, setButtonHighlighter] = useState(false);
  const numberOfCartItems = cartCntx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const { items } = cartCntx;

  useEffect(() => {
    if (items.length == 0) {
      return;
    }
    setButtonHighlighter(true);
    const timer = setTimeout(() => {
      setButtonHighlighter(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  let btnClasses = `${classes.button} ${
    isButtonHighlighted ? classes.bump : ""
  }`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
