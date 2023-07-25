import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const cartCntx = useContext(CartContext);
  const totalAmount = `$${cartCntx.totalAmount.toFixed(2)}`;
  const hasItems = cartCntx.items.length > 0;
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCntx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCntx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://react-practice-cb3c2-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCntx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCntx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCntx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModelContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut ? (
        <CheckOut onSubmit={submitOrderHandler} onCancel={props.onClose} />
      ) : (
        ""
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Your order is submitting....</p>;
  const didSubmitModelContent = <p>Successfully sent the order</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModelContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {didSubmit && !isSubmitting && didSubmitModelContent}
    </Modal>
  );
};

export default Cart;
