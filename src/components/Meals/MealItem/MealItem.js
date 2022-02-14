import { useContext } from 'react';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';


const MealItem = props => {
    const cartCtx = useContext(CartContext)
    const price = `$ ${props.price.toFixed(2)}`

    const addtoCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <div>{props.name}</div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>

            <MealItemForm id={props.id} onAddToCart={addtoCartHandler} />
        </li>
    )
}

export default MealItem;

