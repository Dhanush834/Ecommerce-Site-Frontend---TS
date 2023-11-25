import React, { ReactElement } from 'react'
import useProducts from '../hooks/useProducts'
import useCart from '../hooks/useCart'
import { ProductsContextType } from '../context/ProductsProvider'
import Cart from './Cart'
import Product from './Product'



const ProductList = () => {

  const { dispatch, REDUCER_ACTION, cart } = useCart()
  const { products } = useProducts()

  let pageContent: ReactElement | ReactElement[] = <p>Loading ....</p>

  if (products?.length) {
    pageContent = products.map(product => {
      const isCart: boolean = cart.some(item => item.sku === product.sku)

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTION={REDUCER_ACTION}
          isCart={isCart}
        />
      )

    })
  }

  return (
    <main className="main main--products">
      {pageContent}
    </main>
  )
}

export default ProductList
