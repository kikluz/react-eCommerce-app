import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
ReactDOM.render(
  // https://auth0.com/docs/quickstart/spa/react#install-the-auth0-react-sdk
  // the Auth0 React SDK uses React Context to manage the authentication state of your users

  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    // verytime the user log in save in the local storage(the token)
    cacheLocation="localstorage"
  >
    {/* setup UserProvider */}
    <UserProvider>
      <ProductsProvider>
        {/* wrapped the FilterProvider inside ProductsProvider */}
        <FilterProvider>
          {/* anywhere in the app we access to the cart provider  */}
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
