import { useContext, useEffect, useState } from 'react'

import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
    const [isBtnAnimated, setIsBtnAnimated] = useState(false)
    const cartCtx = useContext(CartContext)
    const { items } = cartCtx;

    const cartItemNumber = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)
    const btnClasses = `${classes.button} ${isBtnAnimated ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsBtnAnimated(true)

        const timer = setTimeout(() => {
            setIsBtnAnimated(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartItemNumber}</span>
        </button>
    )
}

export default HeaderCartButton;