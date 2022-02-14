import { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'

const Cart = props => {
    const cartCtx = useContext(CartContext)
    const totalItems = `$ ${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const onAddtoCartHandler = (item) => {
        cartCtx.addItem({ item, amount: 1 })
    }

    const onRemoveFromCartHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={onRemoveFromCartHandler.bind(null, item.id)}
                    onAdd={onAddtoCartHandler.bind(null, item)}
                />
            ))}
        </ul>
    );
    return (
        <Modal onClick={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalItems}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>CLOSE</button>
                {hasItems && <button className={classes.button}>ORDER</button>}
            </div>
        </Modal>
    )
}

export default Cart;