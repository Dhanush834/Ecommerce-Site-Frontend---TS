import React, { ReactElement } from 'react'
import { ProductsType } from '../context/ProductsProvider'
import { ReducerActionType , ReducerAction } from '../context/CartProvider'

type PropsType = {
    product : ProductsType
    dispatch : React.Dispatch<ReducerAction>
    REDUCER_ACTION : ReducerActionType
    isCart : boolean
}

const Product = ({product,dispatch,REDUCER_ACTION,isCart}:PropsType) : ReactElement => {
  return (
    <div>
      
    </div>
  )
}

export default Product
