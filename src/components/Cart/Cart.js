import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalItems = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const onAddtoCartHandler = (item) => {
    cartCtx.addItem({ item, amount: 1 });
  };

  const onRemoveFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setShowCheckoutForm(true);
  };

  const submitOrderhandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-fa29b-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={onRemoveFromCartHandler.bind(null, item.id)}
            onAdd={onAddtoCartHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const cartModalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        CLOSE
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          ORDER
        </button>
      )}
    </div>
  );

  const isSubmitContent = <p>Sending data..please wait</p>;

  const didSubmitContent = (
    <React.Fragment>
      <p>Order successfull..</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          CLOSE
        </button>
      </div>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalItems}</span>
      </div>
      {showCheckoutForm && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderhandler} />
      )}
      {!showCheckoutForm && cartModalActions}
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmitContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
