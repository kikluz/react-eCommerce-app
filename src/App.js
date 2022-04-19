import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  PrivateRoute,
  Checkout
} from './pages'

function App() {
  return (
    // ? setup Router 
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/about" >
            <About />
          </Route>
          <Route exact path="/cart" >
            <Cart />
          </Route>
          <Route path="*" >
            <Error />
          </Route>
          <Route exact path="/products" >
            <Products />
          </Route>
          <Route exact path="/products/:id" children={<SingleProduct />} />
          <Route exact path="/checkout" >
            <Checkout />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  )

}

export default App
