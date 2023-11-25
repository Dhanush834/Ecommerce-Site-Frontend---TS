import React, { useState } from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import Footer from './components/Footer'


const App = () => {

  const [viewCart,setViewCart] = useState(false)

  const pageContent = viewCart ? <Cart /> : <ProductList />

  return (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
        {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )
}

export default App
