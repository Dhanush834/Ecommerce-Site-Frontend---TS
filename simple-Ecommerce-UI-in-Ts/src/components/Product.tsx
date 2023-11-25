import React, { ReactElement } from 'react'
import { ProductsType } from '../context/ProductsProvider'
import { ReducerActionType, ReducerAction } from '../context/CartProvider'

type PropsType = {
  product: ProductsType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTION: ReducerActionType
  isCart: boolean
}

const Product = ({ product, dispatch, REDUCER_ACTION, isCart }: PropsType): ReactElement => {

  const img: string = new URL(`../imgs/${product.sku}.jpg`, import.meta.url).href
  // import.meta.url -> gives the path of current module which is the base url

  //-------------------- Functions dealing with Cart -----------

  const onAddToCart = () => {
    dispatch({
      type: REDUCER_ACTION.ADD,
      payload: { ...product, quantity: 1 }
    })
  }

  const itemInCart = isCart ? ' → Item in Cart: ✅' : null

  return (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  )
}

export default Product
