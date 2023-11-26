import React, { useState } from 'react'
import useCart from '../hooks/useCart'
import CartLine from './CartLine'


const Cart = () => {

  const [confirm,setConfirm] = useState(false);

  const {
    dispatch,
    REDUCER_ACTION,
    totalItems,
    totalPrice,
    cart
  } = useCart()

  const onSubmitOrder = () => {
    dispatch({
      type:REDUCER_ACTION.SUBMIT
    })
    setConfirm(true)
  }

  const content = 
  <>
    { confirm 
    ? <h2>Thank You for your Order</h2> :
      <>
        <h2 className="offscreen">Cart</h2>
        <ul className="cart">
                {cart.map(item => {
                    return (
                        <CartLine
                            key={item.sku}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTION={REDUCER_ACTION}
                        />
                    )
                })}
          </ul>
          <div className="cart__totals">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice}</p>
                <button className="cart__submit" disabled={!totalItems} onClick={onSubmitOrder}>
                    Place Order
                </button>
          </div>
      </>
    }
  </>

  return (
    <main className="main main--cart">
            {content}
    </main>
  )
}

export default Cart
