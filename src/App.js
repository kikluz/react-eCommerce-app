import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  PrivateRoute,
  Checkout,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    // ? setup Router
    <>
      <AuthWrapper>
        <Router>
          <Navbar />
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:id" children={<SingleProduct />} />
            {/* Protect a route here check for user if exists return children  */}
            <PrivateRoute exact path="/checkout">
              <Checkout />
            </PrivateRoute>
            {/* has to be the last  */}
            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthWrapper>
    </>
  );
}

export default App;
