import React, { useRef, useState } from 'react'
import Input from "../../UI/Input";
import classes from './MealItemForm.module.css'

const MealItemForm = props => {
    const [isAmountvalid, setIsAmountvalid] = useState(true)
    const amountInputRef = useRef();

    const submitFormHandler = event => {
        event.preventDefault();
        const amount = amountInputRef.current.value;
        const enteredAmount = +amount

        if (amount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setIsAmountvalid(false)
            return;
        }
        //setIsAmountvalid(true)

        props.onAddToCart(enteredAmount)
    }
    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>+ ADD</button>
            {!isAmountvalid && <p>Invalid amount</p>}
        </form>
    )
}

export default MealItemForm;